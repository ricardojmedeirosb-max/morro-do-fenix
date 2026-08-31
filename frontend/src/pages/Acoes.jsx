import { useEffect, useState } from "react";
import { ACOES, formatarDinheiro } from "../data/acoes";

function Acoes({ usuario }) {
  const [acoes, setAcoes] = useState([]);
  const [mostrarCriar, setMostrarCriar] = useState(false);

  const [nomeLider, setNomeLider] = useState("");
  const [acaoSelecionada, setAcaoSelecionada] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");

  const podeGerenciar =
    usuario?.cargo === "GERENTE" ||
    usuario?.cargo === "LIDER";

  useEffect(() => {
    const salvas = JSON.parse(
      localStorage.getItem("morro_fenix_acoes") || "[]"
    );

    setAcoes(salvas);
  }, []);

  function salvarAcoes(lista) {
    setAcoes(lista);

    localStorage.setItem(
      "morro_fenix_acoes",
      JSON.stringify(lista)
    );
  }

  function criarAcao(event) {
    event.preventDefault();

    const configuracao = ACOES.find(
      (item) => item.id === acaoSelecionada
    );

    if (!configuracao) return;

    const novaAcao = {
      id: crypto.randomUUID(),

      tipoId: configuracao.id,
      nome: configuracao.nome,
      categoria: configuracao.categoria,

      lider: nomeLider,

      data,
      hora,

      local: configuracao.local,

      membrosMin: configuracao.membrosMin,
      membrosMax: configuracao.membrosMax,

      armamento: configuracao.armamento,

      valor: configuracao.valor,

      itens: configuracao.itens,

      observacao: configuracao.observacao || "",

      participantes: [],
    };

    salvarAcoes([...acoes, novaAcao]);

    setNomeLider("");
    setAcaoSelecionada("");
    setData("");
    setHora("");

    setMostrarCriar(false);
  }

  function participar(acaoId) {
    const nome =
      usuario?.nome ||
      usuario?.nome_completo ||
      "Membro";

    const idUsuario =
      usuario?.id || usuario?.email;

    const novasAcoes = acoes.map((acao) => {
      if (acao.id !== acaoId) {
        return acao;
      }

      const jaParticipa =
        acao.participantes?.some(
          (membro) =>
            membro.id === idUsuario
        );

      if (jaParticipa) {
        return acao;
      }

      if (
        acao.participantes.length >=
        acao.membrosMax
      ) {
        return acao;
      }

      return {
        ...acao,

        participantes: [
          ...(acao.participantes || []),

          {
            id: idUsuario,
            nome,
          },
        ],
      };
    });

    salvarAcoes(novasAcoes);
  }

  function sairDaAcao(acaoId) {
    const idUsuario =
      usuario?.id || usuario?.email;

    const novasAcoes = acoes.map((acao) => {
      if (acao.id !== acaoId) {
        return acao;
      }

      return {
        ...acao,

        participantes:
          acao.participantes.filter(
            (membro) =>
              membro.id !== idUsuario
          ),
      };
    });

    salvarAcoes(novasAcoes);
  }

  function excluirAcao(acaoId) {
    if (
      !window.confirm(
        "Deseja realmente excluir esta ação?"
      )
    ) {
      return;
    }

    salvarAcoes(
      acoes.filter(
        (acao) => acao.id !== acaoId
      )
    );
  }

  function participa(acao) {
    const idUsuario =
      usuario?.id || usuario?.email;

    return acao.participantes?.some(
      (membro) =>
        membro.id === idUsuario
    );
  }

  return (
    <section className="acoes-page">

      <div className="painel-topo">

        <div>
          <span className="painel-label">
            OPERAÇÕES
          </span>

          <h2>Ações</h2>

          <p>
            Gerenciamento das ações disponíveis
            para os membros da FAC.
          </p>
        </div>

        {podeGerenciar && (
          <button
            className="gold-button"
            onClick={() =>
              setMostrarCriar(
                !mostrarCriar
              )
            }
          >
            + Registrar ação
          </button>
        )}

      </div>

      {mostrarCriar && podeGerenciar && (
        <div className="painel-card criar-acao">

          <div className="card-title">
            <span>REGISTRAR</span>
            <h3>Nova ação</h3>
          </div>

          <form onSubmit={criarAcao}>

            <div className="form-grid">

              <div className="form-group">
                <label>
                  Líder da ação
                </label>

                <input
                  value={nomeLider}
                  onChange={(e) =>
                    setNomeLider(
                      e.target.value
                    )
                  }
                  placeholder="Nome do líder"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  Ação
                </label>

                <select
                  value={acaoSelecionada}
                  onChange={(e) =>
                    setAcaoSelecionada(
                      e.target.value
                    )
                  }
                  required
                >
                  <option value="">
                    Selecione uma ação
                  </option>

                  <optgroup label="Ações pequenas">
                    {ACOES
                      .filter(
                        (acao) =>
                          acao.categoria ===
                          "Pequena"
                      )
                      .map((acao) => (
                        <option
                          key={acao.id}
                          value={acao.id}
                        >
                          {acao.nome}
                        </option>
                      ))}
                  </optgroup>

                  <optgroup label="Ações grandes">
                    {ACOES
                      .filter(
                        (acao) =>
                          acao.categoria ===
                          "Grande"
                      )
                      .map((acao) => (
                        <option
                          key={acao.id}
                          value={acao.id}
                        >
                          {acao.nome}
                        </option>
                      ))}
                  </optgroup>

                </select>
              </div>

              <div className="form-group">
                <label>
                  Data
                </label>

                <input
                  type="date"
                  value={data}
                  onChange={(e) =>
                    setData(e.target.value)
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  Hora
                </label>

                <input
                  type="time"
                  value={hora}
                  onChange={(e) =>
                    setHora(e.target.value)
                  }
                  required
                />
              </div>

            </div>

            {acaoSelecionada && (
              <InfoAcao
                acao={ACOES.find(
                  (item) =>
                    item.id ===
                    acaoSelecionada
                )}
              />
            )}

            <button
              className="gold-button"
              type="submit"
            >
              Registrar ação
            </button>

          </form>
        </div>
      )}

      <div className="acoes-lista">

        {acoes.length === 0 ? (
          <div className="empty-module">
            <strong>
              Nenhuma ação registrada
            </strong>

            <span>
              As ações registradas pela liderança
              aparecerão aqui.
            </span>
          </div>
        ) : (
          acoes.map((acao) => {

            const quantidade =
              acao.participantes?.length || 0;

            const lotada =
              quantidade >=
              acao.membrosMax;

            const estouParticipando =
              participa(acao);

            return (
              <article
                className="acao-card"
                key={acao.id}
              >

                <div className="acao-card-header">

                  <div>
                    <span className="acao-categoria">
                      {acao.categoria}
                    </span>

                    <h3>
                      {acao.nome}
                    </h3>
                  </div>

                  <div className="acao-horario">
                    <strong>
                      {acao.data
                        ? acao.data
                            .split("-")
                            .reverse()
                            .join("/")
                        : "--/--/----"}
                    </strong>

                    <span>
                      {acao.hora}
                    </span>
                  </div>

                </div>

                <div className="acao-info-grid">

                  <div>
                    <span>LÍDER</span>
                    <strong>
                      {acao.lider}
                    </strong>
                  </div>

                  <div>
                    <span>LOCAL</span>
                    <strong>
                      {acao.local}
                    </strong>
                  </div>

                  <div>
                    <span>ARMAMENTO</span>
                    <strong>
                      {acao.armamento}
                    </strong>
                  </div>

                  <div>
                    <span>VALOR</span>
                    <strong>
                      {formatarDinheiro(
                        acao.valor
                      )}
                    </strong>
                  </div>

                </div>

                <div className="acao-vagas">

                  <div>
                    <span>
                      PARTICIPANTES
                    </span>

                    <strong>
                      {quantidade} /{" "}
                      {acao.membrosMax}
                    </strong>
                  </div>

                  <div className="barra-vagas">
                    <div
                      style={{
                        width: `${Math.min(
                          100,
                          (quantidade /
                            acao.membrosMax) *
                            100
                        )}%`,
                      }}
                    />
                  </div>

                </div>

                <div className="acao-regras">

                  <div>
                    <span>
                      Mínimo
                    </span>

                    <strong>
                      {acao.membrosMin}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Máximo
                    </span>

                    <strong>
                      {acao.membrosMax}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Itens
                    </span>

                    <strong>
                      {acao.itens.join(", ")}
                    </strong>
                  </div>

                </div>

                {acao.observacao && (
                  <div className="acao-observacao">
                    <strong>
                      Observação
                    </strong>

                    <span>
                      {acao.observacao}
                    </span>
                  </div>
                )}

                <div className="participantes">

                  <span>
                    PARTICIPANTES
                  </span>

                  {quantidade === 0 ? (
                    <p>
                      Nenhum membro entrou
                      ainda.
                    </p>
                  ) : (
                    <div className="participantes-lista">
                      {acao.participantes.map(
                        (membro) => (
                          <div
                            key={membro.id}
                            className="participante"
                          >
                            {membro.nome}
                          </div>
                        )
                      )}
                    </div>
                  )}

                </div>

                <div className="acao-acoes">

                  {estouParticipando ? (
                    <button
                      className="danger-button"
                      onClick={() =>
                        sairDaAcao(
                          acao.id
                        )
                      }
                    >
                      Sair da ação
                    </button>
                  ) : (
                    <button
                      className="gold-button"
                      disabled={lotada}
                      onClick={() =>
                        participar(
                          acao.id
                        )
                      }
                    >
                      {lotada
                        ? "Ação lotada"
                        : "Participar"}
                    </button>
                  )}

                  {podeGerenciar && (
                    <button
                      className="delete-button"
                      onClick={() =>
                        excluirAcao(
                          acao.id
                        )
                      }
                    >
                      Excluir
                    </button>
                  )}

                </div>

              </article>
            );
          })
        )}

      </div>

    </section>
  );
}

function InfoAcao({ acao }) {
  if (!acao) return null;

  return (
    <div className="acao-preview">

      <div>
        <span>
          PARTICIPANTES
        </span>

        <strong>
          {acao.membrosMin} —{" "}
          {acao.membrosMax}
        </strong>
      </div>

      <div>
        <span>
          ARMAMENTO
        </span>

        <strong>
          {acao.armamento}
        </strong>
      </div>

      <div>
        <span>
          LOCAL
        </span>

        <strong>
          {acao.local}
        </strong>
      </div>

      <div>
        <span>
          VALOR
        </span>

        <strong>
          {formatarDinheiro(
            acao.valor
          )}
        </strong>
      </div>

      <div>
        <span>
          ITENS
        </span>

        <strong>
          {acao.itens.join(", ")}
        </strong>
      </div>

    </div>
  );
}

export default Acoes;