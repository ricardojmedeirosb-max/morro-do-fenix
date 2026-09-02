```jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PAINEIS = [
  { id: "inicio", nome: "Dashboard", icone: "⌂" },
  { id: "membros", nome: "Membros", icone: "♙" },
  { id: "aprovacoes", nome: "Aprovações", icone: "✓" },
  { id: "vendas", nome: "Vendas", icone: "R$" },
  { id: "lavagens", nome: "Lavagens", icone: "◇" },
  { id: "encomendas", nome: "Encomendas", icone: "▣" },
  { id: "blacklist", nome: "Blacklist", icone: "!" },
  { id: "logs", nome: "Logs", icone: "▤" },
  { id: "registros", nome: "Registros", icone: "▦" },
  { id: "usuarios", nome: "Usuários", icone: "♟" },
  { id: "permissoes", nome: "Permissões", icone: "⚿" },
];

function Gerente() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [painel, setPainel] = useState("inicio");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    verificarAcesso();
  }, []);

  async function verificarAcesso() {
    const token = localStorage.getItem("morro_fenix_token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const API_URL = (
        import.meta.env.VITE_API_URL || ""
      ).replace(/\/+$/, "");

      const resposta = await fetch(
        `${API_URL}/api/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const dados = await resposta.json();

      if (
        !resposta.ok ||
        !dados.sucesso ||
        !dados.usuario
      ) {
        localStorage.removeItem("morro_fenix_token");
        localStorage.removeItem("morro_fenix_usuario");

        navigate("/login");
        return;
      }

      const cargo = String(
        dados.usuario.cargo || ""
      ).toUpperCase();

      // GERENTE, LIDER e SUPER_ADMIN
      // possuem acesso ao modo administrativo.
      if (
        cargo !== "GERENTE" &&
        cargo !== "LIDER" &&
        cargo !== "SUPER_ADMIN"
      ) {
        navigate("/dashboard");
        return;
      }

      const usuarioAtual = {
        ...dados.usuario,
        nome_completo:
          dados.usuario.nome_completo ||
          dados.usuario.nome ||
          "Usuário",
        cargo,
      };

      setUsuario(usuarioAtual);

      localStorage.setItem(
        "morro_fenix_usuario",
        JSON.stringify(usuarioAtual)
      );
    } catch (error) {
      console.error(
        "Erro ao verificar acesso:",
        error
      );

      navigate("/login");
    } finally {
      setCarregando(false);
    }
  }

  function sairModoGerente() {
    navigate("/dashboard");
  }

  if (carregando) {
    return (
      <div className="loading-screen">
        Verificando acesso administrativo...
      </div>
    );
  }

  if (!usuario) {
    return null;
  }

  const ehSuperAdmin =
    usuario.cargo === "SUPER_ADMIN";

  return (
    <div className="dashboard gerente">

      <aside className="sidebar">

        <div className="sidebar-logo">
          <strong>MORRO</strong>
          <span>DO FÊNIX</span>

          <small
            style={{
              display: "block",
              marginTop: "12px",
              color: "#d4af37",
            }}
          >
            {ehSuperAdmin
              ? "SUPER ADMIN"
              : "MODO GERENTE"}
          </small>
        </div>

        <nav>
          {PAINEIS.map((item) => (
            <button
              key={item.id}
              className={
                painel === item.id
                  ? "active"
                  : ""
              }
              onClick={() =>
                setPainel(item.id)
              }
            >
              <span
                style={{
                  display: "inline-block",
                  width: "28px",
                  color: "#d4af37",
                }}
              >
                {item.icone}
              </span>

              {item.nome}
            </button>
          ))}
        </nav>

        <button
          className="logout-button"
          onClick={sairModoGerente}
        >
          Voltar ao sistema
        </button>

      </aside>

      <main className="dashboard-content">

        <header className="dashboard-header">

          <div>
            <span>
              {ehSuperAdmin
                ? "SUPER ADMINISTRAÇÃO"
                : "ADMINISTRAÇÃO"}
            </span>

            <h1>
              {obterNomePainel(painel)}
            </h1>
          </div>

          <div className="user-info">
            <strong>
              {usuario.nome_completo}
            </strong>

            <span>
              {usuario.cargo}
            </span>
          </div>

        </header>

        {ehSuperAdmin && (
          <div
            style={{
              marginBottom: "20px",
              padding: "14px 18px",
              border: "1px solid #d4af37",
              borderRadius: "10px",
              background:
                "rgba(212, 175, 55, 0.08)",
            }}
          >
            <strong
              style={{
                color: "#d4af37",
              }}
            >
              ACESSO SUPREMO
            </strong>

            <div
              style={{
                marginTop: "4px",
                opacity: 0.8,
              }}
            >
              Esta conta possui acesso administrativo
              completo ao sistema.
            </div>
          </div>
        )}

        {painel === "inicio" && (
          <DashboardInicio
            usuario={usuario}
          />
        )}

        {painel !== "inicio" && (
          <PainelGerente
            nome={obterNomePainel(painel)}
            superAdmin={ehSuperAdmin}
          />
        )}

        <footer className="dashboard-footer">
          Sistema fictício para fins de
          entretenimento e demonstração.
          <br />
          Projeto pertencente ao portfólio da RB Logs.
        </footer>

      </main>

    </div>
  );
}

function DashboardInicio({ usuario }) {
  const ehSuperAdmin =
    usuario?.cargo === "SUPER_ADMIN";

  return (
    <>
      <section className="welcome">

        <p>
          {ehSuperAdmin
            ? "SUPER ADMIN"
            : "MODO GERENTE"}
        </p>

        <h2>
          Painel administrativo
        </h2>

        <span>
          Bem-vindo,{" "}
          <strong>
            {usuario?.nome_completo}
          </strong>
          . Gerencie os principais recursos
          do sistema Morro do Fênix.
        </span>

      </section>

      <section className="stats">

        <div className="stat-card">
          <span>Membros</span>
          <strong>—</strong>
        </div>

        <div className="stat-card">
          <span>Vendas</span>
          <strong>—</strong>
        </div>

        <div className="stat-card">
          <span>Registros</span>
          <strong>—</strong>
        </div>

        <div className="stat-card">
          <span>Lavagens</span>
          <strong>—</strong>
        </div>

      </section>
    </>
  );
}

function PainelGerente({
  nome,
  superAdmin,
}) {
  return (
    <section className="module-card">

      <div className="module-header">
        <div>

          <span>
            {superAdmin
              ? "SUPER ADMINISTRAÇÃO"
              : "ADMINISTRAÇÃO"}
          </span>

          <h2>
            {nome}
          </h2>

        </div>
      </div>

      <div className="empty-module">

        <strong>
          {nome}
        </strong>

        <span>
          {superAdmin
            ? "Acesso completo de Super Admin. Este painel está liberado para esta conta."
            : "Painel administrativo preparado para integração com o banco de dados."}
        </span>

      </div>

    </section>
  );
}

function obterNomePainel(id) {
  const painel = PAINEIS.find(
    (item) => item.id === id
  );

  return painel
    ? painel.nome
    : "Dashboard";
}

export default Gerente;
```
