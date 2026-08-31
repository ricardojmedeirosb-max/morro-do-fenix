import { supabase } from "../config/supabase.js";

export async function createLog({
  userId = null,
  userName = null,
  userRole = null,
  action,
  description = null,
  ipAddress = null,
  userAgent = null,
  metadata = {}
}) {
  try {
    const { error } = await supabase
      .from("logs")
      .insert({
        user_id: userId,
        user_name: userName,
        user_role: userRole,
        action,
        description,
        ip_address: ipAddress,
        user_agent: userAgent,
        metadata
      });

    if (error) {
      console.error("Erro ao criar log:", error);
    }
  } catch (error) {
    console.error("Erro inesperado ao criar log:", error);
  }
}