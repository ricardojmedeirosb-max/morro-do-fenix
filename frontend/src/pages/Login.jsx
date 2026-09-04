import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_URL = (import.meta.env.VITE_API_URL || "https://morro-do-fenix-edz2.vercel.app").replace(/\/+$/, "");

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();

    setErro("");
    setCarregando(true);

    try {
      const resposta = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email.trim(),
            senha,
          }),
        }
      );

      const dados = await resposta.json();

      console.log("Resposta do login:", dados);

      if (!resposta.ok || !dados.sucesso) {
        setErro(
          dados.mensagem ||
          "E-mail ou senha incorretos."
        );

        setCarregando(false);
        return;
      }

      if (!dados.token) {
        setErro(
          "O servidor autenticou, mas não enviou o token."
        );

        console.error(
          "Resposta sem token:",
          dados
        );

        setCarregando(false);
        return;
      }

      /*
       * SALVA A SESSÃO
       */
      localStorage.setItem(
        "morro_fenix_token",
        dados.token
      );

      localStorage.setItem(
        "morro_fenix_usuario",
        JSON.stringify(
          dados.usuario || {}
        )
      );

      /*
       * VAI PARA O DASHBOARD
       */
      navigate("/dashboard", {
        replace: true,
      });

    } catch (error) {
      console.error(
        "Erro ao fazer login:",
        error
      );

      setErro(
        "Não foi possível conectar ao servidor."
      );
    }

    setCarregando(false);
  }

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-logo">
          <span>MORRO</span>
          <strong>DO FÊNIX</strong>
        </div>

        <div className="login-header">
          <small>ÁREA RESTRITA</small>

          <h1>
            Entrar
          </h1>

          <p>
            Acesse o sistema do Morro do Fênix.
          </p>
        </div>

        {erro && (
          <div className="login-error">
            {erro}
          </div>
        )}

        <form onSubmit={handleLogin}>

          <div className="form-group">

            <label>
              E-mail
            </label>

            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setErro("");
              }}
              required
            />

          </div>

          <div className="form-group">

            <label>
              Senha
            </label>

            <input
              type="password"
              placeholder="Sua senha"
              value={senha}
              onChange={(event) => {
                setSenha(event.target.value);
                setErro("");
              }}
              required
            />

          </div>

          <button
            type="submit"
            className="gold-button"
            disabled={carregando}
          >
            {carregando
              ? "Entrando..."
              : "Entrar"}
          </button>

        </form>

        <div className="login-footer">

          <span>
            Ainda não possui uma conta?
          </span>

          <Link to="/registrar">
            Criar conta
          </Link>

        </div>

        <Link
          to="/"
          className="back-link"
        >
          ← Voltar para o início
        </Link>

      </div>

    </div>
  );
}