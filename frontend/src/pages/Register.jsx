import { Link } from "react-router-dom";

function Register() {
  return (
    <main className="auth-page">
      <div className="auth-background">
        <div className="auth-glow"></div>
      </div>

      <div className="auth-container register-container">
        <Link to="/" className="auth-brand">
          <div className="auth-brand-symbol">
            MF
          </div>

          <div>
            <strong>MORRO DO FÊNIX</strong>
            <span>SISTEMA OFICIAL</span>
          </div>
        </Link>

        <section className="auth-card register-card">
          <div className="auth-heading">
            <span>CADASTRO DE MEMBRO</span>

            <h1>Registrar-se</h1>

            <p>
              Preencha seus dados para enviar seu
              cadastro para análise.
            </p>
          </div>

          <form className="auth-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">
                  Nome completo
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Seu nome completo"
                  autoComplete="name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="memberId">
                  ID do membro
                </label>

                <input
                  id="memberId"
                  name="memberId"
                  type="text"
                  placeholder="Ex: MF-001"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="discordId">
                ID do Discord
              </label>

              <input
                id="discordId"
                name="discordId"
                type="text"
                placeholder="Seu Discord ID"
              />

              <small>
                O ID informado poderá ser confirmado
                posteriormente através da vinculação
                com o Discord.
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="email">
                E-mail
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                autoComplete="email"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">
                  Senha
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Crie uma senha"
                  autoComplete="new-password"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">
                  Confirmar senha
                </label>

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Repita sua senha"
                  autoComplete="new-password"
                />
              </div>
            </div>

            <div className="register-notice">
              <div className="register-notice-icon">
                !
              </div>

              <div>
                <strong>
                  Análise obrigatória
                </strong>

                <p>
                  Após o cadastro, sua conta ficará como
                  <strong>
                    {" "}Pendente de aprovação
                  </strong>
                  . O acesso ao sistema será liberado
                  somente após a aprovação de um gerente.
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="auth-submit"
            >
              <span>Enviar cadastro</span>
              <span>→</span>
            </button>
          </form>

          <div className="auth-register">
            <span>
              Já possui uma conta?
            </span>

            <Link to="/login">
              Entrar no sistema
            </Link>
          </div>
        </section>

        <Link to="/" className="auth-back">
          ← Voltar para o início
        </Link>

        <footer className="auth-footer">
          <span>
            Todos os direitos reservados à
          </span>

          <a
            href="https://rblogs-psi.vercel.app/#portfolio"
            target="_blank"
            rel="noopener noreferrer"
          >
            RB Logs
          </a>
        </footer>
      </div>
    </main>
  );
}

export default Register;