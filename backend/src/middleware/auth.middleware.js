import crypto from "crypto";
import supabase from "../config/supabase.js";

/**
 * Verifica se existe uma sessão válida.
 *
 * Adiciona o usuário autenticado em:
 * req.usuario
 */
export async function autenticar(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        sucesso: false,
        mensagem: "Token de autenticação não informado.",
      });
    }

    if (!authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        sucesso: false,
        mensagem: "Formato de token inválido.",
      });
    }

    const token = authorization.substring(7).trim();

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

    const { data: sessao, error } = await supabase
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
      console.error("Erro ao verificar sessão:", error);

      return res.status(500).json({
        sucesso: false,
        mensagem: "Erro ao verificar autenticação.",
      });
    }

    if (!sessao) {
      return res.status(401).json({
        sucesso: false,
        mensagem: "Sessão inválida ou expirada.",
      });
    }

    if (new Date(sessao.expira_em) <= new Date()) {
      await supabase
        .from("sessoes")
        .delete()
        .eq("id", sessao.id);

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
        mensagem: "Sua conta não está ativa.",
      });
    }

    req.usuario = {
      id: usuario.id,
      nome: usuario.nome_completo,
      nome_completo: usuario.nome_completo,
      email: usuario.email,
      cargo: usuario.cargo,
      status: usuario.status,
    };

    req.sessao = sessao;

    next();
  } catch (error) {
    console.error("Erro no middleware de autenticação:", error);

    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao verificar autenticação.",
    });
  }
}

/**
 * Permite somente GERENTE ou LIDER.
 */
export function exigirGerente(req, res, next) {
  if (!req.usuario) {
    return res.status(401).json({
      sucesso: false,
      mensagem: "Você precisa estar autenticado.",
    });
  }

  const cargo = String(req.usuario.cargo || "")
    .trim()
    .toUpperCase();

  if (cargo !== "GERENTE" && cargo !== "LIDER" && cargo !== "SUPER_ADMIN") {
    return res.status(403).json({
      sucesso: false,
      mensagem:
        "Você não possui permissão para acessar este painel.",
    });
  }

  next();
}

/**
 * Permite somente GERENTE.
 */
export function exigirSomenteGerente(req, res, next) {
  if (!req.usuario) {
    return res.status(401).json({
      sucesso: false,
      mensagem: "Você precisa estar autenticado.",
    });
  }

  const cargo = String(req.usuario.cargo || "")
    .trim()
    .toUpperCase();

  if (cargo !== "GERENTE" && cargo !== "SUPER_ADMIN") {
    return res.status(403).json({
      sucesso: false,
      mensagem:
        "Somente gerentes possuem acesso a esta área.",
    });
  }

  next();
}

/**
 * Permite GERENTE, LIDER e MEMBRO.
 */
export function exigirMembro(req, res, next) {
  if (!req.usuario) {
    return res.status(401).json({
      sucesso: false,
      mensagem: "Você precisa estar autenticado.",
    });
  }

  const cargosPermitidos = [
    "GERENTE",
    "LIDER",
    "MEMBRO",
    "SUPER_ADMIN",
  ];

  const cargo = String(req.usuario.cargo || "")
    .trim()
    .toUpperCase();

  if (!cargosPermitidos.includes(cargo)) {
    return res.status(403).json({
      sucesso: false,
      mensagem: "Você não possui acesso a esta área.",
    });
  }

  next();
}

/**
 * Alias para manter compatibilidade
 * caso alguma rota antiga use autenticarUsuario.
 */
export const autenticarUsuario = autenticar;

/**
 * Alias para compatibilidade com possíveis rotas
 * que estejam usando exigirLider.
 */
export function exigirLider(req, res, next) {
  if (!req.usuario) {
    return res.status(401).json({
      sucesso: false,
      mensagem: "Você precisa estar autenticado.",
    });
  }

  const cargo = String(req.usuario.cargo || "")
    .trim()
    .toUpperCase();

  if (cargo !== "LIDER" && cargo !== "GERENTE" && cargo !== "SUPER_ADMIN") {
    return res.status(403).json({
      sucesso: false,
      mensagem:
        "Somente líderes ou gerentes possuem acesso.",
    });
  }

  next();
}
/**
 * Acesso administrativo completo.
 *
 * Somente GERENTE.
 * Use esta função para painéis que não devem
 * ser acessados por membros ou líderes.
 */
export function exigirGerenteTotal(req, res, next) {
  if (!req.usuario) {
    return res.status(401).json({
      sucesso: false,
      mensagem: "Você precisa estar autenticado.",
    });
  }

  const cargo = String(req.usuario.cargo || "")
    .trim()
    .toUpperCase();

  if (cargo !== "GERENTE" && cargo !== "SUPER_ADMIN") {
    return res.status(403).json({
      sucesso: false,
      mensagem:
        "Acesso restrito ao gerente.",
    });
  }

  next();
}