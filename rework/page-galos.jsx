/* GALOS GALLERY PAGE */
function PageGalos({ go }) {
  const isMobile = useIsMobile();
  const t = useT();
  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const [raridade, setRaridade] = useState("Todas");

  const filtered = useMemo(() => {
    return window.TIPOS.filter(tipo => {
      if (search && !tipo.nome.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [search]);

  return (
    <div data-screen-label="02 Galos">
      <section style={{ padding: isMobile ? "32px 0 24px" : "60px 0 32px" }}>
        <div className="container">
          <div style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "flex-end",
            gap: isMobile ? 24 : 16,
            marginBottom: isMobile ? 24 : 32,
          }}>
            <div>
              <div className="eyebrow">{t("CATÁLOGO", "CATALOG")}</div>
              <h1 className="h-display" style={{ fontSize: isMobile ? 38 : 56, margin: "8px 0 12px" }}>
                {t(<>Todos os <span style={{ color: "var(--primary)" }}>galos</span></>,
                   <>All <span style={{ color: "var(--primary)" }}>roosters</span></>)}
              </h1>
              <p style={{ fontSize: isMobile ? 15 : 16, color: "var(--ink-2)", maxWidth: 540, margin: 0 }}>
                {t(
                  "16 tipos elementais com fraquezas, fortes e habilidades únicas. Clique em qualquer um para ver detalhes, raridades e skills.",
                  "16 elemental types with weaknesses, strengths and unique abilities. Tap any to see details, rarities and skills."
                )}
              </p>
            </div>
            <div style={{
              display: "flex", gap: 10, alignItems: "center",
              flexDirection: isMobile ? "column" : "row",
              width: isMobile ? "100%" : "auto",
            }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "8px 14px", borderRadius: 999,
                background: "#fff", border: "1px solid var(--line)",
                minWidth: isMobile ? "100%" : 280,
                width: isMobile ? "100%" : "auto",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  placeholder={t("Procurar tipo de galo…", "Search rooster type…")}
                  value={search} onChange={e => setSearch(e.target.value)}
                  style={{ flex: 1, border: 0, outline: 0, background: "transparent", fontSize: 14, fontFamily: "inherit", color: "var(--ink)" }}
                />
              </div>
              <select
                value={raridade}
                onChange={e => setRaridade(e.target.value)}
                style={{
                  padding: "10px 16px", borderRadius: 999,
                  background: "#fff", border: "1px solid var(--line)",
                  fontSize: 13, color: "var(--ink)", fontFamily: "inherit",
                  cursor: "pointer", outline: "none",
                  width: isMobile ? "100%" : "auto",
                }}
              >
                <option>{t("Todas raridades", "All rarities")}</option>
                {window.RARIDADES.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
          </div>

          {/* tag filter row */}
          <div style={{ display: "flex", gap: 8, marginBottom: isMobile ? 24 : 32, flexWrap: "wrap", alignItems: "center" }}>
            {[
              ["Todos", t("Todos", "All")],
              ["Físico", t("Físico", "Physical")],
              ["Elemental", t("Elemental", "Elemental")],
              ["Especial", t("Especial", "Special")],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className="chip"
                style={{
                  cursor: "pointer",
                  background: filter === key ? "var(--ink)" : "#fff",
                  color: filter === key ? "#fff" : "var(--ink-2)",
                  borderColor: filter === key ? "var(--ink)" : "var(--line-2)",
                  padding: "8px 14px", fontSize: 13,
                  fontFamily: "inherit",
                }}
              >
                {label}
              </button>
            ))}
            {!isMobile && <div style={{ flex: 1 }} />}
            <div className="chip" style={{ background: "var(--primary-soft)", color: "var(--primary-ink)", borderColor: "#d9c9ff" }}>
              {filtered.length} {t("de", "of")} {window.TIPOS.length} {t("tipos", "types")}
            </div>
          </div>

          {/* grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: isMobile ? 12 : 18
          }}>
            {filtered.map((tipo, i) => (
              <GaloCard key={tipo.nome} tipo={tipo} go={go} isMobile={isMobile} />
            ))}
          </div>

          {/* type matchup teaser */}
          <div className="card" style={{ marginTop: isMobile ? 40 : 60, padding: isMobile ? 22 : 32 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
              <div>
                <div className="eyebrow">{t("CONFRONTOS", "MATCHUPS")}</div>
                <div style={{ fontFamily: "Bricolage Grotesque", fontSize: isMobile ? 22 : 26, fontWeight: 700, marginTop: 6 }}>
                  {t("Tabela de tipos", "Type chart")}
                </div>
              </div>
              <div className="chip">{t("Atualizado para v3.2", "Updated for v3.2")}</div>
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
              gap: 12
            }}>
              {window.TIPOS.slice(0, 8).map(tipo => (
                <div key={tipo.nome} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, background: "#fafafd", border: "1px solid var(--line)" }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 6,
                    background: `linear-gradient(135deg, ${tipo.gradFrom}, ${tipo.gradTo})`,
                    display: "grid", placeItems: "center",
                    color: tipo.textColor, fontFamily: "JetBrains Mono", fontWeight: 700, fontSize: 11,
                    letterSpacing: ".05em",
                    flexShrink: 0,
                  }}>{tipo.nome.slice(0, 2).toUpperCase()}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{tipo.nome}</div>
                    <div style={{ fontSize: 10, color: "var(--ink-3)", fontFamily: "JetBrains Mono", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {t("forte", "strong")}: {tipo.forte.join(", ") || "—"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function GaloCard({ tipo, go, isMobile }) {
  return (
    <button onClick={() => go("galo", { tipo: tipo.nome })} style={{
      background: "#fff", border: "1px solid var(--line)",
      borderRadius: 18, padding: 10,
      cursor: "pointer", textAlign: "left",
      transition: "transform .15s, box-shadow .2s, border-color .2s",
      display: "flex", flexDirection: "column", gap: 12,
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "var(--shadow)"; e.currentTarget.style.borderColor = "var(--primary)"; }}
    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--line)"; }}>
      <div style={{ position: "relative" }}>
        <RoosterMark tipo={tipo} size={isMobile ? 170 : 260} label={false} />
        <div className={`rarity-${tipo.raridade}`} style={{
          position: "absolute", top: 10, left: 10,
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "4px 9px",
          background: "rgba(255,255,255,.92)", backdropFilter: "blur(6px)",
          fontSize: 10, fontFamily: "JetBrains Mono", fontWeight: 700,
          letterSpacing: ".08em", textTransform: "uppercase",
          color: "var(--r)",
          border: "1px solid var(--line)",
          borderRadius: 4,
        }}>
          ★ {tipo.raridade}
        </div>
      </div>
      <div style={{ padding: "0 6px 8px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 8, gap: 8 }}>
          <div style={{ fontFamily: "Bricolage Grotesque", fontWeight: 700, fontSize: isMobile ? 17 : 20 }}>
            {tipo.nome}
          </div>
          <div style={{ fontSize: 10, fontFamily: "JetBrains Mono", color: "var(--ink-3)", letterSpacing: ".08em" }}>
            #{String(window.TIPOS.findIndex(x => x.nome === tipo.nome) + 1).padStart(3, "0")}
          </div>
        </div>
        <div style={{ fontSize: isMobile ? 11 : 12, color: "var(--ink-3)", lineHeight: 1.45, minHeight: isMobile ? 0 : 36 }}>
          {tipo.desc}
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
          {tipo.forte.slice(0, 2).map(f => (
            <span key={f} style={{ fontSize: 10, fontFamily: "JetBrains Mono", padding: "3px 7px", borderRadius: 999, background: "#e6f5ee", color: "var(--emerald)" }}>
              ↑ {f}
            </span>
          ))}
          {tipo.fraco.slice(0, 2).map(f => (
            <span key={f} style={{ fontSize: 10, fontFamily: "JetBrains Mono", padding: "3px 7px", borderRadius: 999, background: "#fbe7ee", color: "var(--rose)" }}>
              ↓ {f}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

window.PageGalos = PageGalos;
