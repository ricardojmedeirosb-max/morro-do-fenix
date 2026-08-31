import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000";
const RB_LOGS_URL = "https://rblogs-psi.vercel.app/#portfolio";

/* =========================================================
   CATÁLOGO DE AÇÕES
   Estas ações NÃO aparecem automaticamente na tela.
   Elas somente ficam disponíveis para o gerente/líder
   selecionar ao registrar uma ação.
========================================================= */

const ACOES = [
  {
    nome: "FAST FOOD",
    categoria: "Normal",
    bandidosMin: 2,
    bandidosMax: 3,
    armamento: "Apenas Pistolas",
    valor: 200000,
    itens: "1x Lockpick",
    descricao: "Teti-Chão.",
  },
  {
    nome: "AMMU-NATION",
    categoria: "Normal",
    bandidosMin: 1,
    bandidosMax: 4,
    armamento: "Apenas Pistolas",
    valor: 120000,
    itens: "1x Lockpick",
    descricao:
      "Apenas dentro do estabelecimento. Perímetro restrito à parte interna.",
  },
  {
    nome: "MC DONALDS",
    categoria: "Normal",
    bandidosMin: 2,
    bandidosMax: 3,
    armamento: "Apenas Pistolas",
    valor: 200000,
    itens: "1x Lockpick",
    descricao: "Teti-Chão.",
  },
  {
    nome: "SKATE",
    categoria: "Normal",
    bandidosMin: 1,
    bandidosMax: 2,
    armamento: "Apenas Pistolas",
    valor: 100000,
    itens: "1x Lockpick",
    descricao: "Teti-Chão.",
  },
  {
    nome: "CHINA",
    categoria: "Normal",
    bandidosMin: 4,
    bandidosMax: 6,
    armamento: "Apenas Pistolas",
    valor: 250000,
    itens: "1x Lockpick",
    descricao: "Teti-Chão.",
  },
  {
    nome: "COMEDY",
    categoria: "Normal",
    bandidosMin: 3,
    bandidosMax: 5,
    armamento: "Apenas Pistolas",
    valor: 300000,
    itens: "1x Lockpick",
    descricao: "Teti-Chão.",
  },
  {
    nome: "FLEECA",
    categoria: "Normal",
    bandidosMin: 4,
    bandidosMax: 6,
    armamento: "Apenas Pistolas",
    valor: 140000,
    itens: "1x Lockpick",
    descricao: "Teti-Chão.",
  },
  {
    nome: "COSTUREIRA",
    categoria: "Normal",
    bandidosMin: 3,
    bandidosMax: 5,
    armamento: "Apenas Pistolas",
    valor: 300000,
    itens: "1x Lockpick",
    descricao: "Teti-Chão.",
  },
  {
    nome: "OBSERVATÓRIO",
    categoria: "Normal",
    bandidosMin: 7,
    bandidosMax: 11,
    armamento: "Pistolas ou Sub's",
    valor: 800000,
    itens: "2x Lockpick",
    descricao: "Teti-Chão.",
  },
  {
    nome: "GALINHEIRO",
    categoria: "Normal",
    bandidosMin: 6,
    bandidosMax: 10,
    armamento: "PT's ou Sub's",
    valor: 800000,
    itens: "1x Lockpick",
    descricao:
      "Teti-Chão. Perímetro restrito somente à parte interna.",
  },
  {
    nome: "AÇOUGUE",
    categoria: "Normal",
    bandidosMin: 5,
    bandidosMax: 7,
    armamento: "PT's ou Sub's",
    valor: 400000,
    itens: "1x Lockpick",
    descricao:
      "Teti-Chão. Perímetro restrito somente à parte interna.",
  },
  {
    nome: "BURGUER SHOT",
    categoria: "Normal",
    bandidosMin: 1,
    bandidosMax: 2,
    armamento: "Apenas Pistolas",
    valor: 120000,
    itens: "1x Lockpick",
    descricao: "Teti-Chão.",
  },
  {
    nome: "DEPARTAMENTO POLICIAL",
    categoria: "Normal",
    bandidosMin: 3,
    bandidosMax: 5,
    armamento: "Apenas Pistolas",
    valor: 180000,
    itens: "1x Lockpick",
    descricao: "Teti-Chão.",
  },
  {
    nome: "HOTEL ABANDONADO",
    categoria: "Normal",
    bandidosMin: 4,
    bandidosMax: 5,
    armamento: "Apenas Pistolas",
    valor: 220000,
    itens: "1x Lockpick",
    descricao: "Teti-Chão.",
  },
  {
    nome: "MERGULHADOR",
    categoria: "Normal",
    bandidosMin: 3,
    bandidosMax: 5,
    armamento: "Apenas Pistolas",
    valor: 200000,
    itens: "1x Lockpick",
    descricao: "Teti-Chão.",
  },
  {
    nome: "YELLOW JACK",
    categoria: "Normal",
    bandidosMin: 2,
    bandidosMax: 4,
    armamento: "Apenas Pistolas",
    valor: 120000,
    itens: "1x Lockpick",
    descricao: "Teti-Chão. Permitido apenas 1 bandido fora.",
  },
  {
    nome: "MOTOCLUBE",
    categoria: "Normal",
    bandidosMin: 3,
    bandidosMax: 5,
    armamento: "Apenas Pistolas",
    valor: 300000,
    itens: "1x Lockpick",
    descricao:
      "Teti-Chão. Somente dois bandidos na parte interna.",
  },
  {
    nome: "GOLF",
    categoria: "Normal",
    bandidosMin: 4,
    bandidosMax: 6,
    armamento: "Apenas Pistolas",
    valor: 200000,
    itens: "1x Lockpick",
    descricao: "Teti-Chão.",
  },
  {
    nome: "LOJINHA 6",
    categoria: "Normal",
    bandidosMin: 1,
    bandidosMax: 3,
    armamento: "Apenas Pistolas",
    valor: 160000,
    itens: "1x Lockpick",
    descricao: "Teti-Chão.",
  },

  {
    nome: "BANCO CENTRAL",
    categoria: "Grande",
    bandidosMin: 8,
    bandidosMax: 12,
    armamento: "Fuzis + equipamentos especiais",
    valor: 3500000,
    itens: "3x Pendrive",
    descricao: "Proibido utilizar o topo da coroa.",
  },
  {
    nome: "BANCO PALETO",
    categoria: "Grande",
    bandidosMin: 8,
    bandidosMax: 12,
    armamento: "Fuzis + equipamentos especiais",
    valor: 1250000,
    itens: "3x Pendrive",
    descricao: "Ação grande.",
  },
  {
    nome: "NIÓBIO",
    categoria: "Grande",
    bandidosMin: 6,
    bandidosMax: 11,
    armamento: "Fuzis + equipamentos especiais",
    valor: 2300000,
    itens: "1x Pendrive",
    descricao:
      "Perímetro restrito somente à parte interna do Nióbio.",
  },
  {
    nome: "AEROPORTO",
    categoria: "Grande",
    bandidosMin: 6,
    bandidosMax: 12,
    armamento: "Submetralhadora",
    valor: 2000000,
    itens: "1x Pendrive",
    descricao:
      "Não atirar enquanto os policiais sobem a escada.",
  },
  {
    nome: "CINEMA",
    categoria: "Grande",
    bandidosMin: 12,
    bandidosMax: 18,
    armamento: "Fuzil",
    valor: 5000000,
    itens: "3x Pendrive",
    descricao:
      "Teti-Chão. Dois bandidos na área da piscina. Permitidos primeiro e segundo andar do estacionamento.",
  },
  {
    nome: "HOLLYWOOD",
    categoria: "Grande",
    bandidosMin: 8,
    bandidosMax: 12,
    armamento: "Fuzis + equipamentos especiais",
    valor: 3500000,
    itens: "3x Pendrive",
    descricao: "Teti-Chão.",
  },
  {
    nome: "PORTA-AVIÕES",
    categoria: "Grande",
    bandidosMin: 8,
    bandidosMax: 12,
    armamento: "Fuzis + equipamentos especiais",
    valor: 3500000,
    itens: "3x Pendrive",
    descricao: "Ação grande.",
  },
  {
    nome: "JOALHERIA",
    categoria: "Grande",
    bandidosMin: 7,
    bandidosMax: 9,
    armamento: "Fuzis + equipamentos especiais",
    valor: 2300000,
    itens: "2x Pendrive",
    descricao:
      "Permitido à polícia utilizar até dois helicópteros.",
  },
];

/* =========================================================
   PRODUTOS
========================================================= */

const PRODUTOS = [
  "Algemas",
  "Pendrive",
  "Colete",
  "Lockpick",
  "Mochila Reforçada",
  "Ticket",
];

