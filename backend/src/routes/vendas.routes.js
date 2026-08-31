import express from "express";
import supabase from "../config/supabase.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Middleware de autenticação
|--------------------------------------------------------------------------
*/

async function autenticar(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        sucesso: false,
        mensagem: "Token de autenticação não informado.",
      });
    }

    const partes = authorization.split(" ");

    if (partes.length !== 2 || partes[0] !== "Bearer") {
      return res.status(401).json({
        sucesso: false,
        mensagem: "Formato de token inválido.",
      });
    }

    const token = partes[1];

    const { data, error } = await supabase
      .from("sessoes")
      .select(`
        id,
        usuario_id,
        token,
        expira_em,
        usuarios (
          id,
          nome,
          email,
          cargo,
          status
        )
      `)
      .eq("token", token)
      .maybeSingle();

    if (error) {
      console.error("Erro ao consultar sessão:", error);

      return res.status(500).json({
        sucesso: false,
        mensagem: "Erro ao verificar autenticação.",
      });
    }

    if (!data) {
      return res.status(401).json({
        sucesso: false,
        mensagem: "Sessão inválida ou expirada.",
      });
    }

    if (
      data.expira_em &&
      new Date(data.expira_em) < new Date()
    ) {
      return res.status(401).json({
        sucesso: false,
        mensagem: "Sua sessão expirou.",
      });
    }

    if (!data.usuarios) {
      return res.status(401).json({
        sucesso: false,
        mensagem: "Usuário da sessão não encontrado.",
      });
    }

    if (data.usuarios.status !== "APROVADO") {
      return res.status(403).json({
        sucesso: false,
        mensagem: "Usuário não está aprovado.",
      });
    }

    req.usuario = data.usuarios;

    next();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro interno de autenticação.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| POST /api/vendas
|--------------------------------------------------------------------------
*/

router.post("/", autenticar, async (req, res) => {
  try {
    const {
      cliente,
      cliente_id,
      produto,
      quantidade,
      valor,
      observacoes,
    } = req.body;

    if (!cliente || !produto) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "Cliente e produto são obrigatórios.",
      });
    }

    const quantidadeNumerica = Number(quantidade);
    const valorNumerico = Number(valor);

    if (
      !Number.isInteger(quantidadeNumerica) ||
      quantidadeNumerica < 1
    ) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "A quantidade deve ser um número inteiro maior que zero.",
      });
    }

    if (
      Number.isNaN(valorNumerico) ||
      valorNumerico < 0
    ) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "O valor informado é inválido.",
      });
    }

    const { data, error } = await supabase
      .from("vendas")
      .insert({
        cliente: cliente.trim(),
        cliente_id: cliente_id
          ? String(cliente_id).trim()
          : null,

        produto: produto.trim(),

        quantidade: quantidadeNumerica,

        valor: valorNumerico,

        responsavel_id: req.usuario.id,

        responsavel_nome: req.usuario.nome,

        observacoes: observacoes
          ? observacoes.trim()
          : null,
      })
      .select()
      .single();

    if (error) {
      console.error(
        "Erro ao criar venda:",
        error
      );

      return res.status(500).json({
        sucesso: false,
        mensagem: "Não foi possível registrar a venda.",
        detalhe: error.message,
      });
    }

    /*
    |--------------------------------------------------------------------------
    | LOG
    |--------------------------------------------------------------------------
    */

    try {
      await supabase
        .from("logs")
        .insert({
          usuario_id: req.usuario.id,
          usuario_nome: req.usuario.nome,
          cargo: req.usuario.cargo,
          acao: "CRIAR_VENDA",
          detalhes: `Venda registrada para ${cliente.trim()}.`,
        });
    } catch (logError) {
      console.error(
        "Erro ao registrar log:",
        logError
      );
    }

    return res.status(201).json({
      sucesso: true,
      mensagem: "Venda registrada com sucesso.",
      venda: data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro interno ao registrar venda.",
    });
  }
});

/*
|--------------------------------------------------------------------------
| GET /api/vendas
|--------------------------------------------------------------------------
*/

router.get("/", autenticar, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("vendas")
      .select("*")
      .order("criado_em", {
        ascending: false,
      });

    if (error) {
      console.error(
        "Erro ao buscar vendas:",
        error
      );

      return res.status(500).json({
        sucesso: false,
        mensagem: "Erro ao buscar vendas.",
        detalhe: error.message,
      });
    }

    return res.json({
      sucesso: true,
      vendas: data || [],
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro interno ao buscar vendas.",
    });
  }
});

export default router;
