import express from "express";
import supabase from "../config/supabase.js";

import {
  autenticar,
  exigirGerente,
  exigirGerenteTotal,
} from "../middleware/auth.middleware.js";

const router = express.Router();

/*
=========================================================
AÇÕES
=========================================================
*/

router.post("/acoes", autenticar, exigirGerente, async (req, res) => {
  try {
    const {
      nome,
      categoria,
      bandidos_min,
      bandidos_max,
      tipo,
      armamento,
      valor,
      itens_necessarios,
      descricao,
    } = req.body;

    if (
      !nome ||
      !bandidos_min ||
      !bandidos_max ||
      !armamento
    ) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "Preencha os dados obrigatórios.",
      });
    }

    const { data, error } = await supabase
      .from("acoes")
      .insert({
        nome,
        lider_id: req.usuario.id,
        lider_nome: req.usuario.nome,
        categoria: categoria || "NORMAL",

        bandidos_min,
        bandidos_max,

        tipo: tipo || "Teti-Chão",
        armamento,

        valor: valor || 0,

        itens_necessarios:
          itens_necessarios || [],

        descricao: descricao || "",
      })
      .select()
      .single();

    if (error) {
      console.error(error);

      return res.status(500).json({
        sucesso: false,
        mensagem: "Erro ao criar ação.",
      });
    }

    await supabase.from("logs").insert({
      usuario_id: req.usuario.id,
      usuario_nome: req.usuario.nome,
      cargo: req.usuario.cargo,
      acao: "CRIAR_ACAO",
      descricao: `Ação criada: ${nome}`,
    });

    res.json({
      sucesso: true,
      acao: data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      sucesso: false,
      mensagem: "Erro interno.",
    });
  }
});


router.get("/acoes", autenticar, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("acoes")
      .select(`
        *,
        acao_participantes (
          id,
          usuario_id,
          usuario_nome,
          entrou_em
        )
      `)
      .eq("status", "ABERTA")
      .order("criada_em", {
        ascending: false,
      });

    if (error) {
      console.error(error);

      return res.status(500).json({
        sucesso: false,
        mensagem: "Erro ao carregar ações.",
      });
    }

    res.json({
      sucesso: true,
      acoes: data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      sucesso: false,
      mensagem: "Erro interno.",
    });
  }
});


router.post(
  "/acoes/:id/participar",
  autenticar,
  async (req, res) => {
    try {
      const acaoId = Number(req.params.id);

      const { data: acao } = await supabase
        .from("acoes")
        .select("*")
        .eq("id", acaoId)
        .maybeSingle();

      if (!acao) {
        return res.status(404).json({
          sucesso: false,
          mensagem: "Ação não encontrada.",
        });
      }

      if (acao.status !== "ABERTA") {
        return res.status(400).json({
          sucesso: false,
          mensagem: "Essa ação não está aberta.",
        });
      }

      const { data: existente } = await supabase
        .from("acao_participantes")
        .select("id")
        .eq("acao_id", acaoId)
        .eq("usuario_id", req.usuario.id)
        .maybeSingle();

      if (existente) {
        return res.status(400).json({
          sucesso: false,
          mensagem: "Você já está participando.",
        });
      }

      const { count } = await supabase
        .from("acao_participantes")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("acao_id", acaoId);

      if ((count || 0) >= acao.bandidos_max) {
        return res.status(400).json({
          sucesso: false,
          mensagem:
            "A ação já atingiu o número máximo de participantes.",
        });
      }

      const { error } = await supabase
        .from("acao_participantes")
        .insert({
          acao_id: acaoId,
          usuario_id: req.usuario.id,
          usuario_nome: req.usuario.nome,
        });

      if (error) {
        console.error(error);

        return res.status(500).json({
          sucesso: false,
          mensagem: "Não foi possível entrar na ação.",
        });
      }

      res.json({
        sucesso: true,
        mensagem: "Você entrou na ação.",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        sucesso: false,
        mensagem: "Erro interno.",
      });
    }
  }
);


router.delete(
  "/acoes/:id/sair",
  autenticar,
  async (req, res) => {
    try {
      const acaoId = Number(req.params.id);

      const { data: participante } = await supabase
        .from("acao_participantes")
        .select("id")
        .eq("acao_id", acaoId)
        .eq("usuario_id", req.usuario.id)
        .maybeSingle();

      if (!participante) {
        return res.status(400).json({
          sucesso: false,
          mensagem:
            "Você não está participando dessa ação.",
        });
      }

      await supabase
        .from("acao_participantes")
        .delete()
        .eq("id", participante.id);

      res.json({
        sucesso: true,
        mensagem: "Você saiu da ação.",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        sucesso: false,
        mensagem: "Erro interno.",
      });
    }
  }
);


/*
=========================================================
VENDAS
=========================================================
*/

