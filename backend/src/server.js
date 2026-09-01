import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import setupRoutes from "./routes/setup.routes.js";
import vendasRoutes from "./routes/vendas.routes.js";
import paineisRoutes from "./routes/paineis.routes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

const FRONTEND_URL =
  process.env.FRONTEND_URL ||
  "http://localhost:5173";

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
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