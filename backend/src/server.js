const FRONTEND_URL =
  process.env.FRONTEND_URL ||
  "https://morro-do-fenix-reiu.vercel.app";

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);