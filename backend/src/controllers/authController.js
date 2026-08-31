import { supabase } from "../config/supabase.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import {
  generateSessionToken,
  hashSessionToken,
  getSessionExpiration
} from "../utils/session.js";
import { createLog } from "../services/logService.js";

function getClientIp(req) {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    null
  );
}

export async function register(req, res) {
  try {
    const {
      fullName,
      memberId,
      discordId,
      email,
      password,
      passwordConfirmation
    } = req.body;

    if (
      !fullName ||
      !memberId ||
      !discordId ||
      !email ||
      !password ||
      !passwordConfirmation
    ) {
      return res.status(400).json({
        success: false,
        message: "Preencha todos os campos."
      });
    }

    if (password !== passwordConfirmation) {
      return res.status(400).json({
        success: false,
        message: "As senhas não coincidem."
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "A senha deve possuir pelo menos 8 caracteres."
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const { data: existingEmail } = await supabase
      .from("users")
      .select("id")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "Este e-mail já está cadastrado."
      });
    }

    const { data: existingMember } = await supabase
      .from("users")
      .select("id")
      .eq("member_id", memberId.trim())
      .maybeSingle();

    if (existingMember) {
      return res.status(409).json({
        success: false,
        message: "Este ID de membro já está cadastrado."
      });
    }

    const passwordHash = await hashPassword(password);

    const { data: user, error } = await supabase
      .from("users")
      .insert({
        full_name: fullName.trim(),
        email: normalizedEmail,
        password_hash: passwordHash,
        role: "MEMBRO",
        status: "PENDENTE",
        member_id: memberId.trim(),
        discord_id: discordId.trim()
      })
      .select(`
        id,
        full_name,
        email,
        member_id,
        discord_id,
        role,
        status,
        created_at
      `)
      .single();

    if (error) {
      console.error("Erro ao cadastrar membro:", error);

      return res.status(500).json({
        success: false,
        message: "Não foi possível criar o cadastro."
      });
    }

    await createLog({
      userId: user.id,
      userName: user.full_name,
      userRole: user.role,
      action: "CADASTRO",
      description: "Novo cadastro de membro enviado para aprovação.",
      ipAddress: getClientIp(req),
      userAgent: req.headers["user-agent"],
      metadata: {
        memberId: user.member_id
      }
    });

    return res.status(201).json({
      success: true,
      message: "Seu cadastro foi enviado para análise.",
      user
    });
  } catch (error) {
    console.error("Erro no registro:", error);

    return res.status(500).json({
      success: false,
      message: "Erro interno do servidor."
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Informe o e-mail e a senha."
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (error) {
      console.error("Erro ao buscar usuário:", error);

      return res.status(500).json({
        success: false,
        message: "Erro interno do servidor."
      });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "E-mail ou senha incorretos."
      });
    }

    const validPassword = await comparePassword(
      password,
      user.password_hash
    );

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "E-mail ou senha incorretos."
      });
    }

    if (user.status === "PENDENTE") {
      return res.status(403).json({
        success: false,
        message: "Seu cadastro ainda está aguardando aprovação.",
        status: "PENDENTE"
      });
    }

    if (user.status === "RECUSADO") {
      return res.status(403).json({
        success: false,
        message: "Seu cadastro foi recusado.",
        status: "RECUSADO"
      });
    }

    if (user.status === "SUSPENSO") {
      return res.status(403).json({
        success: false,
        message: "Sua conta está suspensa.",
        status: "SUSPENSO"
      });
    }

    const token = generateSessionToken();
    const tokenHash = hashSessionToken(token);
    const expiresAt = getSessionExpiration();

    await supabase
      .from("sessions")
      .delete()
      .eq("user_id", user.id);

    const { error: sessionError } = await supabase
      .from("sessions")
      .insert({
        user_id: user.id,
        token_hash: tokenHash,
        ip_address: getClientIp(req),
        user_agent: req.headers["user-agent"],
        expires_at: expiresAt.toISOString()
      });

    if (sessionError) {
      console.error("Erro ao criar sessão:", sessionError);

      return res.status(500).json({
        success: false,
        message: "Não foi possível criar a sessão."
      });
    }

    await supabase
      .from("users")
      .update({
        last_login_at: new Date().toISOString()
      })
      .eq("id", user.id);

    res.cookie("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/"
    });

    await createLog({
      userId: user.id,
      userName: user.full_name,
      userRole: user.role,
      action: "LOGIN",
      description: "Usuário realizou login.",
      ipAddress: getClientIp(req),
      userAgent: req.headers["user-agent"]
    });

    return res.json({
      success: true,
      message: "Login realizado com sucesso.",
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        memberId: user.member_id,
        discordId: user.discord_id,
        role: user.role,
        status: user.status
      }
    });
  } catch (error) {
    console.error("Erro no login:", error);

    return res.status(500).json({
      success: false,
      message: "Erro interno do servidor."
    });
  }
}

export async function logout(req, res) {
  try {
    const token = req.cookies?.session;

    if (token) {
      const tokenHash = hashSessionToken(token);

      await supabase
        .from("sessions")
        .delete()
        .eq("token_hash", tokenHash);
    }

    if (req.user) {
      await createLog({
        userId: req.user.id,
        userName: req.user.full_name,
        userRole: req.user.role,
        action: "LOGOUT",
        description: "Usuário realizou logout.",
        ipAddress: getClientIp(req),
        userAgent: req.headers["user-agent"]
      });
    }

    res.clearCookie("session", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/"
    });

    return res.json({
      success: true,
      message: "Logout realizado com sucesso."
    });
  } catch (error) {
    console.error("Erro no logout:", error);

    return res.status(500).json({
      success: false,
      message: "Erro interno do servidor."
    });
  }
}

export async function me(req, res) {
  return res.json({
    success: true,
    user: {
      id: req.user.id,
      fullName: req.user.full_name,
      email: req.user.email,
      memberId: req.user.member_id,
      discordId: req.user.discord_id,
      role: req.user.role,
      status: req.user.status,
      createdAt: req.user.created_at,
      lastLoginAt: req.user.last_login_at
    }
  });
}