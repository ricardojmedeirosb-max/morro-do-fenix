import express from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import supabase from "../config/supabase.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| LOGIN
|--------------------------------------------------------------------------
*/

router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "E-mail e senha são obrigatórios.",
      });
    }

    const emailNormalizado = String(email)
      .trim()
      .toLowerCase();

    const { data: usuario, error } = await supabase
      .from("usuarios")
      .select(
        "id, nome_completo, email, senha_hash, cargo, status"
      )
      .eq("email", emailNormalizado)
      .maybeSingle();

    if (error) {
      console.error("Erro ao consultar usuário:", error);

      return res.status(500).json({
        sucesso: false,
        mensagem: "Erro ao consultar o usuário.",
        detalhe: error.message,
      });
    }

    if (!usuario) {
      return res.status(401).json({
        sucesso: false,
        mensagem: "E-mail ou senha incorretos.",
      });
    }

    if (usuario.status !== "ATIVO") {
      return res.status(403).json({
        sucesso: false,
        mensagem: "Sua conta não está ativa.",
      });
    }

    const senhaCorreta = await bcrypt.compare(
      senha,
      usuario.senha_hash
    );

    if (!senhaCorreta) {
      return res.status(401).json({
        sucesso: false,
        mensagem: "E-mail ou senha incorretos.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | CRIA SESSÃO
    |--------------------------------------------------------------------------
    */

    const token = crypto
      .randomBytes(48)
      .toString("hex");

    const tokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const expiraEm = new Date(
      Date.now() + 24 * 60 * 60 * 1000
    );

    const { error: sessaoError } = await supabase
      .from("sessoes")
      .insert({
        usuario_id: usuario.id,
        token_hash: tokenHash,
        expira_em: expiraEm.toISOString(),
      });

    if (sessaoError) {
      console.error(
        "Erro ao criar sessão:",
        sessaoError
      );

      return res.status(500).json({
        sucesso: false,
        mensagem: "Não foi possível criar sua sessão.",
        detalhe: sessaoError.message,
      });
    }

    /*
    |--------------------------------------------------------------------------
    | LOG
    |--------------------------------------------------------------------------
    */

    const { error: logError } = await supabase
      .from("logs")
      .insert({
        usuario_id: usuario.id,
        usuario_nome: usuario.nome_completo,
        cargo: usuario.cargo,
        acao: "LOGIN",
        descricao: "Usuário realizou login no sistema.",
      });

    if (logError) {
      console.error(
        "Aviso: não foi possível criar o log:",
        logError.message
      );
    }

    /*
    |--------------------------------------------------------------------------
    | RESPOSTA
    |--------------------------------------------------------------------------
    */

    return res.json({
      sucesso: true,
      mensagem: "Login realizado com sucesso.",
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome_completo,
        email: usuario.email,
        cargo: usuario.cargo,
        status: usuario.status,
      },
    });
  } catch (error) {
    console.error("Erro no login:", error);

    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro interno do servidor.",
    });
  }
});

/*
|--------------------------------------------------------------------------
| VERIFICAR AUTENTICAÇÃO
|--------------------------------------------------------------------------
*/

router.get("/me", async (req, res) => {
  try {
    const authorization =
      req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        sucesso: false,
        mensagem: "Não autenticado.",
      });
    }

    if (!authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        sucesso: false,
        mensagem: "Token inválido.",
      });
    }

    const token = authorization
      .replace("Bearer ", "")
      .trim();

    if (!token) {
      return res.status(401).json({
        sucesso: false,
        mensagem: "Token inválido.",
      });
    }

    const tokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const { data: sessao, error } =
      await supabase
        .from("sessoes")
        .select(`
          id,
          usuario_id,
          expira_em,
          usuarios (
            id,
            nome_completo,
            email,
            cargo,
            status
          )
        `)
        .eq("token_hash", tokenHash)
        .maybeSingle();

    if (error) {
      console.error(
        "Erro ao consultar sessão:",
        error
      );

      return res.status(500).json({
        sucesso: false,
        mensagem: "Erro ao verificar autenticação.",
        detalhe: error.message,
      });
    }

    if (!sessao) {
      return res.status(401).json({
        sucesso: false,
        mensagem: "Sessão inválida ou expirada.",
      });
    }

    if (
      !sessao.expira_em ||
      new Date(sessao.expira_em) < new Date()
    ) {
      return res.status(401).json({
        sucesso: false,
        mensagem: "Sessão expirada.",
      });
    }

    const usuario = sessao.usuarios;

    if (!usuario) {
      return res.status(401).json({
        sucesso: false,
        mensagem: "Usuário da sessão não encontrado.",
      });
    }

    if (usuario.status !== "ATIVO") {
      return res.status(403).json({
        sucesso: false,
        mensagem: "Conta sem acesso ao sistema.",
      });
    }

    return res.json({
      sucesso: true,
      usuario: {
        id: usuario.id,
        nome: usuario.nome_completo,
        email: usuario.email,
        cargo: usuario.cargo,
        status: usuario.status,
      },
    });
  } catch (error) {
    console.error(
      "Erro ao verificar autenticação:",
      error
    );

    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro interno do servidor.",
    });
  }
});

/*
|--------------------------------------------------------------------------
| LOGOUT
|--------------------------------------------------------------------------
*/

router.post("/logout", async (req, res) => {
  try {
    const authorization =
      req.headers.authorization;

    if (!authorization) {
      return res.json({
        sucesso: true,
        mensagem: "Logout realizado.",
      });
    }

    const token = authorization
      .replace("Bearer ", "")
      .trim();

    if (!token) {
      return res.json({
        sucesso: true,
        mensagem: "Logout realizado.",
      });
    }

    const tokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const { error } = await supabase
      .from("sessoes")
      .delete()
      .eq("token_hash", tokenHash);

    if (error) {
      console.error(
        "Erro ao remover sessão:",
        error
      );

      return res.status(500).json({
        sucesso: false,
        mensagem: "Erro ao realizar logout.",
      });
    }

    return res.json({
      sucesso: true,
      mensagem: "Logout realizado com sucesso.",
    });
  } catch (error) {
    console.error(
      "Erro no logout:",
      error
    );

    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao realizar logout.",
    });
  }
});

/*
|--------------------------------------------------------------------------
| EXPORTAÇÃO
|--------------------------------------------------------------------------
*/

export default router;