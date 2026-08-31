import express from "express";
import bcrypt from "bcrypt";
import supabase from "../config/supabase.js";

const router = express.Router();

const LIDERES_MAXIMOS = 3;

function normalizarEmail(email) {
  return String(email).trim().toLowerCase();
}

function validarDados(nome, email, senha) {
  if (!nome || !email || !senha) {
    return "Nome, e-mail e senha são obrigatórios.";
  }

  if (String(nome).trim().length < 3) {
    return "O nome precisa ter pelo menos 3 caracteres.";
  }

  if (!String(email).includes("@")) {
    return "Informe um e-mail válido.";
  }

  if (String(senha).length < 8) {
    return "A senha precisa ter pelo menos 8 caracteres.";
  }

  return null;
}

/*
|--------------------------------------------------------------------------
| CRIAR LÍDER
|--------------------------------------------------------------------------
*/

router.post("/criar-lider", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const erro = validarDados(nome, email, senha);

    if (erro) {
      return res.status(400).json({
        sucesso: false,
        mensagem: erro,
      });
    }

    const emailNormalizado = normalizarEmail(email);

    /*
    |--------------------------------------------------------------------------
    | VERIFICAR QUANTIDADE DE LÍDERES
    |--------------------------------------------------------------------------
    */

    const {
      data: lideres,
      error: lideresError,
    } = await supabase
      .from("usuarios")
      .select("id")
      .eq("cargo", "LIDER");

    if (lideresError) {
      console.error(
        "Erro ao consultar líderes:",
        lideresError
      );

      return res.status(500).json({
        sucesso: false,
        mensagem: "Erro ao consultar os líderes no banco de dados.",
        detalhe: lideresError.message,
      });
    }

    if (lideres.length >= LIDERES_MAXIMOS) {
      return res.status(403).json({
        sucesso: false,
        mensagem:
          "O limite máximo de 3 líderes já foi atingido.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | VERIFICAR E-MAIL
    |--------------------------------------------------------------------------
    */

    const {
      data: usuarios,
      error: emailError,
    } = await supabase
      .from("usuarios")
      .select("id, email")
      .eq("email", emailNormalizado);

    if (emailError) {
      console.error(
        "Erro ao consultar e-mail:",
        emailError
      );

      return res.status(500).json({
        sucesso: false,
        mensagem: "Erro ao verificar o e-mail.",
        detalhe: emailError.message,
      });
    }

    if (usuarios.length > 0) {
      return res.status(409).json({
        sucesso: false,
        mensagem: "Este e-mail já está cadastrado.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | GERAR HASH
    |--------------------------------------------------------------------------
    */

    const senhaHash = await bcrypt.hash(senha, 12);

    /*
    |--------------------------------------------------------------------------
    | CRIAR LÍDER
    |--------------------------------------------------------------------------
    */

    const {
      data: novoLider,
      error: criarError,
    } = await supabase
      .from("usuarios")
      .insert({
        nome_completo: String(nome).trim(),
        email: emailNormalizado,
        senha_hash: senhaHash,
        cargo: "LIDER",
        status: "ATIVO",
      })
      .select(
        "id, nome_completo, email, cargo, status, criado_em"
      )
      .single();

    if (criarError) {
      console.error(
        "Erro ao criar líder:",
        criarError
      );

      return res.status(500).json({
        sucesso: false,
        mensagem: "Não foi possível criar o líder.",
        detalhe: criarError.message,
      });
    }

    /*
    |--------------------------------------------------------------------------
    | CRIAR LOG
    |--------------------------------------------------------------------------
    */

    const { error: logError } = await supabase
      .from("logs")
      .insert({
        usuario_id: novoLider.id,
        usuario_nome: novoLider.nome_completo,
        cargo: novoLider.cargo,
        acao: "CRIACAO_LIDER",
        descricao:
          "Conta de líder criada durante a configuração inicial.",
      });

    if (logError) {
      console.error(
        "Aviso: líder criado, mas o log falhou:",
        logError
      );
    }

    /*
    |--------------------------------------------------------------------------
    | RESPOSTA
    |--------------------------------------------------------------------------
    */

    return res.status(201).json({
      sucesso: true,
      mensagem: "Conta de líder criada com sucesso.",
      lider: {
        id: novoLider.id,
        nome: novoLider.nome_completo,
        email: novoLider.email,
        cargo: novoLider.cargo,
        status: novoLider.status,
        criado_em: novoLider.criado_em,
      },
    });
  } catch (error) {
    console.error(
      "Erro inesperado ao criar líder:",
      error
    );

    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro interno do servidor.",
      detalhe: error.message,
    });
  }
});

export default router;