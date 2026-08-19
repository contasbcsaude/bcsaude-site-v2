import { useEffect, useState, useRef } from 'react'

const LOGO_FOOTER = 'https://i.imgur.com/0njUm4v.png'

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [floatOpen, setFloatOpen] = useState(false)
  const revealRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const kill = () => {
      document.querySelectorAll('#skip-badge, [id*="skip-badge"]').forEach((el) => el.remove())
    }
    kill()
    const mo = new MutationObserver(kill)
    mo.observe(document.body, { childList: true, subtree: true })
    const iv = setInterval(kill, 2000)
    return () => {
      mo.disconnect()
      clearInterval(iv)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const enviarWhatsApp = () => {
    const form = document.getElementById('form-contato') as HTMLFormElement | null
    const dados = form ? Object.fromEntries(new FormData(form).entries()) : {}
    const nome = (dados.name as string) || ''
    const empresa = (dados.company as string) || ''
    const email = (dados.email as string) || ''
    const telefone = (dados.phone as string) || ''
    const msg = (dados.message as string) || ''
    let texto = 'Olá! Vim pelo site da B&C Saúde.\n'
    if (nome) texto += `Nome: ${nome}\n`
    if (empresa) texto += `Empresa: ${empresa}\n`
    if (telefone) texto += `Telefone: ${telefone}\n`
    if (email) texto += `E-mail: ${email}\n`
    if (msg) {
      texto += msg.includes('\n') || msg.length > 60 ? `Mensagem:\n${msg}` : `Mensagem: ${msg}`
    } else {
      texto += 'Gostaria de falar com a B&C.'
    }
    window.open(`https://wa.me/5567981131076?text=${encodeURIComponent(texto)}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        :root{
          --petroleo:#0a2540;
          --petroleo-medio:#1b3a5c;
          --petroleo-claro:#2a5278;
          --preto:#0d0d0d;
          --branco:#ffffff;
          --offwhite:#f5f7fa;
          --accent:#2a6a8e;
          --accent-claro:#3d8ab5;
          --cinza:#5b6b7a;
          --cinza-claro:#e8edf2;
          --borda:#dfe6ec;
          --shadow:0 6px 24px rgba(10,37,64,.08);
          --shadow-lg:0 12px 40px rgba(10,37,64,.14);
          --radius:14px;
          --transition:all .25s ease;
        }
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        body{font-family:'Inter',system-ui,-apple-system,sans-serif;color:var(--preto);background:var(--branco);line-height:1.6}
        .bc-container{max-width:1200px;margin:0 auto;padding:0 24px}
        .bc-section{padding:88px 0}
        .section-light{background:var(--offwhite)}
        .section-light-soft{background:#fafbfd}
        .section-dark{background:var(--petroleo);color:#fff}
        .section-head{margin-bottom:48px}
        .section-head.center{text-align:center}
        .section-eyebrow{display:inline-block;font-size:.8rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);margin-bottom:12px}
        .section-title{font-size:2.3rem;font-weight:800;line-height:1.2;color:var(--petroleo);margin-bottom:12px}
        .section-dark .section-title{color:#fff}
        .section-sub{font-size:1.1rem;color:var(--cinza);max-width:680px}
        .section-head.center .section-sub{margin:0 auto}
        .reveal{opacity:0;transform:translateY(24px);transition:opacity .7s ease,transform .7s ease}
        .reveal.revealed{opacity:1;transform:none}

        /* ===== HEADER ===== */
        .bc-header{position:fixed;top:0;left:0;right:0;z-index:1000;background:rgba(10,37,64,.92);backdrop-filter:blur(10px);transition:var(--transition)}
        .bc-header.scrolled{box-shadow:0 4px 20px rgba(0,0,0,.25)}
        .bc-nav{display:flex;align-items:center;justify-content:space-between;height:72px}
        .logo-wrap{display:flex;align-items:center;gap:12px}
        .logo-img{height:56px;width:auto;background:transparent;padding:0;border-radius:0;box-shadow:none;transition:var(--transition)}
        .logo-img:hover{transform:scale(1.03);box-shadow:0 4px 20px rgba(0,0,0,.3)}
        .logo-text-fallback{display:flex;align-items:center;gap:8px;background:var(--branco);padding:8px 16px;border-radius:14px;box-shadow:0 2px 12px rgba(0,0,0,.2);font-weight:800;font-size:1.3rem;color:var(--petroleo)}
        .logo-text-fallback span:last-child{color:var(--accent);font-weight:600;font-size:1rem}
        .nav-links{display:flex;align-items:center;gap:28px;list-style:none}
        .nav-links a{color:#d7e3ee;text-decoration:none;font-size:.92rem;font-weight:500;transition:var(--transition)}
        .nav-links a:hover{color:#fff}
        .nav-cta{background:var(--accent);color:#fff !important;padding:10px 20px;border-radius:999px;font-weight:600}
        .nav-cta:hover{background:var(--accent-claro)}
        .menu-toggle{display:none;background:none;border:none;color:#fff;font-size:1.6rem;cursor:pointer}
        .nav-links.open{display:flex;flex-direction:column;position:absolute;top:72px;left:0;right:0;background:var(--petroleo);padding:20px 24px;gap:16px;box-shadow:0 12px 30px rgba(0,0,0,.3)}
        @media(max-width:900px){.nav-links{display:none}.menu-toggle{display:block}}

        /* ===== HERO ===== */
        .hero{position:relative;padding:180px 0 120px;background:var(--petroleo);overflow:hidden}
        .hero::before{content:'';position:absolute;inset:0;background:
          radial-gradient(ellipse 60% 50% at 20% 10%,rgba(42,106,142,.35),transparent),
          radial-gradient(ellipse 50% 40% at 85% 85%,rgba(42,106,142,.2),transparent)}
        .hero-grid{position:relative;display:grid;grid-template-columns:1.15fr .85fr;gap:56px;align-items:center}
        .hero-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);color:#d7e3ee;padding:8px 16px;border-radius:999px;font-size:.8rem;font-weight:600;letter-spacing:.05em;text-transform:uppercase;margin-bottom:24px}
        .hero h1{font-size:3.1rem;font-weight:800;line-height:1.15;color:#fff;margin-bottom:20px}
        .hero h1 em{font-style:normal;color:var(--accent-claro)}
        .hero p{font-size:1.15rem;color:#c3d2e0;max-width:560px;margin-bottom:32px}
        .hero-actions{display:flex;flex-wrap:wrap;gap:14px;margin-bottom:40px}
        .btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:14px 28px;border-radius:999px;font-weight:600;font-size:.95rem;text-decoration:none;transition:var(--transition);cursor:pointer;border:none}
        .btn-primary{background:var(--accent);color:#fff;box-shadow:0 8px 24px rgba(42,106,142,.35)}
        .btn-primary:hover{background:var(--accent-claro);transform:translateY(-2px)}
        .btn-outline{background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,.4)}
        .btn-outline:hover{border-color:#fff;background:rgba(255,255,255,.08)}
        .btn-light{background:#fff;color:var(--petroleo);box-shadow:0 8px 24px rgba(0,0,0,.12)}
        .btn-light:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(0,0,0,.18)}
        .hero-meta{display:flex;gap:28px;flex-wrap:wrap}
        .hero-meta-item{display:flex;align-items:center;gap:10px;color:#a9bdce;font-size:.88rem}
        .hero-meta-item svg{color:var(--accent-claro)}
        .hero-visual{position:relative}
        .hero-card{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);border-radius:20px;padding:28px;backdrop-filter:blur(8px)}
        .hero-card h3{color:#fff;font-size:1.05rem;margin-bottom:16px;display:flex;align-items:center;gap:8px}
        .hero-card-list{list-style:none;display:flex;flex-direction:column;gap:12px}
        .hero-card-list li{display:flex;align-items:flex-start;gap:10px;color:#c3d2e0;font-size:.92rem}
        .hero-card-list svg{flex-shrink:0;color:var(--accent-claro);margin-top:3px}
        @media(max-width:960px){.hero{padding:140px 0 80px}.hero-grid{grid-template-columns:1fr;gap:40px}.hero h1{font-size:2.2rem}}

        /* ===== SOBRE ===== */
        .sobre-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:56px;align-items:center}
        .sobre-text p{color:var(--cinza);margin-bottom:16px;font-size:1.02rem}
        .sobre-quote{border-left:4px solid var(--accent);padding:12px 20px;margin:24px 0;background:rgba(42,106,142,.06);border-radius:0 12px 12px 0;font-style:italic;color:var(--petroleo);font-weight:600}
        .sobre-stats{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:28px}
        .stat-card{background:#fff;border:1px solid var(--borda);border-radius:var(--radius);padding:20px;text-align:center;box-shadow:var(--shadow)}
        .stat-num{font-size:2rem;font-weight:800;color:var(--petroleo)}
        .stat-label{font-size:.82rem;color:var(--cinza);font-weight:600;text-transform:uppercase;letter-spacing:.06em;margin-top:4px}
        .sobre-box{border-radius:20px;overflow:hidden;box-shadow:var(--shadow-lg);background:var(--petroleo)}
        .sobre-box-img{width:100%;height:260px;object-fit:cover;display:block}
        .sobre-box-caption{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(10,37,64,.85));color:#fff;padding:40px 20px 14px;font-size:.85rem}
        .sobre-box{position:relative}
        @media(max-width:960px){.sobre-grid{grid-template-columns:1fr;gap:40px}}

        /* ===== CONFIANCA ===== */
        .conf-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
        .conf-card{background:#fff;border:1px solid var(--borda);border-radius:var(--radius);padding:28px;text-align:center;box-shadow:var(--shadow);transition:var(--transition)}
        .conf-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg)}
        .conf-icon{width:56px;height:56px;margin:0 auto 16px;border-radius:14px;background:rgba(42,106,142,.1);display:flex;align-items:center;justify-content:center;color:var(--accent)}
        .conf-card h3{font-size:1.05rem;color:var(--petroleo);margin-bottom:8px}
        .conf-card p{font-size:.9rem;color:var(--cinza)}
        @media(max-width:960px){.conf-grid{grid-template-columns:1fr;gap:16px}}

        /* ===== SERVICOS ===== */
        .services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
        .service-card{background:#fff;border:1px solid var(--borda);border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow);transition:var(--transition);display:flex;flex-direction:column}
        .service-card:hover{transform:translateY(-6px);box-shadow:var(--shadow-lg)}
        .service-img{width:100%;height:180px;object-fit:cover;display:block}
        .service-body{padding:24px}
        .service-body h3{font-size:1.15rem;color:var(--petroleo);margin-bottom:8px}
        .service-body p{font-size:.92rem;color:var(--cinza);margin-bottom:12px}
        .service-list{list-style:none;display:flex;flex-direction:column;gap:8px;margin-bottom:16px}
        .service-list li{display:flex;align-items:flex-start;gap:8px;font-size:.88rem;color:var(--petroleo-medio)}
        .service-list svg{flex-shrink:0;color:var(--accent);margin-top:2px}
        .service-link{color:var(--accent);font-weight:600;font-size:.9rem;text-decoration:none}
        .service-link:hover{color:var(--accent-claro)}
        @media(max-width:960px){.services-grid{grid-template-columns:1fr;gap:16px}}

        /* ===== GESTAO ===== */
        .gestao-box{background:var(--petroleo);border-radius:24px;padding:56px;color:#fff;position:relative;overflow:hidden}
        .gestao-box::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 85% 20%,rgba(42,106,142,.4),transparent)}
        .gestao-grid{position:relative;display:grid;grid-template-columns:1.1fr .9fr;gap:48px;align-items:center}
        .gestao-box h2{font-size:2rem;font-weight:800;margin-bottom:16px}
        .gestao-box h2 em{font-style:normal;color:var(--accent-claro)}
        .gestao-box p{color:#c3d2e0;margin-bottom:24px;max-width:480px}
        .gestao-list{list-style:none;display:flex;flex-direction:column;gap:12px}
        .gestao-list li{display:flex;align-items:flex-start;gap:10px;color:#d7e3ee;font-size:.95rem}
        .gestao-list svg{flex-shrink:0;color:var(--accent-claro);margin-top:3px}
        @media(max-width:960px){.gestao-grid{grid-template-columns:1fr;gap:32px}.gestao-box{padding:36px 24px}}

        /* ===== CTA ===== */
        .cta-box{background:var(--petroleo);border-radius:24px;padding:56px;text-align:center;color:#fff;position:relative;overflow:hidden}
        .cta-box::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 0%,rgba(42,106,142,.35),transparent)}
        .cta-box h2{position:relative;font-size:2.2rem;font-weight:800;margin-bottom:16px}
        .cta-box p{position:relative;color:#c3d2e0;max-width:640px;margin:0 auto 32px;font-size:1.05rem}
        .cta-actions{position:relative;display:flex;justify-content:center;gap:14px;flex-wrap:wrap}
        @media(max-width:960px){.cta-box{padding:36px 24px}.cta-box h2{font-size:1.7rem}}

        /* ===== UNIDADES ===== */
        .units-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
        .unit-card{background:#fff;border:1px solid var(--borda);border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow);transition:var(--transition)}
        .unit-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg)}
        .unit-img{width:100%;height:160px;object-fit:cover;display:block}
        .unit-body{padding:20px}
        .unit-body h4{color:var(--petroleo);font-size:1.05rem;margin-bottom:6px}
        .unit-body p{color:var(--cinza);font-size:.88rem}
        @media(max-width:960px){.units-grid{grid-template-columns:1fr;gap:16px}}

        /* ===== CONTATO ===== */
        .contact-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:56px;align-items:start}
        .contact-info h3{font-size:1.5rem;color:#fff;margin-bottom:12px}
        .contact-info>p{color:#c3d2e0;margin-bottom:28px}
        .contact-item{display:flex;align-items:flex-start;gap:14px;margin-bottom:20px}
        .contact-icon{width:44px;height:44px;border-radius:12px;background:rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;color:var(--accent-claro);flex-shrink:0}
        .contact-item h4{color:#fff;font-size:.9rem;margin-bottom:2px}
        .contact-item a{color:#c3d2e0;text-decoration:none;font-size:.92rem}
        .contact-item a:hover{color:#fff}
        .contact-form{background:#fff;border-radius:20px;padding:32px;box-shadow:var(--shadow-lg)}
        .contact-form h3{color:var(--petroleo);font-size:1.3rem;margin-bottom:20px}
        .form-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
        .form-field{display:flex;flex-direction:column;gap:6px}
        .form-field.full{grid-column:1/-1}
        .form-field label{font-size:.82rem;font-weight:600;color:var(--petroleo-medio)}
        .form-field input,.form-field textarea{border:1px solid var(--borda);border-radius:10px;padding:12px 14px;font-size:.95rem;font-family:inherit;color:#0d0d0d;background:#fff;transition:var(--transition)}
        .form-field input:focus,.form-field textarea:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px rgba(42,106,142,.15)}
        .form-field textarea{min-height:110px;resize:vertical}
        .btn-row{display:flex;gap:12px;flex-wrap:wrap;margin-top:20px}
        .btn-whatsapp{background:#25d366;color:#fff}
        .btn-whatsapp:hover{background:#1ebe5b;transform:translateY(-2px)}
        @media(max-width:960px){.contact-grid{grid-template-columns:1fr;gap:40px}.form-grid{grid-template-columns:1fr}}

        /* ===== FOOTER ===== */
        .bc-footer{background:#071a2e;color:#a9bdce;padding:56px 0 0}
        .footer-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:48px;padding-bottom:40px}
        .footer-brand img{height:48px;width:auto;margin-bottom:16px}
        .footer-brand p{font-size:.9rem;max-width:320px}
        .footer-col h4{color:#fff;font-size:.95rem;margin-bottom:16px;letter-spacing:.04em;text-transform:uppercase}
        .footer-col a{display:block;color:#a9bdce;text-decoration:none;font-size:.9rem;margin-bottom:10px}
        .footer-col a:hover{color:#fff}
        .footer-bottom{border-top:1px solid rgba(255,255,255,.08);padding:20px 0;text-align:center;font-size:.82rem;color:#6d8296}
        @media(max-width:960px){.footer-grid{grid-template-columns:1fr;gap:32px}}

        /* ===== FLOAT WHATSAPP ===== */
        .float-main{position:fixed;bottom:24px;right:24px;z-index:9999;width:60px;height:60px;border-radius:50%;background:#25d366;color:#fff;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 24px rgba(37,211,102,.45);transition:transform .25s ease,box-shadow .25s ease}
        .float-main:hover{transform:scale(1.08);box-shadow:0 12px 30px rgba(37,211,102,.55)}
        .float-menu{position:fixed;bottom:96px;right:24px;z-index:9999;background:#fff;border-radius:16px;box-shadow:var(--shadow-lg);overflow:hidden;min-width:220px;animation:fadeUp .25s ease}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
        .float-menu a{display:flex;align-items:center;gap:12px;padding:14px 18px;color:var(--petroleo);text-decoration:none;font-size:.92rem;font-weight:600;border-bottom:1px solid var(--borda);transition:background .2s}
        .float-menu a:last-child{border-bottom:none}
        .float-menu a:hover{background:var(--offwhite)}
        .float-menu svg{color:var(--accent)}
      `}</style>

      <header className={`bc-header${scrolled ? ' scrolled' : ''}`}>
        <div className="bc-container bc-nav">
          <a href="#hero" className="logo-wrap">
            <img src="https://i.imgur.com/0njUm4v.png" alt="B&C Saúde" className="logo-img" />
          </a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            ☰
          </button>
          <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
            <li>
              <a href="#diferencial">Diferencial</a>
            </li>
            <li>
              <a href="#sobre">Sobre</a>
            </li>
            <li>
              <a href="#servicos">Serviços</a>
            </li>
            <li>
              <a href="#gestao">Gestão</a>
            </li>
            <li>
              <a href="#unidades">Unidades</a>
            </li>
            <li>
              <a href="/diagnostico" className="nav-cta">
                Fazer Diagnóstico
              </a>
            </li>
          </ul>
        </div>
      </header>

      <section className="hero" id="hero">
        <div className="bc-container hero-grid">
          <div className="hero-content reveal">
            <div className="hero-badge">15 anos no apoio às empresas</div>
            <h1>
              Medicina do Trabalho com <em>inteligência pericial</em> para decisões melhores
            </h1>
            <p>
              Na B&C, segurança e medicina do trabalho ganham inteligência pericial. É essa
              integração que transforma sinais de saúde em decisões melhores — com mais eficiência,
              segurança jurídica e um ambiente de trabalho melhor.
            </p>
            <div className="hero-actions">
              <a href="/diagnostico" className="btn btn-primary">
                Fazer diagnóstico gratuito
              </a>
              <a href="#servicos" className="btn btn-outline">
                Conheça os serviços
              </a>
            </div>
            <div className="hero-meta">
              <span className="hero-meta-item">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                Resultados de Exames
              </span>
              <span className="hero-meta-item">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Agendamento de Exames
              </span>
            </div>
          </div>
          <div className="hero-visual reveal">
            <div className="hero-card">
              <h3>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                O que a B&C entrega
              </h3>
              <ul className="hero-card-list">
                <li>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Medicina do Trabalho + Segurança + Perícia
                </li>
                <li>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  PCMSO, PGR e gestão de afastamentos
                </li>
                <li>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Segurança jurídica para sua empresa
                </li>
                <li>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Atendimento em todo MS
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bc-section section-light" id="diferencial">
        <div className="bc-container">
          <div className="section-head center reveal">
            <div className="section-eyebrow">Diferencial</div>
            <h2 className="section-title">Três áreas que se completam</h2>
            <p className="section-sub">
              A segurança previne. A medicina do trabalho acompanha. A inteligência pericial
              transforma sinais em decisões.
            </p>
          </div>
          <div className="conf-grid">
            <div className="conf-card reveal">
              <div className="conf-icon">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3>15 anos de experiência</h3>
              <p>Desde 2011 no apoio à saúde e segurança do trabalho das empresas.</p>
            </div>
            <div className="conf-card reveal">
              <div className="conf-icon">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                </svg>
              </div>
              <h3>3 unidades em MS</h3>
              <p>Jardim, Bonito e Bela Vista — com estrutura para atender todo o estado.</p>
            </div>
            <div className="conf-card reveal">
              <div className="conf-icon">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h3>Medicina + Segurança + Perícia</h3>
              <p>Integração que transforma sinais de saúde em decisões melhores.</p>
            </div>
            <div className="conf-card reveal">
              <div className="conf-icon">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
                </svg>
              </div>
              <h3>+09 municípios e prefeituras</h3>
              <p>
                Atendimento a municípios e prefeituras, incluindo perícia médica e gestão de
                afastamentos.
              </p>
            </div>
            <div className="conf-card reveal">
              <div className="conf-icon">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3>Equipe de médicos e engenheiros</h3>
              <p>
                Profissionais habilitados (CRM, RQE e CREA) para decisões técnicas com segurança e
                profundidade.
              </p>
            </div>
            <div className="conf-card reveal">
              <div className="conf-icon">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <h3>Atendimento em todo MS</h3>
              <p>
                Estrutura para atender empresas em todo Mato Grosso do Sul, com deslocamento das
                equipes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bc-section" id="sobre">
        <div className="bc-container">
          <div className="section-head reveal">
            <div className="section-eyebrow">Sobre a B&C</div>
            <h2 className="section-title">Sobre a B&C</h2>
          </div>
          <div className="sobre-grid">
            <div className="sobre-text reveal">
              <p>
                A B&C Saúde atua há 15 anos no apoio às empresas com consultoria em Medicina do
                Trabalho, Segurança do Trabalho e Perícia Médica.
              </p>
              <p>
                Unificamos as três áreas para manter o funcionário ativo, reduzir absenteísmo,
                reduzir doenças e acidentes de trabalho e dar segurança jurídica à empresa.
              </p>
              <div className="sobre-quote">
                "Na B&C, a saúde ocupacional não termina no PCMSO. A inteligência pericial permite
                identificar padrões, avaliar afastamentos, orientar readaptações e dar ao RH base
                técnica para decisões mais eficientes e seguras."
              </div>
              <div className="sobre-stats">
                <div className="stat-card">
                  <div className="stat-num">15</div>
                  <div className="stat-label">Anos de experiência</div>
                </div>
                <div className="stat-card">
                  <div className="stat-num">3</div>
                  <div className="stat-label">Unidades em MS</div>
                </div>
              </div>
            </div>
            <div className="sobre-box reveal">
              <img
                src="https://i.imgur.com/7qpkRW7.jpeg"
                alt="Equipe B&C Saúde"
                className="sobre-box-img"
              />
              <div className="sobre-box-caption">Equipe B&C Saúde</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bc-section section-light" id="servicos">
        <div className="bc-container">
          <div className="section-head center reveal">
            <div className="section-eyebrow">Serviços</div>
            <h2 className="section-title">Tudo que sua empresa precisa em SST</h2>
          </div>
          <div className="services-grid">
            <div className="service-card reveal">
              <img
                src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=800&q=80"
                alt="Medicina do Trabalho"
                className="service-img"
              />
              <div className="service-body">
                <h3>Medicina do Trabalho</h3>
                <p>PCMSO, exames ocupacionais e complementares, gestão de saúde do trabalhador.</p>
                <ul className="service-list">
                  <li>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    PCMSO e exames ocupacionais
                  </li>
                  <li>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Exames complementares
                  </li>
                  <li>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Gestão de saúde do trabalhador
                  </li>
                </ul>
              </div>
            </div>
            <div className="service-card reveal">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80"
                alt="Segurança do Trabalho"
                className="service-img"
              />
              <div className="service-body">
                <h3>Segurança do Trabalho</h3>
                <p>PGR, LTCAT, adequação eSocial, investigação de acidentes e CAT.</p>
                <ul className="service-list">
                  <li>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    PGR e LTCAT
                  </li>
                  <li>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Adequação eSocial
                  </li>
                  <li>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Investigação de acidentes e CAT
                  </li>
                </ul>
              </div>
            </div>
            <div className="service-card reveal">
              <img
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80"
                alt="Perícia Médica"
                className="service-img"
              />
              <div className="service-body">
                <h3>Perícia Médica</h3>
                <p>
                  Assistência técnica pericial, gestão previdenciária e controle de afastamentos.
                </p>
                <ul className="service-list">
                  <li>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Assistência técnica pericial
                  </li>
                  <li>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Gestão previdenciária
                  </li>
                  <li>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Controle de afastamentos
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bc-section" id="gestao">
        <div className="bc-container">
          <div className="gestao-box reveal">
            <div className="gestao-grid">
              <div>
                <h2>
                  Gestão completa de <em>saúde ocupacional</em>
                </h2>
                <p>
                  A B&C cuida de toda a jornada de SST da sua empresa, com processos simples e
                  padronizados.
                </p>
                <a
                  href="https://api.whatsapp.com/send?phone=5567981131076"
                  className="btn btn-light"
                >
                  Falar com a B&C
                </a>
              </div>
              <ul className="gestao-list">
                <li>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Agendamento e convocação de exames
                </li>
                <li>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Emissão e investigação de CAT
                </li>
                <li>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Controle de afastamentos e perícias
                </li>
                <li>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Suporte SST e adequação ao eSocial
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bc-section" id="cta">
        <div className="bc-container">
          <div className="cta-box">
            <h2>Sua empresa está protegida ou exposta?</h2>
            <p>
              Descubra seu nível de risco trabalhista — passivo, eSocial, afastamentos — antes que
              pequenos problemas virem grandes problemas. Em minutos, você sabe exatamente como está
              a sua gestão de saúde e segurança do trabalho.
            </p>
            <div className="cta-actions">
              <a href="/diagnostico" className="btn btn-light">
                Fazer diagnóstico gratuito
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=5567981131076"
                className="btn btn-outline"
              >
                Falar com a B&C
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bc-section section-light" id="unidades">
        <div className="bc-container">
          <div className="section-head center reveal">
            <div className="section-eyebrow">Unidades</div>
            <h2 className="section-title">Onde estamos</h2>
          </div>
          <div className="units-grid">
            <div className="unit-card reveal">
              <img
                src="https://i.imgur.com/xGoY1M0.jpeg"
                alt="Unidade Jardim"
                className="unit-img"
              />
              <div className="unit-body">
                <h4>Jardim/MS</h4>
                <p>R. Sete de Setembro 772, Centro</p>
                <p>(67) 9 8113-1076</p>
              </div>
            </div>
            <div className="unit-card reveal">
              <img
                src="https://i.imgur.com/R3ZoXWw.jpeg"
                alt="Unidade Bela Vista"
                className="unit-img"
              />
              <div className="unit-body">
                <h4>Bela Vista/MS</h4>
                <p>R. Visconde de Taunay 555</p>
                <p>(67) 9 8113-1076</p>
              </div>
            </div>
            <div className="unit-card reveal">
              <img
                src="https://i.imgur.com/kGaESqF.jpeg"
                alt="Unidade Bonito"
                className="unit-img"
              />
              <div className="unit-body">
                <h4>Bonito/MS</h4>
                <p>R. Pércio Sharman 374</p>
                <p>(67) 9 8113-1076</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bc-section section-dark" id="contato">
        <div className="bc-container">
          <div className="contact-grid">
            <div className="contact-info reveal">
              <h3>Fale com a B&C</h3>
              <p>Estamos à disposição para atender sua empresa.</p>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <h4>E-mail</h4>
                  <a href="mailto:sac.bcsaude@gmail.com">sac.bcsaude@gmail.com</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <h4>Telefone</h4>
                  <a href="tel:+5567981131076">(67) 9 8113-1076</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </div>
                <div>
                  <h4>Instagram</h4>
                  <a href="https://instagram.com/bec.sst" target="_blank" rel="noreferrer">
                    @bec.sst
                  </a>
                </div>
              </div>
            </div>
            <div className="contact-form reveal">
              <h3>Fale conosco</h3>
              <form
                id="form-contato"
                onSubmit={async (e) => {
                  e.preventDefault()
                  const form = e.currentTarget
                  const data = Object.fromEntries(new FormData(form).entries())
                  data._subject = 'Novo contato — Site B&C Saúde'
                  data._template = 'table'
                  data._captcha = 'false'
                  const btn = form.querySelector('button[type="submit"]') as HTMLButtonElement
                  if (btn) {
                    btn.disabled = true
                    btn.textContent = 'Enviando...'
                  }
                  try {
                    const res = await fetch('https://formsubmit.co/ajax/sac.bcsaude@gmail.com', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                      body: JSON.stringify(data),
                    })
                    if (res.ok) {
                      form.innerHTML =
                        '<div style="text-align:center;padding:32px 0"><h3 style="color:#15803d;margin-bottom:8px">✅ Mensagem enviada!</h3><p style="color:#5b6b7a">Recebemos sua mensagem. Nossa equipe entra em contato em até 1 dia útil.</p></div>'
                    } else {
                      throw new Error('fail')
                    }
                  } catch {
                    if (btn) {
                      btn.disabled = false
                      btn.textContent = 'Enviar mensagem'
                    }
                    alert(
                      'Não foi possível enviar. Tente novamente ou clique no botão do WhatsApp.',
                    )
                  }
                }}
              >
                <div className="form-grid">
                  <div className="form-field">
                    <label>Nome</label>
                    <input type="text" name="name" required />
                  </div>
                  <div className="form-field">
                    <label>Empresa</label>
                    <input type="text" name="company" />
                  </div>
                  <div className="form-field">
                    <label>E-mail</label>
                    <input type="email" name="email" required />
                  </div>
                  <div className="form-field">
                    <label>Telefone / WhatsApp</label>
                    <input type="tel" name="phone" placeholder="(67) 9 0000-0000" required />
                  </div>
                  <div className="form-field full">
                    <label>Mensagem</label>
                    <textarea name="message" required />
                  </div>
                </div>
                <div className="btn-row">
                  <button type="submit" className="btn btn-primary">
                    Enviar mensagem
                  </button>
                  <button type="button" className="btn btn-whatsapp" onClick={enviarWhatsApp}>
                    Enviar pelo WhatsApp
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bc-footer">
        <div className="bc-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <img src={LOGO_FOOTER} alt="B&C Saúde" />
              <p>
                Medicina do Trabalho com inteligência pericial para decisões melhores, mais
                eficiência e um ambiente de trabalho mais seguro.
              </p>
            </div>
            <div className="footer-col">
              <h4>Navegação</h4>
              <a href="#diferencial">Diferencial</a>
              <a href="#sobre">Sobre</a>
              <a href="#servicos">Serviços</a>
              <a href="#gestao">Gestão</a>
              <a href="#unidades">Unidades</a>
              <a href="/diagnostico">Fazer Diagnóstico</a>
            </div>
            <div className="footer-col">
              <h4>Contato</h4>
              <a href="mailto:sac.bcsaude@gmail.com">sac.bcsaude@gmail.com</a>
              <a href="tel:+5567981131076">(67) 9 8113-1076</a>
              <a href="https://instagram.com/bec.sst" target="_blank" rel="noreferrer">
                Instagram @bec.sst
              </a>
              <a href="https://consulta.apibcsaude.com.br/" target="_blank" rel="noreferrer">
                Resultados de Exames
              </a>
              <a href="https://agendamentos-five.vercel.app/" target="_blank" rel="noreferrer">
                Agendamento de Exames
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            © {new Date().getFullYear()} B&C Saúde — Bento & Carvalho Ltda. Todos os direitos
            reservados.
          </div>
        </div>
      </footer>

      {/* ===== FLOAT WHATSAPP ===== */}
      <button
        className="float-main"
        onClick={() => setFloatOpen(!floatOpen)}
        aria-label="Falar com a B&C"
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
      </button>
      {floatOpen && (
        <div className="float-menu">
          <a href="https://agendamentos-five.vercel.app/" target="_blank" rel="noreferrer">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Agendamento de Exames
          </a>
          <a href="https://consulta.apibcsaude.com.br/" target="_blank" rel="noreferrer">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            Resultados de Exames
          </a>
          <a
            href="https://api.whatsapp.com/send?phone=5567981131076"
            target="_blank"
            rel="noreferrer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
            </svg>
            Falar com a B&C
          </a>
        </div>
      )}
    </div>
  )
}

export default Index
