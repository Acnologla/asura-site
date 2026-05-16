/* GALO DETAIL PAGE */
function PageGalo({ go, params }) {
  const isMobile = useIsMobile();
  const t = useT();
  const tipoNome = params?.tipo || "Holograma";
  const tipo = window.TIPOS.find(t => t.nome === tipoNome) || window.TIPOS[15];
  const skills = window.SKILLS_BY_TIPO[tipo.nome] || window.SKILLS_BY_TIPO.default;
  const r = tipo.raridade;

  const others = window.TIPOS.filter(t => t.nome !== tipo.nome);
  const [idx, setIdx] = useState(window.TIPOS.findIndex(t => t.nome === tipo.nome));

  const next = () => {
    const ni = (idx + 1) % window.TIPOS.length;
    setIdx(ni); go("galo", { tipo: window.TIPOS[ni].nome });
  };
  const prev = () => {
    const ni = (idx - 1 + window.TIPOS.length) % window.TIPOS.length;
    setIdx(ni); go("galo", { tipo: window.TIPOS[ni].nome });
  };

  // Initials for type badge
  const initials = tipo.nome.slice(0, 2).toUpperCase();

  return (
    <div data-screen-label={`03 Galo · ${tipo.nome}`}>
      {/* Breadcrumb */}
      <section style={{ padding: isMobile ? "20px 0 12px" : "32px 0 16px" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--ink-3)" }}>
          <button onClick={() => go("home")} style={{ background: "none", border: 0, color: "inherit", cursor: "pointer", padding: 0, fontFamily: "inherit", fontSize: "inherit" }}>{t("Início", "Home")}</button>
          <span>/</span>
          <button onClick={() => go("galos")} style={{ background: "none", border: 0, color: "inherit", cursor: "pointer", padding: 0, fontFamily: "inherit", fontSize: "inherit" }}>{t("Galos", "Roosters")}</button>
          <span>/</span>
          <span style={{ color: "var(--ink)" }}>{tipo.nome}</span>
        </div>
      </section>

      <section style={{ padding: "8px 0 32px" }}>
        <div className="container">

          {/* Editorial header — spec line spanning whole width */}
          <div style={{
            display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
            padding: "14px 0",
            borderTop: "1px solid var(--line)",
            borderBottom: "1px solid var(--line)",
            marginBottom: isMobile ? 24 : 36,
            fontFamily: "JetBrains Mono", fontSize: 11,
            letterSpacing: ".1em", textTransform: "uppercase",
            color: "var(--ink-3)",
          }}>
            <span>FILE · #{String(idx + 1).padStart(3, "0")} / {String(window.TIPOS.length).padStart(3, "0")}</span>
            <span style={{ width: 4, height: 4, borderRadius: 999, background: "var(--ink-3)" }} />
            <span style={{ color: "var(--ink)", fontWeight: 600 }}>{t("TIPO", "TYPE")} {tipo.nome.toUpperCase()}</span>
            <span className={`rarity-${r}`} style={{ color: "var(--r)", fontWeight: 600 }}>★ {r.toUpperCase()}</span>
            <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
              <button onClick={prev} style={{
                width: 30, height: 30, borderRadius: 999,
                background: "#fff", border: "1px solid var(--line)",
                cursor: "pointer", color: "var(--ink-2)", fontSize: 16,
              }}>‹</button>
              <button onClick={next} style={{
                width: 30, height: 30, borderRadius: 999,
                background: "#fff", border: "1px solid var(--line)",
                cursor: "pointer", color: "var(--ink-2)", fontSize: 16,
              }}>›</button>
            </div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.05fr 1fr",
            gap: isMobile ? 28 : 56,
            alignItems: "start"
          }}>
            {/* Left: rooster art */}
            <div>
              <RoosterMark tipo={tipo} size={isMobile ? 360 : 560} ratio={0.95} label={false} />

              {/* Caption under image */}
              <div style={{
                marginTop: 14,
                display: "flex", justifyContent: "space-between", alignItems: "baseline",
                fontFamily: "JetBrains Mono", fontSize: 10,
                letterSpacing: ".1em", textTransform: "uppercase",
                color: "var(--ink-3)",
              }}>
                <span>{tipo.nome}.png · 560 × 532</span>
                <span style={{ color: "var(--ink-3)" }}>{t("placeholder", "placeholder")}</span>
              </div>

              <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
                <button className="btn btn-ghost" style={{ padding: "8px 14px", fontSize: 12 }}>Skins</button>
                <button className="btn btn-ghost" style={{ padding: "8px 14px", fontSize: 12 }}>{t("Comparar", "Compare")}</button>
                <button className="btn btn-ghost" style={{ padding: "8px 14px", fontSize: 12 }}>{t("Galeria", "Gallery")}</button>
              </div>
            </div>

            {/* Right: info */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 12,
                  background: `linear-gradient(135deg, ${tipo.gradFrom}, ${tipo.gradTo})`,
                  display: "grid", placeItems: "center",
                  color: tipo.textColor, fontFamily: "JetBrains Mono", fontWeight: 700, fontSize: 18,
                  letterSpacing: ".04em",
                  border: `1px solid ${tipo.gradTo}40`,
                }}>{initials}</div>
                <div className={`rarity-${r}`} style={{
                  padding: "6px 12px", borderRadius: 999,
                  border: "1px solid var(--r)",
                  color: "var(--r)", fontWeight: 700,
                  fontSize: 11, fontFamily: "JetBrains Mono",
                  letterSpacing: ".1em", textTransform: "uppercase",
                  background: "color-mix(in oklab, var(--r) 10%, white)",
                }}>
                  ★ {r}
                </div>
              </div>

              <h1 className="h-display" style={{ fontSize: isMobile ? 44 : 72, margin: "0 0 12px", lineHeight: .98, letterSpacing: "-.025em" }}>
                {t("Galo", "Rooster")}<br/>
                <span style={{ color: tipo.gradTo }}>{tipo.nome}</span>
              </h1>
              <p style={{ fontSize: isMobile ? 15 : 17, color: "var(--ink-2)", lineHeight: 1.55, marginBottom: 28, maxWidth: 480 }}>
                {tipo.desc}
              </p>

              {/* Onde obter */}
              <div style={{
                padding: "18px 0", marginBottom: 22,
                borderTop: "1px solid var(--line)",
                borderBottom: "1px solid var(--line)",
              }}>
                <div className="eyebrow" style={{ marginBottom: 10 }}>{t("ONDE OBTER", "WHERE TO FIND")}</div>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                  {(WHERE_TO_FIND[r] || WHERE_TO_FIND.default).map((line, i) => (
                    <li key={i} style={{ display: "flex", gap: 10, alignItems: "baseline", fontSize: 14, color: "var(--ink-2)" }}>
                      <span style={{ fontFamily: "JetBrains Mono", color: "var(--ink-3)", fontSize: 11 }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{t(line, WHERE_TO_FIND_EN[line] || line)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Matchups */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--emerald)", marginBottom: 10, fontFamily: "JetBrains Mono", letterSpacing: ".1em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 6 }}>
                    ↑ {t("Forte contra", "Strong against")}
                  </div>
                  {tipo.forte.length === 0 ? (
                    <div style={{ fontSize: 13, color: "var(--ink-3)" }}>{t("Nenhum", "None")}</div>
                  ) : tipo.forte.map(f => {
                    const tt = window.TIPOS.find(x => x.nome === f);
                    return (
                      <button key={f} onClick={() => tt && go("galo", { tipo: tt.nome })} style={{
                        display: "flex", alignItems: "center", gap: 10,
                        marginBottom: 8, fontSize: 14, fontWeight: 500,
                        background: "none", border: 0, padding: 0, cursor: "pointer",
                        color: "var(--ink)", fontFamily: "inherit",
                      }}>
                        {tt && <div style={{ width: 20, height: 20, borderRadius: 4, background: `linear-gradient(135deg, ${tt.gradFrom}, ${tt.gradTo})`, display: "grid", placeItems: "center", color: tt.textColor, fontSize: 9, fontWeight: 700, fontFamily: "JetBrains Mono" }}>{f.slice(0, 2).toUpperCase()}</div>}
                        {f}
                      </button>
                    );
                  })}
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--rose)", marginBottom: 10, fontFamily: "JetBrains Mono", letterSpacing: ".1em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 6 }}>
                    ↓ {t("Fraco contra", "Weak against")}
                  </div>
                  {tipo.fraco.length === 0 ? (
                    <div style={{ fontSize: 13, color: "var(--ink-3)" }}>{t("Nenhum", "None")}</div>
                  ) : tipo.fraco.map(f => {
                    const tt = window.TIPOS.find(x => x.nome === f);
                    return (
                      <button key={f} onClick={() => tt && go("galo", { tipo: tt.nome })} style={{
                        display: "flex", alignItems: "center", gap: 10,
                        marginBottom: 8, fontSize: 14, fontWeight: 500,
                        background: "none", border: 0, padding: 0, cursor: "pointer",
                        color: "var(--ink)", fontFamily: "inherit",
                      }}>
                        {tt && <div style={{ width: 20, height: 20, borderRadius: 4, background: `linear-gradient(135deg, ${tt.gradFrom}, ${tt.gradTo})`, display: "grid", placeItems: "center", color: tt.textColor, fontSize: 9, fontWeight: 700, fontFamily: "JetBrains Mono" }}>{f.slice(0, 2).toUpperCase()}</div>}
                        {f}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Habilidades */}
      <section style={{ padding: isMobile ? "40px 0" : "60px 0", background: "var(--bg-2)" }}>
        <div className="container">
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "flex-end",
            flexDirection: isMobile ? "column" : "row",
            gap: 12, marginBottom: 28,
            paddingBottom: 20,
            borderBottom: "1px solid var(--line)",
          }}>
            <div>
              <div className="eyebrow">§ {t("HABILIDADES", "ABILITIES")}</div>
              <h2 className="h-display" style={{ fontSize: isMobile ? 32 : 48, margin: "8px 0 0", letterSpacing: "-.02em" }}>
                {t("4 ataques exclusivos", "4 exclusive attacks")}
              </h2>
            </div>
            <div style={{
              fontFamily: "JetBrains Mono", fontSize: 11,
              letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-3)",
            }}>
              {t("desbloqueia a partir do nível 5", "unlocks from level 5")}
            </div>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            gap: isMobile ? 14 : 18
          }}>
            {skills.map((s, i) => (
              <div key={s.nome} style={{
                background: "#fff", border: "1px solid var(--line)",
                borderRadius: 14, padding: isMobile ? 20 : 26,
                display: "grid", gridTemplateColumns: "auto 1fr", gap: 18,
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 10,
                  background: `linear-gradient(135deg, ${tipo.gradFrom}, ${tipo.gradTo})`,
                  color: tipo.textColor, display: "grid", placeItems: "center",
                  fontFamily: "JetBrains Mono", fontWeight: 700, fontSize: 14,
                  letterSpacing: ".04em",
                }}>{initials}</div>
                <div>
                  <div style={{
                    fontFamily: "JetBrains Mono", fontSize: 10,
                    letterSpacing: ".12em", color: "var(--ink-3)",
                    marginBottom: 4, textTransform: "uppercase",
                  }}>
                    SKILL · {String(i + 1).padStart(2, "0")}
                  </div>
                  <div style={{
                    fontFamily: "Bricolage Grotesque", fontWeight: 700,
                    fontSize: isMobile ? 22 : 26, marginBottom: 10, lineHeight: 1.1,
                    letterSpacing: "-.02em",
                  }}>
                    {s.nome}
                  </div>
                  <div style={{
                    display: "flex", gap: 18, marginBottom: 14,
                    fontSize: 13, color: "var(--ink-2)",
                  }}>
                    <div>
                      <span style={{ color: "var(--ink-3)", fontFamily: "JetBrains Mono", fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", marginRight: 6 }}>{t("MÍN", "MIN")}</span>
                      <span style={{ fontFamily: "JetBrains Mono", fontWeight: 700 }}>{s.min}</span>
                    </div>
                    <div style={{ width: 1, background: "var(--line)" }} />
                    <div>
                      <span style={{ color: "var(--ink-3)", fontFamily: "JetBrains Mono", fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", marginRight: 6 }}>{t("MÁX", "MAX")}</span>
                      <span style={{ fontFamily: "JetBrains Mono", fontWeight: 700 }}>{s.max}</span>
                    </div>
                  </div>
                  <div style={{
                    paddingTop: 14, borderTop: "1px solid var(--line)",
                    fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.5,
                  }}>
                    <span style={{ fontFamily: "JetBrains Mono", fontSize: 10, color: "var(--primary)", letterSpacing: ".1em", textTransform: "uppercase", marginRight: 8 }}>
                      {t("EFEITO", "EFFECT")}
                    </span>
                    {s.efeito}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outros tipos */}
      <section className="section-tight">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <h2 className="h-display" style={{ fontSize: isMobile ? 26 : 36, margin: 0, letterSpacing: "-.02em" }}>
              {t("Outros tipos", "Other types")}
            </h2>
            <button onClick={() => go("galos")} className="btn btn-ghost" style={{ padding: "8px 14px", fontSize: 13 }}>
              {t("Ver todos", "See all")}
              <ArrowIcon size={12} />
            </button>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(3, 1fr)" : "repeat(6, 1fr)",
            gap: 12
          }}>
            {others.slice(0, 6).map(tt => (
              <button key={tt.nome} onClick={() => { setIdx(window.TIPOS.findIndex(x => x.nome === tt.nome)); go("galo", { tipo: tt.nome }); }} style={{
                background: "none", border: 0, padding: 0, cursor: "pointer",
                textAlign: "left", display: "flex", flexDirection: "column", gap: 8,
              }}>
                <div style={{ fontSize: 10, fontFamily: "JetBrains Mono", color: "var(--ink-3)", letterSpacing: ".08em" }}>
                  {String(window.TIPOS.findIndex(x => x.nome === tt.nome) + 1).padStart(3, "0")} / {tt.nome.toUpperCase()}
                </div>
                <RoosterMark tipo={tt} size={isMobile ? 100 : 160} label={false} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div style={{ fontFamily: "Bricolage Grotesque", fontWeight: 700, fontSize: 16 }}>{tt.nome}</div>
                  <div className={`rarity-${tt.raridade}`} style={{ fontSize: 9, fontFamily: "JetBrains Mono", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--r)", fontWeight: 700 }}>
                    ★ {tt.raridade}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const WHERE_TO_FIND = {
  Comum:     ["Eggs comuns", "Galinheiro inicial", "Drops diários"],
  Raro:      ["Eggs raros", "Raids semanais", "Compra com Asura Coins"],
  Épico:     ["Raids de boss épicos", "Eventos sazonais", "Evolução de Raros"],
  Lendário:  ["Raids lendárias", "Eventos especiais", "Pity após 100 eggs"],
  Mítico:    ["Boss mítico (cooldown semanal)", "Torre — andar 50+", "Eventos limitados"],
  Sagrado:   ["Recompensa de torneio Top 3", "Evento sagrado mensal", "Drop ultra-raro de raid"],
  Divino:    ["Apenas em portais divinos", "Evento de aniversário do bot", "Sem chance de drop normal"],
  default:   ["Eggs comuns", "Drops diários"],
};

const WHERE_TO_FIND_EN = {
  "Eggs comuns": "Common eggs",
  "Galinheiro inicial": "Starter coop",
  "Drops diários": "Daily drops",
  "Eggs raros": "Rare eggs",
  "Raids semanais": "Weekly raids",
  "Compra com Asura Coins": "Buy with Asura Coins",
  "Raids de boss épicos": "Epic boss raids",
  "Eventos sazonais": "Seasonal events",
  "Evolução de Raros": "Evolution from Rare",
  "Raids lendárias": "Legendary raids",
  "Eventos especiais": "Special events",
  "Pity após 100 eggs": "Pity after 100 eggs",
  "Boss mítico (cooldown semanal)": "Mythic boss (weekly cooldown)",
  "Torre — andar 50+": "Tower — floor 50+",
  "Eventos limitados": "Limited events",
  "Recompensa de torneio Top 3": "Tournament Top 3 reward",
  "Evento sagrado mensal": "Monthly sacred event",
  "Drop ultra-raro de raid": "Ultra-rare raid drop",
  "Apenas em portais divinos": "Divine portals only",
  "Evento de aniversário do bot": "Bot's anniversary event",
  "Sem chance de drop normal": "No normal drop chance",
};

window.PageGalo = PageGalo;