router.post("/vendas", autenticar, async (req, res) => {
  try {
    const {
      cliente,
      cliente_id,
      produtos,
      observacoes,
    } = req.body;

    if (
      !cliente ||
      !Array.isArray(produtos) ||
      produtos.length === 0
    ) {
      return res.status(400).json({
        sucesso: false,
        mensagem:
          "Cliente e pelo menos um produto são obrigatórios.",
      });
    }

    const valorTotal = produtos.reduce(
      (total, produto) =>
        total +
        Number(produto.valor || 0) *
          Number(produto.quantidade || 1),
      0
    );

    const { data, error } = await supabase
      .from("vendas")
      .insert({
        vendedor_id: req.usuario.id,
        vendedor_nome: req.usuario.nome,

        cliente,
        cliente_id,

        produtos,

        valor_total: valorTotal,

        observacoes,
      })
      .select()
      .single();

    if (error) {
      console.error(error);

      return res.status(500).json({
        sucesso: false,
        mensagem: "Erro ao registrar venda.",
      });
    }

    await supabase.from("logs").insert({
      usuario_id: req.usuario.id,
      usuario_nome: req.usuario.nome,
      cargo: req.usuario.cargo,
      acao: "REGISTRO_VENDA",
      descricao: `Venda registrada para ${cliente}.`,
    });

    res.json({
      sucesso: true,
      venda: data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      sucesso: false,
      mensagem: "Erro interno.",
    });
  }
});


router.get("/vendas", autenticar, async (req, res) => {
  const { data, error } = await supabase
    .from("vendas")
    .select("*")
    .order("criada_em", {
      ascending: false,
    });

  if (error) {
    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao carregar vendas.",
    });
  }

  res.json({
    sucesso: true,
    vendas: data,
  });
});


/*
=========================================================
ENCOMENDAS
=========================================================
*/

router.post(
  "/encomendas",
  autenticar,
  async (req, res) => {
    try {
      const {
        cliente,
        cliente_id,
        produtos,
        data_entrega,
        observacoes,
      } = req.body;

      if (
        !cliente ||
        !Array.isArray(produtos) ||
        produtos.length === 0 ||
        !data_entrega
      ) {
        return res.status(400).json({
          sucesso: false,
          mensagem:
            "Cliente, produtos e data de entrega são obrigatórios.",
        });
      }

      const { data, error } = await supabase
        .from("encomendas")
        .insert({
          vendedor_id: req.usuario.id,
          vendedor_nome: req.usuario.nome,

          cliente,
          cliente_id,

          produtos,

          data_entrega,

          observacoes,
        })
        .select()
        .single();

      if (error) {
        console.error(error);

        return res.status(500).json({
          sucesso: false,
          mensagem: "Erro ao registrar encomenda.",
        });
      }

      await supabase.from("logs").insert({
        usuario_id: req.usuario.id,
        usuario_nome: req.usuario.nome,
        cargo: req.usuario.cargo,
        acao: "REGISTRO_ENCOMENDA",
        descricao: `Encomenda para ${cliente}.`,
      });

      res.json({
        sucesso: true,
        encomenda: data,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        sucesso: false,
        mensagem: "Erro interno.",
      });
    }
  }
);


/*
=========================================================
ADV
=========================================================
*/

router.post("/advs", autenticar, async (req, res) => {
  try {
    const {
      membro,
      membro_id,
      quantidade,
      motivo,
    } = req.body;

    if (
      !membro ||
      ![1, 2, 3].includes(Number(quantidade)) ||
      !motivo
    ) {
      return res.status(400).json({
        sucesso: false,
        mensagem:
          "Informe membro, quantidade de ADV e motivo.",
      });
    }

    const { data, error } = await supabase
      .from("advs")
      .insert({
        usuario_id: req.usuario.id,
        usuario_nome: req.usuario.nome,

        membro,
        membro_id,

        quantidade: Number(quantidade),

        motivo,
      })
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        sucesso: false,
        mensagem: "Erro ao registrar ADV.",
      });
    }

    res.json({
      sucesso: true,
      adv: data,
    });
  } catch {
    res.status(500).json({
      sucesso: false,
      mensagem: "Erro interno.",
    });
  }
});


/*
=========================================================
REBAIXAMENTO
=========================================================
*/

router.post(
  "/rebaixamentos",
  autenticar,
  exigirGerente,
  async (req, res) => {
    const {
      membro,
      membro_id,
      cargo_anterior,
      cargo_novo,
      motivo,
    } = req.body;

    if (
      !membro ||
      !cargo_anterior ||
      !cargo_novo ||
      !motivo
    ) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "Preencha todos os campos.",
      });
    }

    const { data, error } = await supabase
      .from("rebaixamentos")
      .insert({
        usuario_id: req.usuario.id,
        usuario_nome: req.usuario.nome,

        membro,
        membro_id,

        cargo_anterior,
        cargo_novo,

        motivo,
      })
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        sucesso: false,
        mensagem: "Erro ao registrar rebaixamento.",
      });
    }

    res.json({
      sucesso: true,
      rebaixamento: data,
    });
  }
);


