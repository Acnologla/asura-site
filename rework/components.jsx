/* Shared components: Nav, Footer, RoosterPlaceholder, etc. */
const { useState, useEffect, useRef, useMemo } = React;

/* Image-slot placeholder for rooster art — clearly a "drop image here" slot.
   When the user has real rooster art, swap this for an <img>. */
function RoosterMark({ tipo, size = 220, label = true, ratio = 0.78 }) {
  if (!tipo) return null;
  const w = size, h = Math.round(size * ratio);
  const stripeId = `s-${tipo.nome.replace(/\s/g, "")}-${size}`;
  return (
    <div style={{
      width: w, height: h,
      borderRadius: 14,
      background: tipo.gradFrom,
      border: `1px solid ${tipo.gradTo}30`,
      position: "relative", overflow: "hidden",
    }}>
      {/* diagonal stripes placeholder */}
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }} preserveAspectRatio="none">
        <defs>
          <pattern id={stripeId} patternUnits="userSpaceOnUse" width="14" height="14" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="14" stroke={tipo.gradTo} strokeWidth="1.5" opacity="0.18" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${stripeId})`} />
      </svg>

      {/* crosshair center marker */}
      <div style={{
        position: "absolute", left: "50%", top: "50%",
        transform: "translate(-50%, -50%)",
        width: 24, height: 24,
        opacity: 0.4, color: tipo.textColor,
      }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <line x1="12" y1="2" x2="12" y2="9" />
          <line x1="12" y1="15" x2="12" y2="22" />
          <line x1="2" y1="12" x2="9" y2="12" />
          <line x1="15" y1="12" x2="22" y2="12" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </div>

      {/* top-left dim */}
      <div style={{
        position: "absolute", top: 10, left: 12,
        fontFamily: "JetBrains Mono, monospace", fontSize: 9,
        letterSpacing: ".14em", textTransform: "uppercase",
        color: tipo.textColor, opacity: .55,
      }}>
        {String(window.TIPOS.findIndex(x => x.nome === tipo.nome) + 1).padStart(3, "0")}
      </div>

      {/* type label bottom-left */}
      {label && (
        <div style={{
          position: "absolute", bottom: 10, left: 12,
          fontFamily: "JetBrains Mono, monospace", fontSize: 10,
          letterSpacing: ".12em", textTransform: "uppercase",
          color: tipo.textColor, fontWeight: 600,
          padding: "3px 7px",
          background: "color-mix(in oklab, white 35%, transparent)",
          borderRadius: 4,
        }}>
          {tipo.nome}.png
        </div>
      )}

      {/* dimension marker bottom-right */}
      <div style={{
        position: "absolute", bottom: 10, right: 12,
        fontFamily: "JetBrains Mono, monospace", fontSize: 9,
        letterSpacing: ".1em",
        color: tipo.textColor, opacity: .5,
      }}>
        {w}×{h}
      </div>
    </div>
  );
}

function Nav({ route, go }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const t = useT();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { setMenuOpen(false); }, [route]);

  const navItems = [
    { id: "home",    label: t("Início", "Home") },
    { id: "galos",   label: t("Galos", "Roosters") },
    { id: "modos",   label: t("Modos", "Modes"), onClick: () => { go("home"); setTimeout(() => document.getElementById("modos")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50); } },
    { id: "comandos", label: t("Comandos", "Commands"), onClick: () => { go("home"); setTimeout(() => document.getElementById("comandos")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50); } },
    { id: "apoiar",  label: t("Apoiar", "Donate") },
  ];

  const Logo = (
    <button onClick={() => go("home")} style={{ background: "none", border: 0, padding: 0, display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
      <div style={{
        width: 32, height: 32, borderRadius: 8,
        background: "linear-gradient(135deg, #7c4dff 0%, #4a1fd1 100%)",
        display: "grid", placeItems: "center",
        color: "#fff", fontFamily: "Bricolage Grotesque", fontWeight: 800, fontSize: 18,
        boxShadow: "0 4px 12px -2px rgba(74,31,209,.5)",
      }}>A</div>
      <div style={{ fontFamily: "Bricolage Grotesque", fontWeight: 700, fontSize: 18, letterSpacing: "-.01em" }}>
        Asura<span style={{ color: "var(--primary)" }}>Bot</span>
      </div>
    </button>
  );

  return (
    <nav className={scrolled ? "scrolled" : ""} style={{
      position: "sticky", top: 0, zIndex: 50,
      transition: "background .2s ease",
    }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: isMobile ? 60 : 72 }}>
        {Logo}

        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {navItems.map(item => (
              <button
                key={item.id}
                className={`nav-link ${route === item.id ? "active" : ""}`}
                onClick={() => item.onClick ? item.onClick() : go(item.id)}
                style={{ background: "none", border: 0, cursor: "pointer" }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        {!isMobile ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <LangToggle />
            <button className="btn btn-primary">
              <DiscordIcon size={16} />
              {t("Adicionar ao Discord", "Add to Discord")}
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <LangToggle compact />
            <button onClick={() => setMenuOpen(o => !o)} aria-label="Menu" style={{
              width: 38, height: 38, borderRadius: 10,
              background: menuOpen ? "var(--ink)" : "#fff",
              color: menuOpen ? "#fff" : "var(--ink)",
              border: "1px solid var(--line)", cursor: "pointer",
              display: "grid", placeItems: "center",
            }}>
              {menuOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Mobile sheet menu */}
      {isMobile && menuOpen && (
        <div style={{
          position: "absolute", top: 60, left: 0, right: 0,
          background: "#fff", borderBottom: "1px solid var(--line)",
          boxShadow: "var(--shadow)", padding: "18px 18px 22px",
          display: "flex", flexDirection: "column", gap: 4,
          animation: "slideDown .2s ease",
        }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => item.onClick ? item.onClick() : go(item.id)}
              style={{
                background: route === item.id ? "var(--primary-soft)" : "transparent",
                color: route === item.id ? "var(--primary-ink)" : "var(--ink)",
                border: 0, padding: "12px 14px", borderRadius: 10,
                textAlign: "left", fontSize: 15, fontWeight: 600, cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {item.label}
            </button>
          ))}
          <button className="btn btn-primary" style={{ marginTop: 12, padding: "14px 18px" }}>
            <DiscordIcon size={16} />
            {t("Adicionar ao Discord", "Add to Discord")}
          </button>
        </div>
      )}
      <style>{`@keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </nav>
  );
}

