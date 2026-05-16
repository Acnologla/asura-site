/* i18n + responsive hooks */
const LangContext = React.createContext({ lang: "pt", setLang: () => {} });

function LangProvider({ children }) {
  const [lang, setLang] = React.useState(() => {
    try { return localStorage.getItem("asura_lang") || "pt"; } catch { return "pt"; }
  });
  React.useEffect(() => {
    try { localStorage.setItem("asura_lang", lang); } catch {}
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

function useT() {
  const { lang } = React.useContext(LangContext);
  return (pt, en) => lang === "pt" ? pt : (en ?? pt);
}
function useLang() { return React.useContext(LangContext); }

function LangToggle({ compact }) {
  const { lang, setLang } = useLang();
  return (
    <div style={{
      display: "inline-flex", padding: 3, borderRadius: 999,
      background: "#fff", border: "1px solid var(--line)",
      boxShadow: "var(--shadow-sm)",
    }}>
      {["pt", "en"].map(l => (
        <button key={l} onClick={() => setLang(l)} style={{
          padding: compact ? "4px 9px" : "5px 11px", borderRadius: 999, border: 0,
          background: lang === l ? "var(--ink)" : "transparent",
          color: lang === l ? "#fff" : "var(--ink-2)",
          fontWeight: 700, fontSize: 11,
          fontFamily: "JetBrains Mono, monospace",
          letterSpacing: ".08em", textTransform: "uppercase",
          cursor: "pointer",
        }}>{l}</button>
      ))}
    </div>
  );
}

/* Mobile detection */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = React.useState(() => typeof window !== "undefined" && window.innerWidth < breakpoint);
  React.useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return isMobile;
}

Object.assign(window, { LangContext, LangProvider, useT, useLang, LangToggle, useIsMobile });
