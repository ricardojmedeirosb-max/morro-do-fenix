import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PAINEIS = [
  {
    id: "inicio",
    nome: "Dashboard",
    icone: "⌂",
  },
  {
    id: "membros",
    nome: "Membros",
    icone: "♙",
  },
  {
    id: "aprovacoes",
    nome: "Aprovações",
    icone: "✓",
  },
  {
    id: "vendas",
    nome: "Vendas",
    icone: "R$",
  },
  {
    id: "lavagens",
    nome: "Lavagens",
    icone: "◇",
  },
  {
    id: "encomendas",
    nome: "Encomendas",
    icone: "▣",
  },
  {
    id: "blacklist",
    nome: "Blacklist",
    icone: "!",
  },
  {
    id: "logs",
    nome: "Logs",
    icone: "▤",
  },
  {
    id: "registros",
    nome: "Registros",
    icone: "▦",
  },
  {
    id: "usuarios",
    nome: "Usuários",
    icone: "♟",
  },
  {
    id: "permissoes",
    nome: "Permissões",
    icone: "⚿",
  },
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
    const token = localStorage.getItem(
      "morro_fenix_token"
    );

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const resposta = await fetch(
        "http://localhost:3000/api/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const dados = await resposta.json();

      if (
        !resposta.ok ||
        !dados.sucesso
      ) {
        localStorage.removeItem(
          "morro_fenix_token"
        );

        localStorage.removeItem(
          "morro_fenix_usuario"
        );

        navigate("/login");
        return;
      }

      if (
        dados.usuario.cargo !== "GERENTE" &&
        dados.usuario.cargo !== "LIDER"
      ) {
        navigate("/dashboard");
        return;
      }

      setUsuario(dados.usuario);

    } catch (error) {
      console.error(error);
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
            MODO GERENTE
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
              ADMINISTRAÇÃO
            </span>

            <h1>
              {obterNomePainel(painel)}
            </h1>
          </div>

          <div className="user-info">
            <strong>
              {usuario.nome}
            </strong>

            <span>
              {usuario.cargo}
            </span>
          </div>

        </header>

        {painel === "inicio" && (
          <DashboardInicio />
        )}

        {painel !== "inicio" && (
          <PainelGerente
            nome={obterNomePainel(painel)}
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

function DashboardInicio() {
  return (
    <>
      <section className="welcome">

        <p>
          MODO GERENTE
        </p>

        <h2>
          Painel administrativo
        </h2>

        <span>
          Gerencie os principais recursos
          do sistema Morro do Fênix.
        </span>

      </section>

      <section className="stats">

        <div className="stat-card">
          <span>
            Membros
          </span>
          <strong>
            —
          </strong>
        </div>

        <div className="stat-card">
          <span>
            Vendas
          </span>
          <strong>
            —
          </strong>
        </div>

        <div className="stat-card">
          <span>
            Registros
          </span>
          <strong>
            —
          </strong>
        </div>

        <div className="stat-card">
          <span>
            Lavagens
          </span>
          <strong>
            —
          </strong>
        </div>

      </section>
    </>
  );
}

function PainelGerente({ nome }) {
  return (
    <section className="module-card">

      <div className="module-header">

        <div>
          <span>
            ADMINISTRAÇÃO
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
          Painel administrativo preparado
          para integração com o banco de dados.
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