function Footer({ go }) {
  const isMobile = useIsMobile();
  const t = useT();
  return (
    <footer style={{ padding: isMobile ? "48px 0 28px" : "80px 0 40px", background: "var(--ink)", color: "#cfc6df", marginTop: 80 }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "2fr 1fr 1fr 1fr",
          gap: isMobile ? 32 : 48,
        }}>
          <div style={{ gridColumn: isMobile ? "1 / -1" : "auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: "linear-gradient(135deg, #7c4dff 0%, #4a1fd1 100%)",
                display: "grid", placeItems: "center",
                color: "#fff", fontFamily: "Bricolage Grotesque", fontWeight: 800, fontSize: 18,
              }}>A</div>
              <div style={{ fontFamily: "Bricolage Grotesque", fontWeight: 700, fontSize: 20, color: "#fff" }}>
                AsuraBot
              </div>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: "#9b91b0", maxWidth: 320 }}>
              {t(
                "O bot de rinhas de galos mais completo do Discord. Treine, batalhe, suba de rank e domine os servidores.",
                "The most complete rooster fighting bot on Discord. Train, battle, rank up and dominate servers."
              )}
            </p>
          </div>
          <div>
            <div style={{ fontWeight: 700, color: "#fff", marginBottom: 14, fontSize: 13 }}>{t("Jogo", "Game")}</div>
            {[
              ["home", t("Início", "Home")], ["galos", t("Galos", "Roosters")], ["apoiar", t("Apoiar", "Donate")],
            ].map(([id, label]) => (
              <div key={id} style={{ marginBottom: 8 }}>
                <button onClick={() => go(id)} style={{ background: "none", border: 0, color: "#cfc6df", fontSize: 13, padding: 0, cursor: "pointer", fontFamily: "inherit" }}>
                  {label}
                </button>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontWeight: 700, color: "#fff", marginBottom: 14, fontSize: 13 }}>{t("Comunidade", "Community")}</div>
            {[t("Discord Oficial", "Official Discord"), t("Documentação", "Documentation"), t("Suporte", "Support"), "Wiki"].map(x => (
              <div key={x} style={{ marginBottom: 8 }}>
                <a href="#" style={{ fontSize: 13 }}>{x}</a>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontWeight: 700, color: "#fff", marginBottom: 14, fontSize: 13 }}>Legal</div>
            {[t("Termos de Uso", "Terms of Use"), t("Privacidade", "Privacy"), t("Reembolso", "Refund")].map(x => (
              <div key={x} style={{ marginBottom: 8 }}>
                <a href="#" style={{ fontSize: 13 }}>{x}</a>
              </div>
            ))}
          </div>
        </div>
        <div style={{
          marginTop: isMobile ? 36 : 56, paddingTop: 24,
          borderTop: "1px solid rgba(255,255,255,.08)",
          display: "flex", flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", gap: 12,
          fontSize: 12, color: "#7e7497",
        }}>
          <div>© 2026 Asura Bot. {t("Todos os direitos reservados.", "All rights reserved.")}</div>
          <div>{t("Feito com 💜 no Brasil", "Made with 💜 in Brazil")}</div>
        </div>
      </div>
    </footer>
  );
}

function DiscordIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M19.27 5.33A18.32 18.32 0 0 0 15.04 4l-.21.43c1.51.32 2.97.85 4.33 1.61a16.7 16.7 0 0 0-14.32 0c1.36-.76 2.82-1.29 4.33-1.61L8.96 4a18.32 18.32 0 0 0-4.23 1.33C2.06 9.07 1.33 12.71 1.7 16.3a18.5 18.5 0 0 0 5.58 2.8l1.13-1.54a11.7 11.7 0 0 1-1.85-.9c.16-.11.31-.23.46-.35a13.1 13.1 0 0 0 9.96 0c.15.12.3.24.46.35-.59.34-1.2.64-1.85.9l1.13 1.54a18.5 18.5 0 0 0 5.58-2.8c.43-4.14-.69-7.74-2.83-10.97zM8.52 14.4c-1.1 0-2-1.01-2-2.25s.88-2.25 2-2.25 2.02 1.01 2 2.25c0 1.24-.88 2.25-2 2.25zm6.96 0c-1.1 0-2-1.01-2-2.25s.88-2.25 2-2.25 2.02 1.01 2 2.25c0 1.24-.88 2.25-2 2.25z"/>
    </svg>
  );
}

function ArrowIcon({ size = 16 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

function CheckIcon({ size = 16, color = "currentColor" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

Object.assign(window, { RoosterMark, Nav, Footer, DiscordIcon, ArrowIcon, CheckIcon });
