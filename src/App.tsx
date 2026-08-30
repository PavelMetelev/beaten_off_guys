import { useState, useEffect, useRef } from "react";

// ── Animated Title ──────────────────────────────────────────────────────────
function AnimatedTitle() {
  const text = "ОТБИТЫЕ ПАРНИ";
  const [glitchIndex, setGlitchIndex] = useState<number | null>(null);
  const [wave, setWave] = useState(0);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchIndex(Math.floor(Math.random() * text.length));
      setTimeout(() => setGlitchIndex(null), 150);
    }, 1800);

    const waveInterval = setInterval(() => {
      setWave((w) => (w + 1) % text.length);
    }, 120);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(waveInterval);
    };
  }, []);

  return (
    <h1 className="band-title" aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className={`title-char ${glitchIndex === i ? "glitch" : ""} ${
            wave === i ? "wave-active" : ""
          }`}
          style={{ animationDelay: `${i * 0.05}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h1>
  );
}

// ── Nav ─────────────────────────────────────────────────────────────────────
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Главная", href: "#hero" },
    { label: "О группе", href: "#about" },
    { label: "Музыка", href: "#music" },
    { label: "Заказать трек", href: "#order" },
    { label: "Контакты", href: "#contacts" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "nav-scrolled" : "nav-top"}`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <a href="#hero" className="nav-logo">ОП</a>
        {/* Desktop */}
        <ul className="hidden md:flex gap-6">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="nav-link">{l.label}</a>
            </li>
          ))}
        </ul>
        {/* Burger */}
        <button
          className="md:hidden burger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Меню"
        >
          <span className={`burger-line ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`burger-line ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`burger-line ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mobile-menu">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="mobile-link" onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="hero"
      className="hero-section"
      style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
    >
      <div className="hero-overlay" />
      <div className="hero-content">
        <AnimatedTitle />
        <p className="hero-sub">Панк-рок из глубины души — без фильтров и компромиссов</p>
        <div className="hero-btns">
          <a href="#music" className="btn-primary">Слушать музыку</a>
          <a href="#order" className="btn-secondary">Заказать трек</a>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-arrow" />
        </div>
      </div>
    </section>
  );
}

// ── About ────────────────────────────────────────────────────────────────────
function About() {
  const stats = [
    { value: "2025", label: "год основания" },
    { value: "40+", label: "концертов" },
    { value: "3", label: "альбома" },
    { value: "∞", label: "энергии" },
  ];

  return (
    <section id="about" className="about-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">// О нас</span>
          <h2 className="section-title">Кто такие <span className="accent">Отбитые Парни?</span></h2>
        </div>
        <div className="about-grid">
          <div className="about-text">
            <p>
              Мы — <strong>Отбитые Парни</strong>. Панк-рок группа, которая играет громко,
              живёт быстро и не извиняется за это. Наша музыка — это крик тех,
              кто устал молчать, сырая энергия улицы, завёрнутая в риффы и
              честные тексты.
            </p>
            <p>
              Каждый концерт — это не шоу, это катарсис. Приходи готовым
              выложиться по полной. Мы не даём скидок ни себе, ни публике.
            </p>
            <div className="punk-divider">
              <span>✦</span><span>✦</span><span>✦</span>
            </div>
          </div>
          <div className="about-stats">
            {stats.map((s) => (
              <div key={s.label} className="stat-card">
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Music / Яндекс Музыка ────────────────────────────────────────────────────
function Music() {
  return (
    <section id="music" className="music-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">// Музыка</span>
          <h2 className="section-title">Слушай нас на <span className="accent">Яндекс Музыке</span></h2>
        </div>

        <div className="yandex-wrapper">
          <div className="yandex-player-card">
            <div className="yandex-top-bar">
              <div className="yandex-dots">
                <span style={{ background: "#ff5f57" }} />
                <span style={{ background: "#ffbd2e" }} />
                <span style={{ background: "#28c840" }} />
              </div>
              <span className="yandex-title-bar">Яндекс Музыка — Отбитые Парни</span>
            </div>
            <iframe
              className="yandex-iframe"
              frameBorder="0"
              style={{ border: "none", width: "100%", height: "500px" }}
              width="100%"
              height="500"
              src="https://music.yandex.ru/iframe/#artist/24977441"
              allow="autoplay"
            />
          </div>

          <div className="yandex-open-link">
            <a
              href="https://music.yandex.ru/artist/24977441"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-yandex"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.5 2H12v11.586l-3.293-3.293-1.414 1.414L12 16.414l4.707-4.707-1.414-1.414L13.5 12.586V2z"/>
                <path d="M19 19H5V9H3v10a2 2 0 002 2h14a2 2 0 002-2V9h-2v10z"/>
              </svg>
              Открыть в Яндекс Музыке
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Order Form ───────────────────────────────────────────────────────────────
function OrderForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    contact: "",
    theme: "",
    genre: "",
    details: "",
    agree: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Укажи своё имя";
    if (!form.contact.trim()) e.contact = "Укажи способ связи";
    if (!form.theme.trim()) e.theme = "Опиши тему трека";
    if (!form.agree) e.agree = "Необходимо согласие";
    return e;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const value = target.type === "checkbox" ? (target as HTMLInputElement).checked : target.value;
    setForm((prev) => ({ ...prev, [target.name]: value }));
    setErrors((prev) => ({ ...prev, [target.name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
    // Small delay to show animation then redirect
    setTimeout(() => {
      window.location.href = "https://vk.ru/paatamosya";
    }, 1800);
  };

  return (
    <section id="order" className="order-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">// Заказ трека</span>
          <h2 className="section-title">Закажи свой <span className="accent">уникальный трек</span></h2>
        </div>

        <div className="order-layout">
          {/* Price card */}
          <div className="price-card">
            <div className="price-badge">ЦЕНА</div>
            <div className="price-value">5 000 ₽</div>
            <div className="price-usd">(58,41 USD)</div>
            <ul className="price-features">
              <li>✦ Авторский текст и музыка</li>
              <li>✦ Профессиональная запись</li>
              <li>✦ Сведение и мастеринг</li>
              <li>✦ Передача прав на использование</li>
              <li>✦ Срок: 7–14 дней</li>
            </ul>
            <div className="price-divider" />
            <p className="price-note">
              После отправки формы мы свяжемся с тобой во ВКонтакте для уточнения деталей.
            </p>
          </div>

          {/* Form */}
          <div className="form-card">
            {submitted ? (
              <div className="success-state">
                <div className="success-icon">🤘</div>
                <h3>Огонь! Форма отправлена!</h3>
                <p>Перенаправляем тебя к нам во ВКонтакте...</p>
                <div className="success-loader" />
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="name">Твоё имя *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Как тебя звать?"
                    value={form.name}
                    onChange={handleChange}
                    className={errors.name ? "error" : ""}
                  />
                  {errors.name && <span className="err-msg">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="contact">Способ связи *</label>
                  <input
                    id="contact"
                    name="contact"
                    type="text"
                    placeholder="ВКонтакте, Телеграм, телефон..."
                    value={form.contact}
                    onChange={handleChange}
                    className={errors.contact ? "error" : ""}
                  />
                  {errors.contact && <span className="err-msg">{errors.contact}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="theme">Тема / идея трека *</label>
                  <input
                    id="theme"
                    name="theme"
                    type="text"
                    placeholder="О чём должен быть трек?"
                    value={form.theme}
                    onChange={handleChange}
                    className={errors.theme ? "error" : ""}
                  />
                  {errors.theme && <span className="err-msg">{errors.theme}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="genre">Предпочтительный жанр</label>
                  <select
                    id="genre"
                    name="genre"
                    value={form.genre}
                    onChange={handleChange}
                  >
                    <option value="">Выбери жанр (необязательно)</option>
                    <option value="punk">Панк-рок</option>
                    <option value="hardcore">Хардкор</option>
                    <option value="alternative">Альтернатива</option>
                    <option value="rock">Рок</option>
                    <option value="other">Другой</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="details">Дополнительные пожелания</label>
                  <textarea
                    id="details"
                    name="details"
                    rows={4}
                    placeholder="Настроение, слова, образы, кому посвящается..."
                    value={form.details}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="agree"
                      checked={form.agree}
                      onChange={handleChange}
                    />
                    <span>Я согласен(а) на обработку персональных данных</span>
                  </label>
                  {errors.agree && <span className="err-msg">{errors.agree}</span>}
                </div>

                <button type="submit" className="btn-submit">
                  <span>🤘 Отправить заявку</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer / Contacts ────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer id="contacts" className="footer">
      <div className="section-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">ОТБИТЫЕ ПАРНИ</div>
            <p className="footer-tagline">Громко. Честно. По-панковски.</p>
          </div>
          <div className="footer-links">
            <h4>Навигация</h4>
            <a href="#hero">Главная</a>
            <a href="#about">О группе</a>
            <a href="#music">Музыка</a>
            <a href="#order">Заказать трек</a>
          </div>
          <div className="footer-social">
            <h4>Социальные сети</h4>
            <a
              href="https://vk.ru/paatamosya"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link vk"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.392 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.677-1.253.677-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.253-1.406 2.15-3.574 2.15-3.574.119-.254.322-.491.762-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.745-.576.745z"/>
              </svg>
              ВКонтакте
            </a>
            <a
              href="https://music.yandex.ru/artist/24977441"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link ym"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
              </svg>
              Яндекс Музыка
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Отбитые Парни. Все права защищены.</p>
          <p className="footer-punk">Stay punk. Stay honest. 🤘</p>
        </div>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="app-root">
      <Navbar />
      <Hero />
      <About />
      <Music />
      <OrderForm />
      <Footer />
    </div>
  );
}
