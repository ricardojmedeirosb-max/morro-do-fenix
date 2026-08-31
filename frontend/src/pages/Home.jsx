import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">

      <section className="hero">

        <div className="hero-content">

          <div className="hero-badge">
            Sistema Oficial
          </div>

          <h1>
            MORRO DO FÊNIX
          </h1>

          <p>
            Sistema privado de gerenciamento,
            registros, ações, vendas,
            encomendas, recrutamento e
            estatísticas.
          </p>

          <div className="hero-buttons">
            <button
              className="gold-button"
              onClick={() => navigate("/login")}
            >
              Entrar
            </button>

            <button
              className="dark-button"
              onClick={() =>
                navigate("/registrar")
              }
            >
              Cadastrar
            </button>
          </div>

        </div>

      </section>

      <section className="cards-home">

        <div className="home-card">
          <h3>📋 Registros</h3>
          <p>
            Controle completo de vendas,
            ações, encomendas e lavagens.
          </p>
        </div>

        <div className="home-card">
          <h3>🏆 Rankings</h3>
          <p>
            Ranking de membros, vendas,
            ações e recrutamentos.
          </p>
        </div>

        <div className="home-card">
          <h3>👥 Membros</h3>
          <p>
            Sistema de participação em ações
            e controle de presença.
          </p>
        </div>

        <div className="home-card">
          <h3>⚡ Painéis</h3>
          <p>
            Gestão completa em um sistema
            moderno e rápido.
          </p>
        </div>

      </section>

      <section className="about-system">

        <div className="module-card">

          <h2>
            Sobre o sistema
          </h2>

          <p>
            Este sistema possui caráter
            fictício e foi desenvolvido
            apenas para gerenciamento,
            organização e demonstração
            visual.
          </p>

          <p>
            Projeto pertencente ao
            portfólio da
            {" "}
            <a
              href="https://rblogs-psi.vercel.app/#portfolio"
              target="_blank"
              rel="noreferrer"
            >
              RB Logs
            </a>
          </p>

        </div>

      </section>

    </div>
  );
}

export default Home;