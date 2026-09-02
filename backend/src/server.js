import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import setupRoutes from "./routes/setup.routes.js";
import vendasRoutes from "./routes/vendas.routes.js";
import paineisRoutes from "./routes/paineis.routes.js";

dotenv.config();

const app = express();

const FRONTEND_URL =
  process.env.FRONTEND_URL ||
  "https://morro-do-fenix-reiu.vercel.app";

const allowedOrigins = [
  FRONTEND_URL,
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      const isAllowed =
        allowedOrigins.includes(origin) ||
        /^https:\/\/morro-do-fenix-reiu-[a-z0-9]+-ricardos-projects-cf46dfa2\.vercel\.app$/.test(origin);

      if (isAllowed) {
        return callback(null, true);
      }

      return callback(new Error("Origem não autorizada pelo CORS."));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    sucesso: true,
    sistema: "Morro do Fênix",
    status: "online",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/setup", setupRoutes);
app.use("/api/vendas", vendasRoutes);
app.use("/api", paineisRoutes);

app.use((req, res) => {
  res.status(404).json({
    sucesso: false,
    mensagem: "Rota não encontrada.",
  });
});

app.use((error, req, res, next) => {
  console.error("Erro global:", error);

  res.status(500).json({
    sucesso: false,
    mensagem: "Erro interno do servidor.",
  });
});

export default app;