/* =========================================================
   UTILITÁRIOS
========================================================= */

function dinheiro(valor) {
  return Number(valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function agora() {
  return new Date().toLocaleString("pt-BR");
}

function cargoNormalizado(cargo) {
  return String(cargo || "").toUpperCase();
}

function Button({ children, onClick, variant = "gold", type = "button", disabled }) {
  return (
    <button
      type={type}
      className={`mf-btn mf-btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function Field({ label, children }) {
  return (
    <div className="mf-field">
      <label>{label}</label>
      {children}
    </div>
  );
}

function Card({ children, className = "" }) {
  return <section className={`mf-card ${className}`}>{children}</section>;
}

function Empty({ text = "Nenhum registro encontrado." }) {
  return (
    <div className="mf-empty">
      <div className="mf-empty-icon">—</div>
      <strong>{text}</strong>
    </div>
  );
}

/* =========================================================
   DASHBOARD
========================================================= */

export default function Dashboard() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pagina, setPagina] = useState("inicio");

  const [acoesRegistradas, setAcoesRegistradas] = useState([]);
  const [participantes, setParticipantes] = useState({});

  const [registros, setRegistros] = useState({
    vendas: [],
    encomendas: [],
    lavagemCliente: [],
    lavagemMembro: [],
    adv: [],
    rebaixamentos: [],
    parcerias: [],
    recrutamentos: [],
    ausencias: [],
  });

  const [abaRegistros, setAbaRegistros] = useState("vendas");
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    verificarSessao();
  }, []);

  async function verificarSessao() {
    const token = localStorage.getItem("morro_fenix_token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const resposta = await fetch(`${API_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const dados = await resposta.json();

      if (!resposta.ok || !dados.sucesso) {
        localStorage.removeItem("morro_fenix_token");
        localStorage.removeItem("morro_fenix_usuario");
        navigate("/login");
        return;
      }

      setUsuario(dados.usuario);
    } catch (erro) {
      console.error(erro);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }

  function adicionarRegistro(tipo, registro) {
    setRegistros((estado) => ({
      ...estado,
      [tipo]: [registro, ...estado[tipo]],
    }));
  }

  function registrarAcao(acao, lider) {
    const registro = {
      id: crypto.randomUUID(),
      nome: acao.nome,
      categoria: acao.categoria,
      bandidosMin: acao.bandidosMin,
      bandidosMax: acao.bandidosMax,
      armamento: acao.armamento,
      valor: acao.valor,
      itens: acao.itens,
      descricao: acao.descricao,
      lider,
      data: agora(),
    };

    setAcoesRegistradas((lista) => [registro, ...lista]);
    setPagina("acoes");
  }

  function participarAcao(id) {
    const listaAtual = participantes[id] || [];

    if (listaAtual.some((membro) => membro.id === usuario.id)) {
      return;
    }

    const acao = acoesRegistradas.find((item) => item.id === id);

    if (!acao) return;

    if (listaAtual.length >= acao.bandidosMax) {
      return;
    }

    setParticipantes((estado) => ({
      ...estado,
      [id]: [
        ...listaAtual,
        {
          id: usuario.id,
          nome: usuario.nome,
        },
      ],
    }));
  }

  function sairAcao(id) {
    setParticipantes((estado) => ({
      ...estado,
      [id]: (estado[id] || []).filter(
        (membro) => membro.id !== usuario.id
      ),
    }));
  }

  function logout() {
    localStorage.removeItem("morro_fenix_token");
    localStorage.removeItem("morro_fenix_usuario");
    navigate("/login");
  }

  if (loading) {
    return (
      <>
        <style>{CSS}</style>
        <div className="mf-loading">
          <div className="mf-logo">MF</div>
          <strong>Morro do Fênix</strong>
          <span>Carregando sistema...</span>
        </div>
      </>
    );
  }

  if (!usuario) return null;

  const cargo = cargoNormalizado(usuario.cargo);

  const isGerente = cargo === "GERENTE";
  const isLider = cargo === "LIDER" || cargo === "LÍDER";
  const podeAdministrar = isGerente || isLider;

  const menuMembro = [
    ["inicio", "Início"],
    ["acoes", "Ações"],
    ["lavagem-membro", "Minha Lavagem"],
    ["ausencia", "Ausência"],
  ];

  const menuAdministrativo = [
    ["vendas", "Vendas"],
    ["encomendas", "Encomendas"],
    ["lavagem-cliente", "Lavagem Cliente"],
    ["adv", "ADV"],
    ["rebaixamento", "Rebaixamento"],
    ["parcerias", "Parcerias"],
    ["recrutamento", "Recrutamento"],
    ["ranking", "Rankings"],
    ["registros", "Registros"],
  ];

  const menuLider = [
    ["lider", "Área do Líder"],
  ];

  function navegar(id) {
    setPagina(id);
    setMenuAberto(false);
  }

  return (
    <>
      <style>{CSS}</style>

      <div className="mf-app">
        <aside className={`mf-sidebar ${menuAberto ? "open" : ""}`}>
          <div className="mf-brand">
            <div className="mf-brand-mark">MF</div>
            <div>
              <strong>MORRO</strong>
              <span>DO FÊNIX</span>
            </div>
          </div>

          <div className="mf-profile">
            <div className="mf-avatar">
              {(usuario.nome || "M").charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{usuario.nome}</strong>
              <span>{usuario.cargo || "MEMBRO"}</span>
            </div>
          </div>

          <nav className="mf-nav">
            <div className="mf-nav-title">MEMBRO</div>

            {menuMembro.map(([id, nome]) => (
              <button
                key={id}
                className={pagina === id ? "active" : ""}
                onClick={() => navegar(id)}
              >
                <span>{icone(id)}</span>
                {nome}
              </button>
            ))}

            {podeAdministrar && (
              <>
                <div className="mf-nav-title">ADMINISTRATIVO</div>

                {menuAdministrativo.map(([id, nome]) => (
                  <button
                    key={id}
                    className={pagina === id ? "active" : ""}
                    onClick={() => navegar(id)}
                  >
                    <span>{icone(id)}</span>
                    {nome}
                  </button>
                ))}
              </>
            )}

            {isLider && (
              <>
                <div className="mf-nav-title">LIDERANÇA</div>

                {menuLider.map(([id, nome]) => (
                  <button
                    key={id}
                    className={pagina === id ? "active" : ""}
                    onClick={() => navegar(id)}
                  >
                    <span>{icone(id)}</span>
                    {nome}
                  </button>
                ))}
              </>
            )}
          </nav>

          <button className="mf-logout" onClick={logout}>
            <span>↪</span>
            Sair
          </button>
        </aside>

        <main className="mf-main">
          <header className="mf-topbar">
            <button
              className="mf-mobile-menu"
              onClick={() => setMenuAberto((v) => !v)}
            >
              ☰
            </button>

            <div>
              <span className="mf-kicker">SISTEMA INTERNO</span>
              <h1>Morro do Fênix</h1>
            </div>

            <div className="mf-top-user">
              <span className="mf-online"></span>
              <div>
                <strong>{usuario.nome}</strong>
                <small>{usuario.cargo || "MEMBRO"}</small>
              </div>
            </div>
          </header>

          <div className="mf-content">
            {pagina === "inicio" && (
              <Inicio
                usuario={usuario}
                setPagina={setPagina}
                acoesRegistradas={acoesRegistradas}
                registros={registros}
              />
            )}

            {pagina === "acoes" && (
              <Acoes
                usuario={usuario}
                podeAdministrar={podeAdministrar}
                acoesRegistradas={acoesRegistradas}
                participantes={participantes}
                registrarAcao={registrarAcao}
                participarAcao={participarAcao}
                sairAcao={sairAcao}
              />
            )}

            {pagina === "vendas" && (
              <Vendas
                usuario={usuario}
                onRegister={(registro) =>
                  adicionarRegistro("vendas", registro)
                }
              />
            )}

            {pagina === "encomendas" && (
              <Encomendas
                usuario={usuario}
                onRegister={(registro) =>
                  adicionarRegistro("encomendas", registro)
                }
              />
            )}

            {pagina === "lavagem-cliente" && (
              <LavagemCliente
                usuario={usuario}
                onRegister={(registro) =>
                  adicionarRegistro("lavagemCliente", registro)
                }
              />
            )}

            {pagina === "lavagem-membro" && (
              <LavagemMembro
                usuario={usuario}
                onRegister={(registro) =>
                  adicionarRegistro("lavagemMembro", registro)
                }
              />
            )}

            {pagina === "adv" && (
              <ADV
                usuario={usuario}
                onRegister={(registro) =>
                  adicionarRegistro("adv", registro)
                }
              />
            )}

            {pagina === "rebaixamento" && (
              <Rebaixamento
                usuario={usuario}
                onRegister={(registro) =>
                  adicionarRegistro("rebaixamentos", registro)
                }
              />
            )}

            {pagina === "parcerias" && (
              <Parcerias
                usuario={usuario}
                onRegister={(registro) =>
                  adicionarRegistro("parcerias", registro)
                }
              />
            )}

            {pagina === "recrutamento" && (
              <Recrutamento
                usuario={usuario}
                onRegister={(registro) =>
                  adicionarRegistro("recrutamentos", registro)
                }
              />
            )}

            {pagina === "ausencia" && (
              <Ausencia
                usuario={usuario}
                onRegister={(registro) =>
                  adicionarRegistro("ausencias", registro)
                }
              />
            )}

            {pagina === "ranking" && (
              <Rankings registros={registros} acoes={acoesRegistradas} />
            )}

            {pagina === "registros" && (
              <Registros
                registros={registros}
                acoes={acoesRegistradas}
                aba={abaRegistros}
                setAba={setAbaRegistros}
              />
            )}

            {pagina === "lider" && (
              <AreaLider
                usuario={usuario}
                registros={registros}
                acoes={acoesRegistradas}
              />
            )}
          </div>

          <footer className="mf-footer">
            Todos os direitos reservados à{" "}
            <a
              href={RB_LOGS_URL}
              target="_blank"
              rel="noreferrer"
            >
              RB Logs
            </a>
          </footer>
        </main>
      </div>
    </>
  );
}

/* =========================================================
   ÍCONES
========================================================= */

function icone(id) {
  const mapa = {
    inicio: "⌂",
    acoes: "◆",
    "lavagem-membro": "◉",
    ausencia: "◷",
    vendas: "▣",
    encomendas: "□",
    "lavagem-cliente": "◇",
    adv: "!",
    rebaixamento: "↓",
    parcerias: "∞",
    recrutamento: "+",
    ranking: "★",
    registros: "☷",
    lider: "♛",
  };

  return mapa[id] || "•";
}

/* =========================================================
   INÍCIO
========================================================= */

function Inicio({
  usuario,
  setPagina,
  acoesRegistradas,
  registros,
}) {
  const totalVendas = registros.vendas.length;
  const totalLavagens =
    registros.lavagemCliente.length +
    registros.lavagemMembro.length;

  return (
    <>
      <div className="mf-hero">
        <div>
          <span className="mf-kicker">PAINEL PRINCIPAL</span>
          <h2>
            Bem-vindo, <em>{usuario.nome}</em>
          </h2>
          <p>
            Central de operações e gerenciamento do Morro do Fênix.
          </p>
        </div>

        <div className="mf-hero-badge">
          <span>STATUS</span>
          <strong>ONLINE</strong>
        </div>
      </div>

      <div className="mf-stats">
        <Stat
          title="Ações abertas"
          value={acoesRegistradas.length}
          icon="◆"
        />
        <Stat
          title="Vendas registradas"
          value={totalVendas}
          icon="▣"
        />
        <Stat
          title="Lavagens"
          value={totalLavagens}
          icon="◇"
        />
        <Stat
          title="Seu cargo"
          value={usuario.cargo || "MEMBRO"}
          icon="♛"
        />
      </div>

      <Card>
        <SectionTitle
          kicker="ACESSO RÁPIDO"
          title="Painéis principais"
          description="Acesse diretamente as áreas disponíveis para sua função."
        />

        <div className="mf-panel-grid">
          <QuickPanel
            icon="◆"
            title="Ações"
            text="Visualize ações abertas e participe delas."
            onClick={() => setPagina("acoes")}
          />

          <QuickPanel
            icon="◇"
            title="Minha Lavagem"
            text="Registre e acompanhe suas lavagens."
            onClick={() => setPagina("lavagem-membro")}
          />

          {String(usuario.cargo).toUpperCase() !== "MEMBRO" && (
            <>
              <QuickPanel
                icon="▣"
                title="Vendas"
                text="Registrar e consultar vendas."
                onClick={() => setPagina("vendas")}
              />

              <QuickPanel
                icon="★"
                title="Rankings"
                text="Acompanhar desempenho da equipe."
                onClick={() => setPagina("ranking")}
              />
            </>
          )}
        </div>
      </Card>
    </>
  );
}

function Stat({ title, value, icon }) {
  return (
    <div className="mf-stat">
      <div className="mf-stat-icon">{icon}</div>
      <span>{title}</span>
      <strong>{value}</strong>
    </div>
  );
}

function QuickPanel({ icon, title, text, onClick }) {
  return (
    <button className="mf-quick" onClick={onClick}>
      <div className="mf-quick-icon">{icon}</div>
      <div>
        <strong>{title}</strong>
        <span>{text}</span>
      </div>
      <b>→</b>
    </button>
  );
}

function SectionTitle({ kicker, title, description }) {
  return (
    <div className="mf-section-title">
      <div>
        <span>{kicker}</span>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
}

/* =========================================================
   AÇÕES
========================================================= */

function Acoes({
  usuario,
  podeAdministrar,
  acoesRegistradas,
  participantes,
  registrarAcao,
  participarAcao,
  sairAcao,
}) {
  const [categoria, setCategoria] = useState("Todas");
  const [lider, setLider] = useState("");
  const [acao, setAcao] = useState("");
  const [erro, setErro] = useState("");

  const lista = useMemo(() => {
    return acoesRegistradas.filter(
      (item) =>
        categoria === "Todas" ||
        item.categoria === categoria
    );
  }, [acoesRegistradas, categoria]);

  function registrar(event) {
    event.preventDefault();

    if (!lider || !acao) {
      setErro("Preencha o líder e selecione uma ação.");
      return;
    }

    const encontrada = ACOES.find(
      (item) => item.nome === acao
    );

    if (!encontrada) return;

    registrarAcao(encontrada, lider);

    setLider("");
    setAcao("");
    setErro("");
  }

  return (
    <>
      {podeAdministrar && (
        <Card className="mf-admin-card">
          <SectionTitle
            kicker="GERÊNCIA / LIDERANÇA"
            title="Registrar nova ação"
            description="A ação só aparecerá para os membros depois de ser registrada."
          />

          <form onSubmit={registrar}>
            <div className="mf-form-grid">
              <Field label="Nome do líder da ação">
                <input
                  value={lider}
                  onChange={(e) => setLider(e.target.value)}
                  placeholder="Digite o nome do líder"
                />
              </Field>

              <Field label="Selecionar ação">
                <select
                  value={acao}
                  onChange={(e) => setAcao(e.target.value)}
                >
                  <option value="">
                    Selecione uma ação
                  </option>

                  <optgroup label="Ações normais">
                    {ACOES.filter(
                      (a) => a.categoria === "Normal"
                    ).map((item) => (
                      <option
                        key={item.nome}
                        value={item.nome}
                      >
                        {item.nome}
                      </option>
                    ))}
                  </optgroup>

                  <optgroup label="Ações grandes">
                    {ACOES.filter(
                      (a) => a.categoria === "Grande"
                    ).map((item) => (
                      <option
                        key={item.nome}
                        value={item.nome}
                      >
                        {item.nome}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </Field>
            </div>

            {erro && <div className="mf-error">{erro}</div>}

            <Button type="submit">
              Registrar ação
            </Button>
          </form>
        </Card>
      )}

      <Card>
        <div className="mf-toolbar">
          <SectionTitle
            kicker="OPERAÇÕES"
            title="Ações abertas"
            description="Somente ações que foram registradas aparecem aqui."
          />

          <select
            className="mf-filter"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option>Todas</option>
            <option>Normal</option>
            <option>Grande</option>
          </select>
        </div>

        {lista.length === 0 ? (
          <Empty text="Nenhuma ação foi registrada ainda." />
        ) : (
          <div className="mf-action-grid">
            {lista.map((item) => {
              const membros = participantes[item.id] || [];

              const participando = membros.some(
                (membro) => membro.id === usuario.id
              );

              const cheia =
                membros.length >= item.bandidosMax;

              return (
                <div
                  className={`mf-action ${
                    item.categoria === "Grande"
                      ? "large"
                      : ""
                  }`}
                  key={item.id}
                >
                  <div className="mf-action-head">
                    <div>
                      <span className="mf-tag">
                        {item.categoria}
                      </span>
                      <h3>{item.nome}</h3>
                    </div>

                    <span className="mf-action-value">
                      {dinheiro(item.valor)}
                    </span>
                  </div>

                  <div className="mf-action-details">
                    <Info
                      label="Membros"
                      value={`${item.bandidosMin}–${item.bandidosMax}`}
                    />

                    <Info
                      label="Armamento"
                      value={item.armamento}
                    />

                    <Info
                      label="Itens"
                      value={item.itens}
                    />

                    <Info
                      label="Líder"
                      value={item.lider}
                    />
                  </div>

                  <div className="mf-description">
                    <span>DESCRIÇÃO</span>
                    <p>{item.descricao}</p>
                  </div>

                  <div className="mf-participants">
                    <div className="mf-participant-head">
                      <strong>Participantes</strong>
                      <span>
                        {membros.length} / {item.bandidosMax}
                      </span>
                    </div>

                    <div className="mf-member-list">
                      {membros.map((membro) => (
                        <span
                          className="mf-member-chip"
                          key={membro.id}
                        >
                          {membro.nome}
                        </span>
                      ))}
                    </div>

                    {!participando ? (
                      <Button
                        disabled={cheia}
                        onClick={() =>
                          participarAcao(item.id)
                        }
                      >
                        {cheia
                          ? "Vagas preenchidas"
                          : "Participar da ação"}
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() =>
                          sairAcao(item.id)
                        }
                      >
                        Sair da ação
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

/* =========================================================
   VENDAS
========================================================= */

function Vendas({ usuario, onRegister }) {
  const [cliente, setCliente] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [valor, setValor] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [mensagem, setMensagem] = useState("");

  function alternarProduto(produto) {
    setProdutos((lista) =>
      lista.includes(produto)
        ? lista.filter((p) => p !== produto)
        : [...lista, produto]
    );
  }

  function enviar(event) {
    event.preventDefault();

    if (!produtos.length) {
      setMensagem("Selecione pelo menos um produto.");
      return;
    }

    onRegister({
      id: crypto.randomUUID(),
      cliente,
      produtos,
      quantidade: Number(quantidade),
      valor: Number(valor),
      responsavel: usuario.nome,
      data: agora(),
    });

    setCliente("");
    setQuantidade(1);
    setValor("");
    setProdutos([]);
    setMensagem("Venda registrada com sucesso.");
  }

  return (
    <Card>
      <SectionTitle
        kicker="REGISTRO"
        title="Vendas"
        description="Selecione um ou vários produtos na mesma venda."
      />

      {mensagem && (
        <div className="mf-success">{mensagem}</div>
      )}

      <form onSubmit={enviar}>
        <div className="mf-form-grid">
          <Field label="Cliente">
            <input
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              required
              placeholder="Nome do cliente"
            />
          </Field>

          <Field label="Quantidade">
            <input
              type="number"
              min="1"
              value={quantidade}
              onChange={(e) =>
                setQuantidade(e.target.value)
              }
            />
          </Field>

          <Field label="Valor">
            <input
              type="number"
              min="0"
              step="0.01"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              required
              placeholder="0,00"
            />
          </Field>
        </div>

        <div className="mf-product-box">
          <span className="mf-label">
            PRODUTOS — PODE SELECIONAR VÁRIOS
          </span>

          <div className="mf-product-grid">
            {PRODUTOS.map((produto) => {
              const selecionado =
                produtos.includes(produto);

              return (
                <button
                  type="button"
                  key={produto}
                  className={
                    selecionado
                      ? "mf-product selected"
                      : "mf-product"
                  }
                  onClick={() =>
                    alternarProduto(produto)
                  }
                >
                  <span>{selecionado ? "✓" : "+"}</span>
                  {produto}
                </button>
              );
            })}
          </div>
        </div>

        <Button type="submit">
          Registrar venda
        </Button>
      </form>
    </Card>
  );
}

/* =========================================================
   ENCOMENDAS
========================================================= */

function Encomendas({ usuario, onRegister }) {
  const [cliente, setCliente] = useState("");
  const [dataEntrega, setDataEntrega] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [mensagem, setMensagem] = useState("");

  function alternar(produto) {
    setProdutos((lista) =>
      lista.includes(produto)
        ? lista.filter((p) => p !== produto)
        : [...lista, produto]
    );
  }

  function enviar(event) {
    event.preventDefault();

    if (!produtos.length) {
      setMensagem("Selecione pelo menos um item.");
      return;
    }

    onRegister({
      id: crypto.randomUUID(),
      cliente,
      produtos,
      dataEntrega,
      responsavel: usuario.nome,
      data: agora(),
    });

    setCliente("");
    setDataEntrega("");
    setProdutos([]);
    setMensagem("Encomenda registrada.");
  }

  return (
    <Card>
      <SectionTitle
        kicker="REGISTRO"
        title="Encomendas"
        description="Registre vários produtos e defina a data de entrega."
      />

      {mensagem && (
        <div className="mf-success">{mensagem}</div>
      )}

      <form onSubmit={enviar}>
        <div className="mf-form-grid">
          <Field label="Cliente">
            <input
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              required
              placeholder="Nome do cliente"
            />
          </Field>

          <Field label="Data de entrega">
            <input
              type="date"
              value={dataEntrega}
              onChange={(e) =>
                setDataEntrega(e.target.value)
              }
              required
            />
          </Field>
        </div>

        <div className="mf-product-box">
          <span className="mf-label">
            ITENS — SELECIONE VÁRIOS
          </span>

          <div className="mf-product-grid">
            {PRODUTOS.map((produto) => (
              <button
                type="button"
                key={produto}
                className={
                  produtos.includes(produto)
                    ? "mf-product selected"
                    : "mf-product"
                }
                onClick={() => alternar(produto)}
              >
                <span>
                  {produtos.includes(produto)
                    ? "✓"
                    : "+"}
                </span>
                {produto}
              </button>
            ))}
          </div>
        </div>

        <Button type="submit">
          Registrar encomenda
        </Button>
      </form>
    </Card>
  );
}

/* =========================================================
   LAVAGEM CLIENTE
========================================================= */

function LavagemCliente({ usuario, onRegister }) {
  const [cliente, setCliente] = useState("");
  const [idCliente, setIdCliente] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("parceria");
  const [comprovante, setComprovante] = useState(null);
  const [mensagem, setMensagem] = useState("");

  const percentual = tipo === "parceria" ? 0.2 : 0.3;

  const total = Number(valor || 0);
  const valorFac = total * percentual;
  const restante = total - valorFac;

  function registrar(event) {
    event.preventDefault();

    if (!comprovante) {
      setMensagem(
        "É obrigatório anexar o comprovante da lavagem."
      );
      return;
    }

    onRegister({
      id: crypto.randomUUID(),
      cliente,
      idCliente,
      valor: total,
      parceria: tipo === "parceria",
      percentual: percentual * 100,
      valorFac,
      restante,
      comprovante: comprovante.name,
      responsavel: usuario.nome,
      data: agora(),
      status: "PENDENTE",
    });

    setCliente("");
    setIdCliente("");
    setValor("");
    setComprovante(null);
    setMensagem("Lavagem registrada.");
  }

  return (
    <Card>
      <SectionTitle
        kicker="FINANCEIRO"
        title="Lavagem Cliente"
        description="Registre o valor, o tipo de parceria e o comprovante."
      />

      {mensagem && (
        <div className="mf-success">{mensagem}</div>
      )}

      <form onSubmit={registrar}>
        <div className="mf-form-grid">
          <Field label="Cliente">
            <input
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              required
            />
          </Field>

          <Field label="ID do cliente">
            <input
              value={idCliente}
              onChange={(e) =>
                setIdCliente(e.target.value)
              }
              required
            />
          </Field>

          <Field label="Valor da lavagem">
            <input
              type="number"
              min="0"
              step="0.01"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              required
            />
          </Field>

          <Field label="Tipo de lavagem">
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option value="parceria">
                Com parceria — 20% FAC
              </option>

              <option value="sem-parceria">
                Sem parceria — 30% FAC
              </option>
            </select>
          </Field>

          <Field label="Comprovante / print">
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setComprovante(e.target.files?.[0] || null)
              }
              required
            />
          </Field>
        </div>

        <div className="mf-wash-summary">
          <div>
            <span>Valor total</span>
            <strong>{dinheiro(total)}</strong>
          </div>

          <div>
            <span>Valor para FAC</span>
            <strong>{dinheiro(valorFac)}</strong>
            <small>{percentual * 100}%</small>
          </div>

          <div>
            <span>Valor restante</span>
            <strong>{dinheiro(restante)}</strong>
          </div>
        </div>

        <div className="mf-preview">
          <div>
            <span>CLIENTE</span>
            <strong>{cliente || "—"}</strong>
          </div>

          <div>
            <span>PARCERIA</span>
            <strong>
              {tipo === "parceria" ? "SIM" : "NÃO"}
            </strong>
          </div>

          <div>
            <span>RESPONSÁVEL</span>
            <strong>{usuario.nome}</strong>
          </div>

          <div>
            <span>STATUS</span>
            <strong>PENDENTE</strong>
          </div>
        </div>

        <Button type="submit">
          Registrar lavagem
        </Button>
      </form>
    </Card>
  );
}

/* =========================================================
   LAVAGEM MEMBRO
========================================================= */

function LavagemMembro({ usuario, onRegister }) {
  return (
    <div>
      <LavagemCliente
        usuario={usuario}
        onRegister={onRegister}
      />
    </div>
  );
}

/* =========================================================
   ADV
========================================================= */

function ADV({ usuario, onRegister }) {
  const [membro, setMembro] = useState("");
  const [advs, setAdvs] = useState([]);
  const [mensagem, setMensagem] = useState("");

  function alternar(numero) {
    setAdvs((lista) =>
      lista.includes(numero)
        ? lista.filter((item) => item !== numero)
        : [...lista, numero]
    );
  }

  function registrar(event) {
    event.preventDefault();

    if (!membro || !advs.length) {
      setMensagem(
        "Informe o membro e selecione pelo menos um ADV."
      );
      return;
    }

    onRegister({
      id: crypto.randomUUID(),
      membro,
      advs,
      responsavel: usuario.nome,
      data: agora(),
    });

    setMembro("");
    setAdvs([]);
    setMensagem("ADV registrado.");
  }

  return (
    <Card>
      <SectionTitle
        kicker="DISCIPLINAR"
        title="ADV"
        description="É possível selecionar ADV 1, 2 e 3 simultaneamente."
      />

      {mensagem && (
        <div className="mf-success">{mensagem}</div>
      )}

      <form onSubmit={registrar}>
        <Field label="Membro">
          <input
            value={membro}
            onChange={(e) => setMembro(e.target.value)}
            placeholder="Nome do membro"
            required
          />
        </Field>

        <div className="mf-select-grid">
          {[1, 2, 3].map((numero) => (
            <button
              type="button"
              key={numero}
              className={
                advs.includes(numero)
                  ? "mf-select-card selected"
                  : "mf-select-card"
              }
              onClick={() => alternar(numero)}
            >
              <span>
                {advs.includes(numero) ? "✓" : "0" + numero}
              </span>

              <strong>ADV {numero}</strong>

              <small>
                {advs.includes(numero)
                  ? "Selecionado"
                  : "Selecionar"}
              </small>
            </button>
          ))}
        </div>

        <Button type="submit">
          Registrar ADV
        </Button>
      </form>
    </Card>
  );
}

/* =========================================================
   REBAIXAMENTO
========================================================= */

function Rebaixamento({ usuario, onRegister }) {
  const [membro, setMembro] = useState("");
  const [cargoAtual, setCargoAtual] = useState("");
  const [novoCargo, setNovoCargo] = useState("");
  const [motivo, setMotivo] = useState("");

  function enviar(e) {
    e.preventDefault();

    onRegister({
      id: crypto.randomUUID(),
      membro,
      cargoAtual,
      novoCargo,
      motivo,
      responsavel: usuario.nome,
      data: agora(),
    });

    setMembro("");
    setCargoAtual("");
    setNovoCargo("");
    setMotivo("");
  }

  return (
    <Card>
      <SectionTitle
        kicker="ADMINISTRAÇÃO"
        title="Rebaixamento"
        description="Registre alterações de cargo dos membros."
      />

      <form onSubmit={enviar}>
        <div className="mf-form-grid">
          <Field label="Membro">
            <input
              value={membro}
              onChange={(e) => setMembro(e.target.value)}
              required
            />
          </Field>

          <Field label="Cargo atual">
            <input
              value={cargoAtual}
              onChange={(e) =>
                setCargoAtual(e.target.value)
              }
              required
            />
          </Field>

          <Field label="Novo cargo">
            <input
              value={novoCargo}
              onChange={(e) =>
                setNovoCargo(e.target.value)
              }
              required
            />
          </Field>

          <Field label="Motivo">
            <input
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              required
            />
          </Field>
        </div>

        <Button type="submit">
          Registrar rebaixamento
        </Button>
      </form>
    </Card>
  );
}

/* =========================================================
   PARCERIAS
========================================================= */

function Parcerias({ usuario, onRegister }) {
  const [organizacao, setOrganizacao] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [contato, setContato] = useState("");
  const [observacao, setObservacao] = useState("");

  function enviar(e) {
    e.preventDefault();

    onRegister({
      id: crypto.randomUUID(),
      organizacao,
      responsavel,
      contato,
      observacao,
      responsavelSistema: usuario.nome,
      data: agora(),
    });

    setOrganizacao("");
    setResponsavel("");
    setContato("");
    setObservacao("");
  }

  return (
    <Card>
      <SectionTitle
        kicker="RELACIONAMENTO"
        title="Parcerias"
        description="Gerencie os registros de parceria."
      />

      <form onSubmit={enviar}>
        <div className="mf-form-grid">
          <Field label="Organização">
            <input
              value={organizacao}
              onChange={(e) =>
                setOrganizacao(e.target.value)
              }
              required
            />
          </Field>

          <Field label="Responsável">
            <input
              value={responsavel}
              onChange={(e) =>
                setResponsavel(e.target.value)
              }
              required
            />
          </Field>

          <Field label="Contato">
            <input
              value={contato}
              onChange={(e) => setContato(e.target.value)}
            />
          </Field>

          <Field label="Observação">
            <input
              value={observacao}
              onChange={(e) =>
                setObservacao(e.target.value)
              }
            />
          </Field>
        </div>

        <Button type="submit">
          Registrar parceria
        </Button>
      </form>
    </Card>
  );
}

/* =========================================================
   RECRUTAMENTO
========================================================= */

function Recrutamento({ usuario, onRegister }) {
  const [nome, setNome] = useState("");
  const [id, setId] = useState("");
  const [discord, setDiscord] = useState("");

  function enviar(e) {
    e.preventDefault();

    onRegister({
      id: crypto.randomUUID(),
      nome,
      id,
      discord,
      recrutador: usuario.nome,
      data: agora(),
    });

    setNome("");
    setId("");
    setDiscord("");
  }

  return (
    <Card>
      <SectionTitle
        kicker="MEMBROS"
        title="Recrutamento"
        description="Registre novos membros e acompanhe quem realizou o recrutamento."
      />

      <form onSubmit={enviar}>
        <div className="mf-form-grid">
          <Field label="Nome">
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </Field>

          <Field label="ID">
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </Field>

          <Field label="ID Discord">
            <input
              value={discord}
              onChange={(e) =>
                setDiscord(e.target.value)
              }
            />
          </Field>
        </div>

        <Button type="submit">
          Registrar recrutamento
        </Button>
      </form>
    </Card>
  );
}

/* =========================================================
   AUSÊNCIA
========================================================= */

function Ausencia({ usuario, onRegister }) {
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [motivo, setMotivo] = useState("");

  function enviar(e) {
    e.preventDefault();

    onRegister({
      id: crypto.randomUUID(),
      membro: usuario.nome,
      dataInicio,
      dataFim,
      motivo,
      dataRegistro: agora(),
    });

    setDataInicio("");
    setDataFim("");
    setMotivo("");
  }

  return (
    <Card>
      <SectionTitle
        kicker="MEMBROS"
        title="Registrar ausência"
        description="Informe o período em que ficará ausente."
      />

      <form onSubmit={enviar}>
        <div className="mf-form-grid">
          <Field label="Início">
            <input
              type="date"
              value={dataInicio}
              onChange={(e) =>
                setDataInicio(e.target.value)
              }
              required
            />
          </Field>

          <Field label="Fim">
            <input
              type="date"
              value={dataFim}
              onChange={(e) =>
                setDataFim(e.target.value)
              }
              required
            />
          </Field>

          <Field label="Motivo">
            <input
              value={motivo}
              onChange={(e) =>
                setMotivo(e.target.value)
              }
              required
              placeholder="Informe o motivo"
            />
          </Field>
        </div>

        <Button type="submit">
          Registrar ausência
        </Button>
      </form>
    </Card>
  );
}

/* =========================================================
   RANKINGS
========================================================= */

function Rankings({ registros, acoes }) {
  const rankingRecrutamento = contar(
    registros.recrutamentos,
    "recrutador"
  );

  const rankingVendas = contar(
    registros.vendas,
    "responsavel"
  );

  const rankingAcoes = contar(
    acoes,
    "lider"
  );

  const rankingLavagem = [
    ...registros.lavagemCliente,
    ...registros.lavagemMembro,
  ];

  const rankingLavagemFinal = contar(
    rankingLavagem,
    "responsavel"
  );

  return (
    <div>
      <SectionTitle
        kicker="DESEMPENHO"
        title="Rankings"
        description="Desempenho separado por categoria."
      />

      <div className="mf-ranking-grid">
        <RankingCard
          title="Recrutamento"
          dados={rankingRecrutamento}
        />

        <RankingCard
          title="Vendas"
          dados={rankingVendas}
        />

        <RankingCard
          title="Ações"
          dados={rankingAcoes}
        />

        <RankingCard
          title="Lavagem"
          dados={rankingLavagemFinal}
        />
      </div>
    </div>
  );
}

function contar(lista, campo) {
  const mapa = {};

  lista.forEach((item) => {
    const nome = item?.[campo];

    if (!nome) return;

    mapa[nome] = (mapa[nome] || 0) + 1;
  });

  return Object.entries(mapa)
    .map(([nome, quantidade]) => ({
      nome,
      quantidade,
    }))
    .sort((a, b) => b.quantidade - a.quantidade);
}

function RankingCard({ title, dados }) {
  return (
    <Card className="mf-ranking-card">
      <div className="mf-ranking-title">
        <span>★</span>
        <h3>Ranking de {title}</h3>
      </div>

      {dados.length === 0 ? (
        <Empty text="Nenhum registro ainda." />
      ) : (
        <div className="mf-ranking-list">
          {dados.slice(0, 10).map((item, index) => (
            <div className="mf-ranking-item" key={item.nome}>
              <strong>{index + 1}º</strong>

              <div>
                <span>{item.nome}</span>
                <small>
                  {item.quantidade} registro
                  {item.quantidade === 1 ? "" : "s"}
                </small>
              </div>

              <b>{item.quantidade}</b>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

/* =========================================================
   REGISTROS
========================================================= */

function Registros({
  registros,
  acoes,
  aba,
  setAba,
}) {
  const abas = [
    ["vendas", "Vendas"],
    ["lavagemCliente", "Lavagem Cliente"],
    ["lavagemMembro", "Lavagem Membro"],
    ["encomendas", "Encomendas"],
    ["adv", "ADV"],
    ["rebaixamentos", "Rebaixamentos"],
    ["parcerias", "Parcerias"],
    ["recrutamentos", "Recrutamento"],
    ["acoes", "Ações"],
    ["ausencias", "Ausências"],
  ];

  return (
    <div>
      <SectionTitle
        kicker="HISTÓRICO"
        title="Registros"
        description="Cada categoria possui sua própria aba."
      />

      <div className="mf-tabs">
        {abas.map(([id, nome]) => (
          <button
            key={id}
            className={aba === id ? "active" : ""}
            onClick={() => setAba(id)}
          >
            {nome}
          </button>
        ))}
      </div>

      {aba === "acoes" ? (
        <ListaAcoes registros={acoes} />
      ) : (
        <ListaRegistros
          tipo={aba}
          lista={registros[aba] || []}
        />
      )}
    </div>
  );
}

function ListaRegistros({ tipo, lista }) {
  if (!lista.length) {
    return <Empty text="Nenhum registro nesta categoria." />;
  }

  return (
    <div className="mf-records">
      {lista.map((item) => (
        <div className="mf-record" key={item.id}>
          <div className="mf-record-main">
            <span className="mf-record-type">
              {nomeTipoRegistro(tipo)}
            </span>

            <h3>
              {item.cliente ||
                item.membro ||
                item.nome ||
                item.organizacao ||
                "Registro"}
            </h3>

            <p>
              Responsável:{" "}
              {item.responsavel ||
                item.recrutador ||
                item.responsavelSistema ||
                "—"}
            </p>
          </div>

          <div className="mf-record-side">
            <strong>{item.data || item.dataRegistro}</strong>

            {item.valor !== undefined && (
              <span>{dinheiro(item.valor)}</span>
            )}

            {item.status && (
              <span className="mf-status">
                {item.status}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function ListaAcoes({ registros }) {
  if (!registros.length) {
    return <Empty text="Nenhuma ação foi registrada." />;
  }

  return (
    <div className="mf-records">
      {registros.map((item) => (
        <div className="mf-record" key={item.id}>
          <div className="mf-record-main">
            <span className="mf-record-type">
              AÇÃO {item.categoria}
            </span>

            <h3>{item.nome}</h3>

            <p>
              Líder: {item.lider}
            </p>
          </div>

          <div className="mf-record-side">
            <strong>{item.data}</strong>
            <span>{dinheiro(item.valor)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function nomeTipoRegistro(tipo) {
  const nomes = {
    vendas: "VENDA",
    lavagemCliente: "LAVAGEM CLIENTE",
    lavagemMembro: "LAVAGEM MEMBRO",
    encomendas: "ENCOMENDA",
    adv: "ADV",
    rebaixamentos: "REBAIXAMENTO",
    parcerias: "PARCERIA",
    recrutamentos: "RECRUTAMENTO",
    ausencias: "AUSÊNCIA",
  };

  return nomes[tipo] || "REGISTRO";
}

/* =========================================================
   ÁREA DO LÍDER
========================================================= */

function AreaLider({ usuario, registros, acoes }) {
  return (
    <div>
      <SectionTitle
        kicker="LIDERANÇA"
        title="Área do Líder"
        description="Acompanhamento das atividades e registros da equipe."
      />

      <div className="mf-stats">
        <Stat
          title="Ações"
          value={acoes.length}
          icon="◆"
        />

        <Stat
          title="Vendas"
          value={registros.vendas.length}
          icon="▣"
        />

        <Stat
          title="Lavagens"
          value={
            registros.lavagemCliente.length +
            registros.lavagemMembro.length
          }
          icon="◇"
        />

        <Stat
          title="Recrutamentos"
          value={registros.recrutamentos.length}
          icon="+"
        />
      </div>

      <Card>
        <SectionTitle
          kicker="LOGS"
          title="Atividade recente"
        />

        <div className="mf-records">
          {[
            ...acoes.map((item) => ({
              tipo: "AÇÃO",
              nome: item.nome,
              responsavel: item.lider,
              data: item.data,
            })),
            ...registros.vendas.map((item) => ({
              tipo: "VENDA",
              nome: item.cliente,
              responsavel: item.responsavel,
              data: item.data,
            })),
            ...registros.recrutamentos.map((item) => ({
              tipo: "RECRUTAMENTO",
              nome: item.nome,
              responsavel: item.recrutador,
              data: item.data,
            })),
          ]
            .slice(0, 20)
            .map((item, index) => (
              <div className="mf-record" key={index}>
                <div className="mf-record-main">
                  <span className="mf-record-type">
                    {item.tipo}
                  </span>
                  <h3>{item.nome}</h3>
                  <p>
                    Responsável: {item.responsavel}
                  </p>
                </div>

                <div className="mf-record-side">
                  <strong>{item.data}</strong>
                </div>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
}

/* =========================================================
   CSS COMPLETO
   Fica dentro do próprio Dashboard para não depender
   de outro arquivo CSS.
========================================================= */

const CSS = `
* {
  box-sizing: border-box;
}

.mf-app {
  min-height: 100vh;
  background:
    radial-gradient(circle at 80% 0%, rgba(212, 175, 55, .07), transparent 32%),
    #070707;
  color: #f4f1e8;
  display: flex;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.mf-sidebar {
  width: 270px;
  min-height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 20;
  padding: 25px 17px;
  background: linear-gradient(180deg, #0d0d0d, #080808);
  border-right: 1px solid rgba(212,175,55,.13);
  display: flex;
  flex-direction: column;
}

.mf-brand {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 5px 9px 25px;
}

.mf-brand-mark,
.mf-logo {
  width: 45px;
  height: 45px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #f0d477, #9f7620);
  color: #090909;
  font-weight: 950;
  box-shadow: 0 10px 30px rgba(212,175,55,.14);
}

.mf-brand strong {
  display: block;
  letter-spacing: 3px;
  font-size: 14px;
}

.mf-brand span {
  display: block;
  color: #c7a74a;
  letter-spacing: 2px;
  font-size: 10px;
  margin-top: 2px;
}

.mf-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px;
  border: 1px solid rgba(255,255,255,.06);
  border-radius: 15px;
  background: rgba(255,255,255,.025);
  margin-bottom: 23px;
}

.mf-avatar {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: rgba(212,175,55,.12);
  color: #e6c65d;
  border: 1px solid rgba(212,175,55,.22);
  font-weight: 800;
}

.mf-profile strong,
.mf-profile span {
  display: block;
}

.mf-profile strong {
  font-size: 13px;
}

.mf-profile span {
  color: #8b887e;
  font-size: 10px;
  margin-top: 3px;
  text-transform: uppercase;
}

.mf-nav {
  overflow-y: auto;
  flex: 1;
  padding-right: 3px;
}

.mf-nav-title {
  color: #6d6a62;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1.7px;
  padding: 13px 12px 7px;
}

.mf-nav button {
  width: 100%;
  border: 0;
  background: transparent;
  color: #99968e;
  padding: 11px 13px;
  margin: 2px 0;
  border-radius: 11px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  text-align: left;
  font-weight: 650;
  font-size: 13px;
  transition: .2s;
}

.mf-nav button span {
  width: 21px;
  text-align: center;
  color: #716e65;
}

.mf-nav button:hover {
  background: rgba(255,255,255,.045);
  color: #eee;
}

.mf-nav button.active {
  color: #f1d26a;
  background: linear-gradient(90deg, rgba(212,175,55,.14), rgba(212,175,55,.035));
  border: 1px solid rgba(212,175,55,.15);
}

.mf-nav button.active span {
  color: #d4af37;
}

.mf-logout {
  margin-top: 15px;
  padding: 12px;
  border-radius: 11px;
  border: 1px solid rgba(255,255,255,.07);
  background: rgba(255,255,255,.025);
  color: #aaa69d;
  cursor: pointer;
  font-weight: 700;
}

.mf-logout:hover {
  border-color: rgba(212,175,55,.25);
  color: #e8ce72;
}

.mf-main {
  width: calc(100% - 270px);
  margin-left: 270px;
  min-height: 100vh;
}

.mf-topbar {
  height: 84px;
  border-bottom: 1px solid rgba(255,255,255,.055);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  background: rgba(7,7,7,.86);
  backdrop-filter: blur(15px);
  position: sticky;
  top: 0;
  z-index: 10;
}

.mf-kicker {
  display: block;
  color: #b99331;
  font-size: 9px;
  letter-spacing: 2px;
  font-weight: 850;
}

.mf-topbar h1 {
  font-size: 20px;
  margin: 4px 0 0;
  letter-spacing: -.5px;
}

.mf-top-user {
  display: flex;
  align-items: center;
  gap: 10px;
}

.mf-top-user strong,
.mf-top-user small {
  display: block;
  text-align: right;
}

.mf-top-user strong {
  font-size: 13px;
}

.mf-top-user small {
  color: #85827a;
  font-size: 9px;
  margin-top: 2px;
  text-transform: uppercase;
}

.mf-online {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #c9a936;
  box-shadow: 0 0 10px rgba(201,169,54,.7);
}

.mf-mobile-menu {
  display: none;
}

.mf-content {
  max-width: 1450px;
  margin: auto;
  padding: 35px 40px 10px;
}

.mf-footer {
  text-align: center;
  color: #57544e;
  font-size: 11px;
  padding: 30px;
}

.mf-footer a {
  color: #c8a43d;
  text-decoration: none;
}

.mf-footer a:hover {
  text-decoration: underline;
}

.mf-hero {
  min-height: 190px;
  padding: 35px;
  border-radius: 22px;
  border: 1px solid rgba(212,175,55,.13);
  background:
    radial-gradient(circle at 90% 10%, rgba(212,175,55,.13), transparent 35%),
    linear-gradient(135deg, #11110f, #0b0b0b);
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  position: relative;
}

.mf-hero:after {
  content: "";
  position: absolute;
  width: 220px;
  height: 220px;
  right: -90px;
  bottom: -100px;
  border: 1px solid rgba(212,175,55,.13);
  border-radius: 50%;
}

.mf-hero h2 {
  margin: 9px 0 8px;
  font-size: 31px;
  letter-spacing: -1px;
}

.mf-hero h2 em {
  color: #d6b34c;
  font-style: normal;
}

.mf-hero p {
  margin: 0;
  color: #85827b;
  font-size: 13px;
}

.mf-hero-badge {
  position: relative;
  z-index: 1;
  border: 1px solid rgba(212,175,55,.2);
  background: rgba(212,175,55,.055);
  padding: 15px 20px;
  border-radius: 15px;
  text-align: right;
}

.mf-hero-badge span,
.mf-hero-badge strong {
  display: block;
}

.mf-hero-badge span {
  color: #77736a;
  font-size: 8px;
  letter-spacing: 1.5px;
}

.mf-hero-badge strong {
  color: #d7b64d;
  font-size: 12px;
  margin-top: 4px;
}

.mf-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin: 18px 0;
}

.mf-stat {
  padding: 20px;
  min-height: 125px;
  border-radius: 17px;
  background: #0d0d0d;
  border: 1px solid rgba(255,255,255,.06);
  position: relative;
}

.mf-stat-icon {
  color: #bd9a35;
  font-size: 17px;
  margin-bottom: 15px;
}

.mf-stat span {
  display: block;
  color: #77746c;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: .7px;
}

.mf-stat strong {
  display: block;
  color: #eeeae0;
  font-size: 23px;
  margin-top: 4px;
}

.mf-card {
  background: linear-gradient(145deg, #101010, #0b0b0b);
  border: 1px solid rgba(255,255,255,.065);
  border-radius: 20px;
  padding: 25px;
  margin-bottom: 18px;
  box-shadow: 0 18px 60px rgba(0,0,0,.12);
}

.mf-admin-card {
  border-color: rgba(212,175,55,.16);
  background:
    radial-gradient(circle at 100% 0%, rgba(212,175,55,.07), transparent 32%),
    #0e0e0d;
}

.mf-section-title {
  margin-bottom: 22px;
}

.mf-section-title > div > span {
  color: #aa8830;
  font-size: 8px;
  letter-spacing: 1.8px;
  font-weight: 850;
}

.mf-section-title h2 {
  margin: 5px 0 4px;
  font-size: 22px;
  letter-spacing: -.4px;
}

.mf-section-title p {
  color: #74716a;
  font-size: 12px;
  margin: 0;
}

.mf-panel-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.mf-quick {
  min-height: 95px;
  padding: 17px;
  border-radius: 15px;
  background: #0b0b0b;
  border: 1px solid rgba(255,255,255,.06);
  color: #eee;
  display: flex;
  align-items: center;
  gap: 13px;
  text-align: left;
  cursor: pointer;
  transition: .2s;
}

.mf-quick:hover {
  transform: translateY(-2px);
  border-color: rgba(212,175,55,.3);
}

.mf-quick-icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  color: #d5b54d;
  background: rgba(212,175,55,.09);
}

.mf-quick div:nth-child(2) {
  flex: 1;
}

.mf-quick strong,
.mf-quick span {
  display: block;
}

.mf-quick strong {
  font-size: 13px;
}

.mf-quick span {
  color: #77746c;
  font-size: 10px;
  margin-top: 4px;
}

.mf-quick b {
  color: #c09b35;
}

.mf-form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 17px;
}

.mf-field {
  margin-bottom: 15px;
}

.mf-field label,
.mf-label {
  display: block;
  color: #8d8980;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 7px;
}

.mf-field input,
.mf-field select,
.mf-filter {
  width: 100%;
  min-height: 45px;
  border-radius: 11px;
  border: 1px solid rgba(255,255,255,.08);
  background: #090909;
  color: #e8e5dc;
  padding: 0 13px;
  outline: none;
}

.mf-field input:focus,
.mf-field select:focus {
  border-color: rgba(212,175,55,.5);
  box-shadow: 0 0 0 3px rgba(212,175,55,.05);
}

.mf-btn {
  border: 0;
  min-height: 44px;
  padding: 0 18px;
  border-radius: 11px;
  cursor: pointer;
  font-weight: 800;
  font-size: 11px;
  transition: .2s;
}

.mf-btn-gold {
  color: #090909;
  background: linear-gradient(135deg, #f1d26a, #b98d28);
  box-shadow: 0 8px 25px rgba(185,141,40,.13);
}

.mf-btn-gold:hover {
  transform: translateY(-1px);
  filter: brightness(1.05);
}

.mf-btn:disabled {
  opacity: .38;
  cursor: not-allowed;
  transform: none;
}

.mf-btn-outline {
  background: transparent;
  color: #c6a33e;
  border: 1px solid rgba(212,175,55,.25);
}

.mf-btn-outline:hover {
  background: rgba(212,175,55,.07);
}

.mf-error,
.mf-success {
  border-radius: 10px;
  padding: 11px 13px;
  margin-bottom: 15px;
  font-size: 11px;
}

.mf-error {
  color: #e0a5a5;
  background: rgba(150,50,50,.08);
  border: 1px solid rgba(180,70,70,.18);
}

.mf-success {
  color: #d5b952;
  background: rgba(212,175,55,.07);
  border: 1px solid rgba(212,175,55,.17);
}

.mf-toolbar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
}

.mf-filter {
  width: 150px;
}

.mf-action-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.mf-action {
  border: 1px solid rgba(255,255,255,.07);
  border-radius: 17px;
  padding: 19px;
  background: #0a0a0a;
}

.mf-action.large {
  border-color: rgba(212,175,55,.2);
  background:
    radial-gradient(circle at 100% 0%, rgba(212,175,55,.07), transparent 30%),
    #0a0a0a;
}

.mf-action-head {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  align-items: flex-start;
}

.mf-tag {
  color: #b99431;
  font-size: 8px;
  letter-spacing: 1.5px;
  font-weight: 900;
  text-transform: uppercase;
}

.mf-action h3 {
  margin: 5px 0 0;
  font-size: 18px;
}

.mf-action-value {
  color: #d5b54b;
  font-weight: 800;
  font-size: 12px;
  white-space: nowrap;
}

.mf-action-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin: 18px 0;
}

.mf-action-details div {
  padding: 10px;
  background: rgba(255,255,255,.025);
  border-radius: 10px;
}

.mf-action-details span,
.mf-action-details strong {
  display: block;
}

.mf-action-details span {
  color: #69665f;
  font-size: 8px;
  text-transform: uppercase;
}

.mf-action-details strong {
  color: #bdb9ae;
  font-size: 10px;
  margin-top: 4px;
}

.mf-description {
  border-top: 1px solid rgba(255,255,255,.055);
  border-bottom: 1px solid rgba(255,255,255,.055);
  padding: 12px 0;
  margin-bottom: 15px;
}

.mf-description span {
  color: #766f5e;
  font-size: 8px;
  letter-spacing: 1px;
}

.mf-description p {
  color: #9c9990;
  font-size: 11px;
  line-height: 1.6;
  margin: 5px 0 0;
}

.mf-participant-head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 9px;
}

.mf-participant-head strong {
  font-size: 11px;
}

.mf-participant-head span {
  color: #c9a83f;
  font-size: 10px;
}

.mf-member-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  min-height: 28px;
  margin-bottom: 12px;
}

.mf-member-chip {
  padding: 6px 9px;
  border-radius: 8px;
  background: rgba(212,175,55,.08);
  color: #d0b24d;
  font-size: 9px;
  border: 1px solid rgba(212,175,55,.12);
}

.mf-product-box {
  margin: 5px 0 20px;
}

.mf-product-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 9px;
}

.mf-product {
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,.07);
  background: #090909;
  color: #88857d;
  cursor: pointer;
  font-size: 10px;
  font-weight: 700;
  transition: .2s;
}

.mf-product span {
  color: #66635d;
  margin-right: 6px;
}

.mf-product:hover,
.mf-product.selected {
  border-color: rgba(212,175,55,.4);
  color: #dfc45c;
  background: rgba(212,175,55,.07);
}

.mf-product.selected span {
  color: #dfc45c;
}

.mf-wash-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin: 20px 0;
}

.mf-wash-summary div {
  padding: 17px;
  border-radius: 13px;
  background: #090909;
  border: 1px solid rgba(255,255,255,.06);
}

.mf-wash-summary span,
.mf-wash-summary strong,
.mf-wash-summary small {
  display: block;
}

.mf-wash-summary span {
  color: #737067;
  font-size: 8px;
  text-transform: uppercase;
}

.mf-wash-summary strong {
  color: #ddd8ca;
  font-size: 16px;
  margin-top: 6px;
}

.mf-wash-summary small {
  color: #c4a13b;
  font-size: 9px;
  margin-top: 3px;
}

.mf-preview {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 15px;
  border-radius: 14px;
  background: rgba(212,175,55,.035);
  border: 1px solid rgba(212,175,55,.11);
  margin-bottom: 18px;
}

.mf-preview span,
.mf-preview strong {
  display: block;
}

.mf-preview span {
  color: #706d65;
  font-size: 7px;
  letter-spacing: 1px;
}

.mf-preview strong {
  color: #c8c3b8;
  font-size: 10px;
  margin-top: 5px;
}

.mf-select-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 10px 0 20px;
}

.mf-select-card {
  padding: 20px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,.07);
  background: #090909;
  color: #aaa;
  cursor: pointer;
  text-align: left;
  transition: .2s;
}

.mf-select-card:hover,
.mf-select-card.selected {
  border-color: rgba(212,175,55,.42);
  background: rgba(212,175,55,.07);
}

.mf-select-card span,
.mf-select-card strong,
.mf-select-card small {
  display: block;
}

.mf-select-card span {
  color: #c7a13a;
  font-size: 20px;
  margin-bottom: 12px;
}

.mf-select-card strong {
  color: #eee;
  font-size: 13px;
}

.mf-select-card small {
  color: #716e67;
  margin-top: 4px;
  font-size: 9px;
}

.mf-ranking-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.mf-ranking-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.mf-ranking-title span {
  color: #d1ae45;
}

.mf-ranking-title h3 {
  margin: 0;
  font-size: 14px;
}

.mf-ranking-list {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.mf-ranking-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 10px;
  background: rgba(255,255,255,.025);
}

.mf-ranking-item > strong {
  width: 30px;
  color: #c6a33c;
}

.mf-ranking-item div {
  flex: 1;
}

.mf-ranking-item span,
.mf-ranking-item small {
  display: block;
}

.mf-ranking-item span {
  font-size: 11px;
  color: #d5d1c7;
}

.mf-ranking-item small {
  color: #67645e;
  font-size: 8px;
  margin-top: 3px;
}

.mf-ranking-item > b {
  color: #c6a33c;
  font-size: 12px;
}

.mf-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-bottom: 15px;
}

.mf-tabs button {
  padding: 9px 12px;
  border-radius: 9px;
  border: 1px solid rgba(255,255,255,.07);
  background: #0d0d0d;
  color: #77746d;
  cursor: pointer;
  font-size: 9px;
  font-weight: 800;
}

.mf-tabs button:hover,
.mf-tabs button.active {
  color: #d4b44e;
  border-color: rgba(212,175,55,.3);
  background: rgba(212,175,55,.07);
}

.mf-records {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mf-record {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  padding: 16px;
  border-radius: 13px;
  background: #0b0b0b;
  border: 1px solid rgba(255,255,255,.055);
}

.mf-record-type {
  color: #aa8730;
  font-size: 8px;
  letter-spacing: 1.2px;
  font-weight: 850;
}

.mf-record h3 {
  margin: 5px 0 4px;
  font-size: 13px;
}

.mf-record p {
  margin: 0;
  color: #6e6b64;
  font-size: 9px;
}

.mf-record-side {
  text-align: right;
}

.mf-record-side strong,
.mf-record-side span {
  display: block;
}

.mf-record-side strong {
  color: #77746c;
  font-size: 8px;
}

.mf-record-side span {
  color: #c9a73e;
  font-size: 10px;
  margin-top: 5px;
}

.mf-status {
  padding: 4px 7px;
  border-radius: 5px;
  background: rgba(212,175,55,.08);
  color: #c7a640 !important;
}

.mf-empty {
  min-height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #66635d;
  text-align: center;
  border: 1px dashed rgba(255,255,255,.07);
  border-radius: 14px;
}

.mf-empty-icon {
  color: #a2812e;
  font-size: 24px;
  margin-bottom: 8px;
}

.mf-empty strong {
  font-size: 11px;
  font-weight: 600;
}

.mf-loading {
  min-height: 100vh;
  background: #070707;
  color: #d4af37;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.mf-loading strong {
  color: #eee;
  font-size: 17px;
}

.mf-loading span {
  color: #68655e;
  font-size: 10px;
}

@media (max-width: 1100px) {
  .mf-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .mf-action-grid,
  .mf-ranking-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 800px) {
  .mf-sidebar {
    transform: translateX(-100%);
    transition: .25s;
  }

  .mf-sidebar.open {
    transform: translateX(0);
  }

  .mf-main {
    width: 100%;
    margin-left: 0;
  }

  .mf-mobile-menu {
    display: block;
    border: 0;
    background: transparent;
    color: #d3b34c;
    font-size: 21px;
    cursor: pointer;
  }

  .mf-topbar {
    padding: 0 20px;
    gap: 15px;
  }

  .mf-topbar h1 {
    font-size: 17px;
  }

  .mf-content {
    padding: 25px 18px;
  }

  .mf-form-grid,
  .mf-panel-grid,
  .mf-wash-summary,
  .mf-preview {
    grid-template-columns: 1fr;
  }

  .mf-hero {
    padding: 25px;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .mf-hero h2 {
    font-size: 25px;
  }

  .mf-hero-badge {
    text-align: left;
  }
}

@media (max-width: 550px) {
  .mf-stats {
    grid-template-columns: 1fr;
  }

  .mf-card {
    padding: 18px;
  }

  .mf-action-details {
    grid-template-columns: 1fr;
  }

  .mf-select-grid {
    grid-template-columns: 1fr;
  }

  .mf-top-user {
    display: none;
  }

  .mf-record {
    flex-direction: column;
  }

  .mf-record-side {
    text-align: left;
  }
}
`;