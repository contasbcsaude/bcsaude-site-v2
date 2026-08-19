import { useState } from 'react'

const Diagnostico = () => {
  const [enviado, setEnviado] = useState(false)
  const [formErro, setFormErro] = useState('')

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormErro('')
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    data._subject = 'Novo Diagnóstico Compliance — Site B&C Saúde'
    data._template = 'table'
    data._captcha = 'false'
    try {
      const res = await fetch('https://formsubmit.co/ajax/sac.bcsaude@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setEnviado(true)
      } else {
        setFormErro('Não foi possível enviar. Tente novamente.')
      }
    } catch {
      setFormErro('Não foi possível enviar. Tente novamente.')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        :root{
          --petroleo:#0a2540;
          --petroleo-claro:#2a5278;
          --branco:#ffffff;
          --offwhite:#f5f7fa;
          --accent:#2a6a8e;
          --accent-claro:#3d8ab5;
          --cinza:#5b6b7a;
          --borda:#dfe6ec;
          --shadow-lg:0 12px 40px rgba(10,37,64,.14);
          --radius:14px;
        }
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:'Inter',system-ui,-apple-system,sans-serif;color:#0d0d0d;background:#fff;line-height:1.6}
        .diag-top{background:var(--petroleo);padding:56px 24px 40px;text-align:center}
        .diag-top h1{color:#fff;font-size:1.8rem;font-weight:800;margin-bottom:8px}
        .diag-top p{color:#c3d2e0;max-width:640px;margin:0 auto;font-size:1rem}
        .diag-main{max-width:820px;margin:0 auto;padding:32px 24px 64px}
        .diag-box{background:#fff;border-radius:20px;box-shadow:var(--shadow-lg);padding:36px}
        .diag-box h2{color:var(--petroleo);font-size:1.15rem;margin-bottom:6px}
        .diag-box .diag-sub{color:var(--cinza);font-size:.95rem;margin-bottom:24px}
        .diag-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
        .diag-field{display:flex;flex-direction:column;gap:6px}
        .diag-field.full{grid-column:1/-1}
        .diag-field label{font-size:.85rem;font-weight:600;color:var(--petroleo)}
        .diag-field input,.diag-field select{padding:12px 16px;border:1.5px solid var(--borda);border-radius:10px;font-size:.95rem;font-family:inherit;background:#fff;transition:all .2s}
        .diag-field input:focus,.diag-field select:focus{outline:none;border-color:var(--accent)}
        .diag-section-title{grid-column:1/-1;font-size:.85rem;font-weight:700;color:var(--accent);text-transform:uppercase;letter-spacing:.08em;margin-top:12px;padding-top:16px;border-top:1px solid var(--borda)}
        .diag-submit{margin-top:24px;width:100%;background:var(--accent);color:#fff;padding:14px 28px;border:none;border-radius:999px;font-weight:600;font-size:.95rem;cursor:pointer;transition:all .25s;font-family:inherit}
        .diag-submit:hover{background:var(--accent-claro)}
        .diag-note{text-align:center;margin-top:12px;font-size:.8rem;color:var(--cinza)}
        .diag-ok{text-align:center;padding:40px 20px}
        .diag-ok h3{color:#15803d;font-size:1.3rem;margin-bottom:12px}
        .diag-ok p{color:var(--cinza);max-width:520px;margin:0 auto 20px}
        .btn-wa{display:inline-block;background:#25d366;color:#fff;text-decoration:none;padding:14px 28px;border-radius:999px;font-weight:600}
        .diag-back{display:inline-block;margin-top:20px;color:var(--petroleo);text-decoration:none;font-size:.9rem;font-weight:600}
        .form-erro{background:#fef2f2;border:1px solid #fecaca;color:#b91c1c;padding:10px 16px;border-radius:10px;font-size:.9rem;font-weight:600;margin-bottom:16px}
        @media(max-width:720px){.diag-grid{grid-template-columns:1fr}.diag-box{padding:24px}}
      `}</style>

      <div className="diag-top">
        <h1>Diagnóstico gratuito — Compliance Trabalhista (CLT 2026)</h1>
        <p>Leva menos de 3 minutos. Nossa equipe analisa e envia o resultado para o seu e-mail.</p>
      </div>

      <div className="diag-main">
        {enviado ? (
          <div className="diag-box diag-ok">
            <h3>✅ Diagnóstico recebido!</h3>
            <p>
              Obrigado por responder. Nossa equipe vai analisar o resultado e entrar em contato em
              até 2 dias úteis com um relatório personalizado.
            </p>
            <a href="https://wa.me/5567981131076" className="btn-wa">
              Falar com a B&C pelo WhatsApp
            </a>
            <br />
            <a href="/" className="diag-back">
              ← Voltar para o site
            </a>
          </div>
        ) : (
          <form className="diag-box" onSubmit={submit}>
            {formErro && <div className="form-erro">{formErro}</div>}
            <h2>Diagnóstico de Compliance Trabalhista — Novas Regras CLT 2026</h2>
            <p className="diag-sub">
              Avalie a maturidade de compliance trabalhista e SST da sua empresa.
            </p>

            <div className="diag-grid">
              <div className="diag-section-title">Dados da empresa</div>
              <div className="diag-field">
                <label>Empresa *</label>
                <input type="text" name="razao_social" required />
              </div>
              <div className="diag-field">
                <label>CNPJ</label>
                <input type="text" name="cnpj" />
              </div>
              <div className="diag-field">
                <label>Cidade/UF</label>
                <input type="text" name="cidade_uf" />
              </div>
              <div className="diag-field">
                <label>Quantos colaboradores ativos?</label>
                <select name="colaboradores" required>
                  <option value="">Selecione…</option>
                  <option value="1_10">1 a 10</option>
                  <option value="11_20">11 a 20</option>
                  <option value="21_30">21 a 30</option>
                  <option value="31_50">31 a 50</option>
                  <option value="51_100">51 a 100</option>
                  <option value="101_200">101 a 200</option>
                  <option value="201_500">201 a 500</option>
                  <option value="501_1000">501 a 1.000</option>
                  <option value="acima_1000">Acima de 1.000</option>
                </select>
              </div>

              <div className="diag-section-title">Quem está respondendo</div>
              <div className="diag-field">
                <label>Nome *</label>
                <input type="text" name="nome" required />
              </div>
              <div className="diag-field">
                <label>Telefone/WhatsApp *</label>
                <input type="tel" name="telefone" placeholder="(67) 9 0000-0000" required />
              </div>
              <div className="diag-field full">
                <label>E-mail *</label>
                <input type="email" name="email" required />
              </div>

              <div className="diag-section-title">
                Sobre: Compliance Trabalhista — Novas Regras CLT 2026
              </div>
              <div className="diag-field full">
                <label>1. PGR e PCMSO estão atualizados e auditáveis? *</label>
                <select name="pgr_pcmso_atualizados" required>
                  <option value="">Selecione…</option>
                  <option>Sim</option>
                  <option>Não</option>
                  <option>Parcialmente</option>
                  <option>Não sei</option>
                </select>
              </div>
              <div className="diag-field full">
                <label>2. Possui LTCAT (Laudo Técnico das Condições Ambientais)? *</label>
                <select name="ltcat_possui" required>
                  <option value="">Selecione…</option>
                  <option>Sim</option>
                  <option>Não</option>
                  <option>Em elaboração</option>
                  <option>Não sei</option>
                </select>
              </div>
              <div className="diag-field full">
                <label>3. As políticas de SST estão documentadas e acessíveis? *</label>
                <select name="politicas_documentadas" required>
                  <option value="">Selecione…</option>
                  <option>Sim</option>
                  <option>Parcialmente</option>
                  <option>Não</option>
                  <option>Não sei</option>
                </select>
              </div>
              <div className="diag-field full">
                <label>4. Os treinamentos obrigatórios (NR-1, NR-9, etc.) estão em dia? *</label>
                <select name="treinamentos_em_dia" required>
                  <option value="">Selecione…</option>
                  <option>Sim</option>
                  <option>Parcialmente</option>
                  <option>Não</option>
                  <option>Não sei</option>
                </select>
              </div>
              <div className="diag-field full">
                <label>5. Há auditoria interna periódica de compliance de SST? *</label>
                <select name="auditoria_interna" required>
                  <option value="">Selecione…</option>
                  <option>Sim</option>
                  <option>Não</option>
                  <option>Em implantação</option>
                  <option>Não sei</option>
                </select>
              </div>
              <div className="diag-field full">
                <label>6. A documentação está pronta para fiscalização? *</label>
                <select name="documentacao_orgao_publico" required>
                  <option value="">Selecione…</option>
                  <option>Sim</option>
                  <option>Parcialmente</option>
                  <option>Não</option>
                  <option>Não sei</option>
                </select>
              </div>
            </div>

            <button type="submit" className="diag-submit">
              Receber meu diagnóstico gratuito
            </button>
            <p className="diag-note">
              Seus dados são seguros e usados apenas para personalizar nosso atendimento.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

export default Diagnostico