/*
=========================================================
LAVAGEM
=========================================================
*/

router.post(
  "/lavagens",
  autenticar,
  async (req, res) => {
    try {
      const {
        tipo,
        cliente,
        cliente_id,
        membro,
        membro_id,
        quantidade,
        valor,
        observacoes,
      } = req.body;

      if (!tipo) {
        return res.status(400).json({
          sucesso: false,
          mensagem: "Tipo de lavagem obrigatório.",
        });
      }

      const { data, error } = await supabase
        .from("lavagens")
        .insert({
          registrador_id: req.usuario.id,
          registrador_nome: req.usuario.nome,

          tipo,

          cliente,
          cliente_id,

          membro,
          membro_id,

          quantidade:
            Number(quantidade) || 1,

          valor:
            Number(valor) || 0,

          observacoes,
        })
        .select()
        .single();

      if (error) {
        console.error(error);

        return res.status(500).json({
          sucesso: false,
          mensagem: "Erro ao registrar lavagem.",
        });
      }

      res.json({
        sucesso: true,
        lavagem: data,
      });
    } catch {
      res.status(500).json({
        sucesso: false,
        mensagem: "Erro interno.",
      });
    }
  }
);


/*
=========================================================
PARCERIAS
=========================================================
*/

router.post(
  "/parcerias",
  autenticar,
  exigirGerente,
  async (req, res) => {
    const {
      parceiro,
      responsavel,
      contato,
      observacoes,
    } = req.body;

    if (!parceiro) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "Nome da parceria obrigatório.",
      });
    }

    const { data, error } = await supabase
      .from("parcerias")
      .insert({
        usuario_id: req.usuario.id,
        usuario_nome: req.usuario.nome,

        parceiro,
        responsavel,
        contato,
        observacoes,
      })
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        sucesso: false,
        mensagem: "Erro ao registrar parceria.",
      });
    }

    res.json({
      sucesso: true,
      parceria: data,
    });
  }
);


/*
=========================================================
RECRUTAMENTO
=========================================================
*/

router.post(
  "/recrutamentos",
  autenticar,
  async (req, res) => {
    const {
      membro,
      membro_id,
      discord_id,
      observacoes,
    } = req.body;

    if (!membro) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "Nome do membro obrigatório.",
      });
    }

    const { data, error } = await supabase
      .from("recrutamentos")
      .insert({
        recrutador_id: req.usuario.id,
        recrutador_nome: req.usuario.nome,

        membro,
        membro_id,
        discord_id,
        observacoes,
      })
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        sucesso: false,
        mensagem: "Erro ao registrar recrutamento.",
      });
    }

    res.json({
      sucesso: true,
      recrutamento: data,
    });
  }
);


/*
=========================================================
RANKINGS
=========================================================
*/

router.get(
  "/rankings",
  autenticar,
  async (req, res) => {
    try {
      const [
        vendas,
        acoes,
        recrutamentos,
        lavagens,
      ] = await Promise.all([
        supabase
          .from("vendas")
          .select("vendedor_nome"),

        supabase
          .from("acoes")
          .select("lider_nome"),

        supabase
          .from("recrutamentos")
          .select("recrutador_nome"),

        supabase
          .from("lavagens")
          .select("registrador_nome"),
      ]);

      function contar(lista, campo) {
        const mapa = {};

        for (const item of lista || []) {
          const nome = item[campo];

          if (!nome) continue;

          mapa[nome] =
            (mapa[nome] || 0) + 1;
        }

        return Object.entries(mapa)
          .map(([nome, quantidade]) => ({
            nome,
            quantidade,
          }))
          .sort(
            (a, b) =>
              b.quantidade - a.quantidade
          );
      }

      res.json({
        sucesso: true,

        vendas: contar(
          vendas.data,
          "vendedor_nome"
        ),

        acoes: contar(
          acoes.data,
          "lider_nome"
        ),

        recrutamentos: contar(
          recrutamentos.data,
          "recrutador_nome"
        ),

        lavagens: contar(
          lavagens.data,
          "registrador_nome"
        ),
      });
    } catch {
      res.status(500).json({
        sucesso: false,
        mensagem: "Erro ao gerar rankings.",
      });
    }
  }
);


/*
=========================================================
REGISTROS / LOGS
=========================================================
*/

router.get(
  "/registros",
  autenticar,
  exigirGerente,
  async (req, res) => {
    const { data, error } = await supabase
      .from("logs")
      .select("*")
      .order("criada_em", {
        ascending: false,
      })
      .limit(200);

    if (error) {
      return res.status(500).json({
        sucesso: false,
        mensagem: "Erro ao carregar registros.",
      });
    }

    res.json({
      sucesso: true,
      registros: data,
    });
  }
);

export default router;