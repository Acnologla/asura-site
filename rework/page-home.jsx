/* HOME PAGE */
function PageHome({ go }) {
  return (
    <div data-screen-label="01 Home">
      <HomeHero go={go} />
      <HomeStats />
      <HomeFeatures />
      <HomeComandos />
      <HomeModos />
      <HomeRaridades go={go} />
      <HomeCTA go={go} />
    </div>
  );
}

function HomeHero({ go }) {
  const isMobile = useIsMobile();
  const t = useT();
  return (
    <section className="section" style={{ paddingTop: isMobile ? 32 : 60, paddingBottom: isMobile ? 48 : 80 }}>
      <div className="container" style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1.05fr 1fr",
        gap: isMobile ? 40 : 60,
        alignItems: "center"
      }}>
        <div>
          <div className="pill" style={{ marginBottom: isMobile ? 20 : 28 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--primary)", boxShadow: "0 0 0 4px rgba(105,56,239,.18)" }} />
            {t("v3.2 — Temporada Holograma já disponível", "v3.2 — Hologram Season now live")}
          </div>
          <h1 className="h-display" style={{ fontSize: isMobile ? 40 : 72, margin: "0 0 20px" }}>
            {t("Treine galos.", "Train roosters.")}<br/>
            {t("Domine arenas.", "Master arenas.")}<br/>
            <span style={{ color: "var(--primary)" }}>{t("Comande", "Rule")}</span>{" "}
            {t("seu servidor.", "your server.")}
          </h1>
          <p style={{ fontSize: isMobile ? 16 : 18, lineHeight: 1.55, color: "var(--ink-2)", maxWidth: 520, margin: "0 0 28px" }}>
            {t(
              "Asura Bot transforma seu Discord em uma rinha completa de galos com batalhas, raids, torneios automáticos e progressão diária. Mais de 2 milhões de galos treinados.",
              "Asura Bot turns your Discord into a complete rooster fighting arena with battles, raids, automatic tournaments and daily progression. Over 2 million roosters trained."
            )}
          </p>
          <div style={{ display: "flex", gap: 10, marginBottom: 28, flexDirection: isMobile ? "column" : "row" }}>
            <button className="btn btn-primary" style={{ padding: "14px 22px", fontSize: 15, justifyContent: "center" }}>
              <DiscordIcon size={18} />
              {t("Adicionar ao Discord", "Add to Discord")}
            </button>
            <button className="btn btn-ghost" style={{ padding: "14px 22px", fontSize: 15, justifyContent: "center" }} onClick={() => go("galos")}>
              {t("Ver galos", "See roosters")}
              <ArrowIcon />
            </button>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 16, color: "var(--ink-3)", fontSize: 12,
            flexWrap: "wrap", fontFamily: "JetBrains Mono", letterSpacing: ".06em",
          }}>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--emerald)" }} />
              {t("8.400+ SERVIDORES ATIVOS", "8,400+ ACTIVE SERVERS")}
            </span>
            <span>·</span>
            <span>{t("ZERO TAXA · 100% GRATUITO", "ZERO FEE · 100% FREE")}</span>
          </div>
        </div>
        <HeroVisual isMobile={isMobile} />
      </div>
    </section>
  );
}

function HeroVisual({ isMobile }) {
  const t = useT();
  const tipo = window.TIPOS[10]; // Plasma — sample
  return (
    <div style={{ position: "relative", paddingTop: isMobile ? 0 : 8 }}>
      {/* Spec strip — editorial metadata row */}
      <div style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "10px 0 18px",
        fontFamily: "JetBrains Mono, monospace",
        fontSize: 10, letterSpacing: ".14em",
        color: "var(--ink-3)", textTransform: "uppercase",
        borderBottom: "1px solid var(--line)",
        marginBottom: 18,
      }}>
        <span>FILE · 011</span>
        <span style={{ width: 4, height: 4, borderRadius: 999, background: "var(--ink-3)" }} />
        <span>{t("FICHA DO GALO", "ROOSTER FILE")}</span>
        <span style={{ marginLeft: "auto", color: "var(--primary)" }}>● {t("OBSERVADO", "OBSERVED")}</span>
      </div>

      {/* Rooster slot */}
      <div style={{ position: "relative" }}>
        <RoosterMark tipo={tipo} size={isMobile ? 320 : 480} ratio={1.05} label={false} />

        {/* Overlapping name block — bottom left */}
        <div style={{
          position: "absolute", left: -8, bottom: isMobile ? -16 : -22,
          padding: isMobile ? "10px 14px" : "12px 18px",
          background: "var(--ink)", color: "#fff",
          fontFamily: "Bricolage Grotesque", fontWeight: 700,
          fontSize: isMobile ? 22 : 30,
          letterSpacing: "-.02em",
          boxShadow: "var(--shadow)",
        }}>
          Plasmorin
        </div>

        {/* Side tag — rarity */}
        <div style={{
          position: "absolute", right: -10, top: 22,
          padding: "6px 10px",
          background: "#fff7e0", color: "#a17404",
          border: "1px solid #f5d77a",
          fontSize: 10, fontFamily: "JetBrains Mono",
          letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 700,
          transform: "rotate(2deg)",
          boxShadow: "var(--shadow-sm)",
        }}>
          ★ {t("SAGRADO", "SACRED")}
        </div>
      </div>

      {/* Caption — typographic, single line */}
      <div style={{
        marginTop: isMobile ? 30 : 40,
        paddingTop: 18,
        borderTop: "1px solid var(--line)",
        display: "flex", alignItems: "baseline",
        gap: 14, flexWrap: "wrap",
        fontFamily: "JetBrains Mono", fontSize: 11,
        letterSpacing: ".1em", textTransform: "uppercase",
        color: "var(--ink-3)",
      }}>
        <span>{t("TIPO", "TYPE")}</span>
        <span style={{ color: "var(--ink)", fontWeight: 600 }}>Plasma</span>
        <span style={{ width: 4, height: 4, borderRadius: 999, background: "var(--ink-3)" }} />
        <span>{t("CAPTURADO POR", "CAPTURED BY")}</span>
        <span style={{ color: "var(--ink)", fontWeight: 600 }}>@kohaku</span>
        <span style={{ marginLeft: "auto", color: "var(--primary)" }}>
          {t("VISTO 4 MIN ATRÁS", "SEEN 4 MIN AGO")}
        </span>
      </div>
    </div>
  );
}

function HomeStats() {
  const isMobile = useIsMobile();
  const t = useT();
  const stats = [
    { num: "8.4K+", label: t("Servidores ativos", "Active servers") },
    { num: "2.1M",  label: t("Galos treinados", "Roosters trained") },
    { num: "420K",  label: t("Batalhas / dia", "Battles / day") },
    { num: "24/7",  label: t("Eventos ao vivo", "Live events") },
  ];
  return (
    <section style={{ padding: "0 0 56px" }}>
      <div className="container">
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "flex-end",
          gap: isMobile ? 18 : 10,
          padding: "28px 0 6px",
          borderTop: "1px solid var(--line)",
        }}>
          <div style={{
            fontFamily: "JetBrains Mono", fontSize: 11,
            letterSpacing: ".18em", color: "var(--ink-3)",
            textTransform: "uppercase",
            paddingRight: isMobile ? 0 : 32,
            paddingBottom: isMobile ? 0 : 4,
          }}>
            {t("AO VIVO · ATUALIZADO HOJE", "LIVE · UPDATED TODAY")}
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
            gap: isMobile ? 20 : 40,
            flex: 1,
          }}>
            {stats.map((s, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{
                  fontFamily: "Bricolage Grotesque", fontWeight: 700,
                  fontSize: isMobile ? 36 : 52,
                  letterSpacing: "-.03em", lineHeight: 1,
                  color: "var(--ink)",
                }}>
                  {s.num}
                </div>
                <div style={{
                  fontSize: 12, color: "var(--ink-3)",
                  fontFamily: "JetBrains Mono",
                  letterSpacing: ".06em",
                }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeFeatures() {
  const isMobile = useIsMobile();
  const t = useT();
  const features = [
    {
      eyebrow: t("PRIMEIROS PASSOS", "GETTING STARTED"),
      title: t("Descubra seu primeiro galo", "Discover your first rooster"),
      desc: t(
        "Cada jogador começa com um galo único. Existem 7 raridades — do Comum ao Divino — e 16 tipos elementais com fraquezas e fortalezas próprias.",
        "Each player starts with a unique rooster. There are 7 rarities — from Common to Divine — and 16 elemental types with their own strengths and weaknesses."
      ),
      art: "rarity",
    },
    {
      eyebrow: t("PROGRESSÃO", "PROGRESSION"),
      title: t("Treine e evolua todo dia", "Train and evolve every day"),
      desc: t(
        "Use j!train para ganhar XP e Gold. Suba de nível, desbloqueie habilidades por tipo e evolua seu galo até as raridades mais altas.",
        "Use j!train to earn XP and Gold. Level up, unlock abilities by type and evolve your rooster up to the highest rarities."
      ),
      art: "training",
    },
    {
      eyebrow: t("COMPETIÇÃO", "COMPETITION"),
      title: t("Suba de rank na arena", "Climb the arena ranks"),
      desc: t(
        "Batalhas ranqueadas com matchmaking por Elo, torneios automáticos com Top 3, raids cooperativas com até 5 jogadores e Server Battle entre comunidades inteiras.",
        "Ranked battles with Elo matchmaking, automatic tournaments with Top 3, co-op raids up to 5 players and Server Battle between entire communities."
      ),
      art: "rank",
    },
  ];
  return (
    <section className="section" id="features">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: isMobile ? 40 : 60 }}>
          <div className="eyebrow">{t("COMO FUNCIONA", "HOW IT WORKS")}</div>
          <h2 className="h-display" style={{ fontSize: isMobile ? 32 : 56, margin: "12px 0 16px" }}>
            {t(<>Do <span style={{ color: "var(--primary)" }}>ovo</span> ao topo do<br/>ranking em 3 passos.</>,
               <>From <span style={{ color: "var(--primary)" }}>egg</span> to top of<br/>the ranks in 3 steps.</>)}
          </h2>
          <p style={{ fontSize: isMobile ? 15 : 17, color: "var(--ink-2)", maxWidth: 580, margin: "0 auto" }}>
            {t(
              "Um loop de jogo profundo direto no Discord. Sem cadastro, sem instalação — só comandos.",
              "A deep gameplay loop right inside Discord. No signup, no install — just commands."
            )}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? 14 : 20 }}>
          {features.map((f, i) => (
            <div key={i} className="card" style={{ padding: isMobile ? 22 : 28, display: "flex", flexDirection: "column", gap: 16 }}>
              <FeatureArt kind={f.art} />
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: "var(--primary-soft)", color: "var(--primary)",
                  display: "grid", placeItems: "center", fontFamily: "Bricolage Grotesque", fontWeight: 700,
                }}>{i+1}</div>
                <div className="eyebrow" style={{ fontSize: 11 }}>{f.eyebrow}</div>
              </div>
              <h3 style={{ fontFamily: "Bricolage Grotesque", fontWeight: 700, fontSize: isMobile ? 22 : 24, margin: 0, lineHeight: 1.15 }}>
                {f.title}
              </h3>
              <p style={{ color: "var(--ink-2)", fontSize: 14, lineHeight: 1.55, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureArt({ kind }) {
  const t = useT();
  if (kind === "rarity") {
    const rs = window.RARIDADES;
    return (
      <div style={{
        padding: "22px 24px", borderRadius: 14,
        background: "#fbfaff", border: "1px solid var(--line)",
        height: 180, display: "flex", flexDirection: "column", gap: 6, justifyContent: "center",
      }}>
        {rs.map((r, i) => (
          <div key={r} className={`rarity-${r}`} style={{
            display: "flex", alignItems: "center", gap: 12,
            fontFamily: "JetBrains Mono", fontSize: 11,
            color: i === 6 ? "var(--r)" : "var(--ink-2)",
            fontWeight: i === 6 ? 700 : 500,
          }}>
            <span style={{ color: "var(--ink-3)" }}>{String(i + 1).padStart(2, "0")}</span>
            <span style={{
              width: 6, height: 6, borderRadius: 999, background: "var(--r)",
            }} />
            <span style={{ letterSpacing: ".06em", textTransform: "uppercase" }}>{r}</span>
            {i === 6 && (
              <span style={{ marginLeft: "auto", fontSize: 9, color: "var(--r)", letterSpacing: ".12em" }}>
                ★ {t("MAIS RARO", "RAREST")}
              </span>
            )}
          </div>
        ))}
      </div>
    );
  }
  if (kind === "training") {
    return (
      <div style={{
        padding: "20px", borderRadius: 14,
        background: "#1a1620", color: "#e9e0f5",
        border: "1px solid #2a2333",
        height: 180, display: "flex", flexDirection: "column", justifyContent: "space-between",
        fontFamily: "JetBrains Mono", fontSize: 11.5, lineHeight: 1.55,
        position: "relative", overflow: "hidden",
      }}>
        <div>
          <div style={{ color: "#8a7fa8" }}>
            <span style={{ color: "var(--amber)" }}>›</span> j!train
          </div>
          <div style={{ marginTop: 8, color: "#cabfe0" }}>
            {t("Treinando", "Training")} <span style={{ color: "#fff", fontWeight: 600 }}>Plasmorin</span>…
          </div>
          <div style={{ marginTop: 4, color: "#8a7fa8" }}>
            ↳ +1.240 <span style={{ color: "var(--amber)" }}>XP</span>
          </div>
          <div style={{ color: "#8a7fa8" }}>
            ↳ +850 <span style={{ color: "var(--emerald)" }}>{t("ouro", "gold")}</span>
          </div>
        </div>
        <div style={{ color: "#6e6587", fontSize: 10 }}>
          {t("treinos restantes hoje", "trainings left today")}: <span style={{ color: "#fff" }}>27 / 35</span>
        </div>
        <div style={{
          position: "absolute", right: -20, top: -20, width: 100, height: 100,
          background: "radial-gradient(circle, rgba(240,165,0,.18), transparent 70%)",
          pointerEvents: "none",
        }} />
      </div>
    );
  }
  if (kind === "rank") {
    return (
      <div style={{
        padding: "20px 24px", borderRadius: 14,
        background: "linear-gradient(135deg, #e6f5ee 0%, #c5e9d4 100%)",
        border: "1px solid #a8d9bc",
        height: 180,
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        position: "relative",
      }}>
        <div style={{
          fontFamily: "JetBrains Mono", fontSize: 10,
          letterSpacing: ".14em", textTransform: "uppercase",
          color: "#155a3c",
        }}>
          {t("RANKED · SEMANA 14", "RANKED · WEEK 14")}
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
          <div style={{
            fontFamily: "Bricolage Grotesque", fontWeight: 700,
            fontSize: 64, color: "var(--emerald)", lineHeight: 1,
            letterSpacing: "-.04em",
          }}>
            #1
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <div style={{ fontFamily: "Bricolage Grotesque", fontWeight: 700, fontSize: 18, color: "#0a3a25" }}>
              {t("Top do servidor", "Server top")}
            </div>
            <div style={{ fontSize: 12, color: "#155a3c" }}>
              {t("recompensa em Asura Coins", "reward in Asura Coins")}
            </div>
          </div>
        </div>

        <div style={{
          display: "flex", justifyContent: "space-between",
          fontFamily: "JetBrains Mono", fontSize: 10,
          color: "#155a3c", letterSpacing: ".08em", textTransform: "uppercase",
        }}>
          <span>2.840 ELO</span>
          <span style={{ color: "var(--emerald)" }}>↑ +12</span>
        </div>
      </div>
    );
  }
  return null;
}

function HomeComandos() {
  const isMobile = useIsMobile();
  const t = useT();
  return (
    <section className="section" id="comandos" style={{ background: "var(--bg-2)", padding: isMobile ? "56px 0" : "96px 0" }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 32 : 80,
          alignItems: "center"
        }}>
          <div>
            <div className="eyebrow">{t("COMANDOS", "COMMANDS")}</div>
            <h2 className="h-display" style={{ fontSize: isMobile ? 32 : 48, margin: "12px 0 20px" }}>
              {t(<>Tudo controlado<br/>com um <span style={{ color: "var(--primary)" }}>j!</span></>,
                 <>Everything runs<br/>on one <span style={{ color: "var(--primary)" }}>j!</span></>)}
            </h2>
            <p style={{ color: "var(--ink-2)", fontSize: isMobile ? 15 : 16, lineHeight: 1.55, marginBottom: 24, maxWidth: 440 }}>
              {t(
                "Mais de 80 comandos cobrem todos os sistemas do jogo. Treino, batalha, economia, missões, raids — tudo em texto, com respostas ricas e botões interativos.",
                "Over 80 commands cover every system in the game. Training, battle, economy, missions, raids — all in text with rich responses and interactive buttons."
              )}
            </p>
            <button className="btn btn-dark">
              {t("Ver documentação completa", "View full documentation")}
              <ArrowIcon />
            </button>
          </div>
          <div style={{ display: "grid", gap: 10 }}>
            {window.COMANDOS.map((c, i) => (
              <div key={c.cmd} className="card" style={{
                padding: isMobile ? "14px 16px" : "16px 20px",
                display: "flex", alignItems: "center", gap: isMobile ? 12 : 16,
                transition: "transform .15s",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateX(4px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateX(0)"}>
                <span className="cmd" style={{ minWidth: isMobile ? 80 : 90, textAlign: "center", flexShrink: 0 }}>{c.cmd}</span>
                <span style={{ fontSize: isMobile ? 13 : 14, color: "var(--ink-2)", flex: 1 }}>{t(c.desc, COMMAND_EN[c.cmd] || c.desc)}</span>
                <ArrowIcon size={14} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const COMMAND_EN = {
  "j!galo":     "See your rooster, type and rarity",
  "j!train":    "Train your rooster and gain XP + Gold",
  "j!mission":  "View your active daily missions",
  "j!raid":     "Form a team and face cooperative bosses",
  "j!money":    "View your Gold, AsuraCoins, UserXP and trainings",
  "j!upgrades": "See and manage your rooster's upgrades",
};

function HomeModos() {
  const isMobile = useIsMobile();
  const t = useT();
  const [hovered, setHovered] = useState(0);
  const MODOS_EN = {
    "Arena": "Battle other players with win/loss daily limits.",
    "Ranqueada": "Climb up the ranks and earn Elo in official battles.",
    "Raid": "Face bosses with up to 5 cooperative players.",
    "Torre": "Weekly mode with progressive floors and growing rewards.",
    "Torneio": "Automatic events with rewards for the Top 3.",
    "Portal": "Group events with time limit and unique drops.",
    "História": "Episodes with progression and star-based rewards.",
    "Challenge": "Periodic challenges with exclusive prizes.",
    "Boss": "Bosses with multiple forms and long cooldown.",
    "Survival": "Survive as long as you can with growing rewards.",
    "Server Battle": "Automatic event between entire servers.",
  };
  const MODOS_NAME_EN = {
    "Ranqueada": "Ranked", "Torre": "Tower", "Torneio": "Tournament",
    "História": "Story", "Boss": "Boss", "Survival": "Survival",
    "Server Battle": "Server Battle",
  };
  const TAGS = {
    "Arena": "PVP", "Ranqueada": "PVP", "Raid": "CO-OP", "Torre": "WEEKLY",
    "Torneio": "AUTO", "Portal": "TIMED", "História": "SOLO", "Challenge": "DAILY",
    "Boss": "PVE", "Survival": "ENDLESS", "Server Battle": "SERVER",
  };
  return (
    <section className="section" id="modos">
      <div className="container">
        {/* Editorial header — title left, lead right */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.1fr 1fr",
          gap: isMobile ? 16 : 60,
          alignItems: "end",
          marginBottom: isMobile ? 36 : 56,
          paddingBottom: 24,
          borderBottom: "1px solid var(--line)",
        }}>
          <div>
            <div style={{
              fontFamily: "JetBrains Mono", fontSize: 11,
              letterSpacing: ".18em", color: "var(--ink-3)",
              textTransform: "uppercase", marginBottom: 14,
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <span>§ 03</span>
              <span style={{ width: 16, height: 1, background: "var(--ink-3)" }} />
              <span>{t("MODOS DE JOGO", "GAME MODES")}</span>
            </div>
            <h2 className="h-display" style={{ fontSize: isMobile ? 36 : 64, margin: 0, lineHeight: 1 }}>
              {t("Onze modos", "Eleven modes")}<br/>
              <span style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ink-3)" }}>
                {t("um servidor.", "one server.")}
              </span>
            </h2>
          </div>
          <p style={{
            fontSize: isMobile ? 15 : 17, color: "var(--ink-2)",
            lineHeight: 1.55, margin: 0, maxWidth: 420,
          }}>
            {t(
              "Solo, cooperativo ou competitivo. PVP rankeado, raids até 5, torres semanais, eventos automáticos. Sempre há algo acontecendo.",
              "Solo, co-op or competitive. Ranked PVP, 5-player raids, weekly towers, auto events. Something is always going on."
            )}
          </p>
        </div>

        {/* Editorial list */}
        <div>
          {window.MODOS.map((m, i) => (
            <div key={m.nome}
              onMouseEnter={() => setHovered(i)}
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "30px 1fr 60px" : "60px 1.8fr 2.2fr 90px",
                gap: isMobile ? 12 : 24,
                alignItems: "baseline",
                padding: isMobile ? "16px 0" : "22px 0",
                borderTop: "1px solid var(--line)",
                borderBottom: i === window.MODOS.length - 1 ? "1px solid var(--line)" : "none",
                cursor: "pointer",
                position: "relative",
              }}>
              {/* number */}
              <div style={{
                fontFamily: "JetBrains Mono", fontSize: isMobile ? 11 : 13,
                color: "var(--ink-3)", letterSpacing: ".06em",
              }}>
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* name */}
              <div style={{
                fontFamily: "Bricolage Grotesque", fontWeight: 700,
                fontSize: isMobile ? 22 : 36, letterSpacing: "-.02em",
                color: hovered === i ? "var(--primary)" : "var(--ink)",
                transition: "color .2s",
                display: "flex", alignItems: "center", gap: 14,
              }}>
                {t(m.nome, MODOS_NAME_EN[m.nome] || m.nome)}
                {!isMobile && hovered === i && (
                  <ArrowIcon size={20} />
                )}
              </div>

              {/* description — desktop only */}
              {!isMobile && (
                <div style={{
                  fontSize: 14, color: "var(--ink-2)", lineHeight: 1.5,
                  maxWidth: 460,
                }}>
                  {t(m.desc, MODOS_EN[m.nome] || m.desc)}
                </div>
              )}

              {/* tag */}
              <div style={{
                fontFamily: "JetBrains Mono", fontSize: 10,
                letterSpacing: ".12em", textTransform: "uppercase",
                color: "var(--ink-3)", textAlign: "right",
                fontWeight: 600,
              }}>
                {TAGS[m.nome]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeRaridades({ go }) {
  const isMobile = useIsMobile();
  const t = useT();
  return (
    <section style={{ padding: isMobile ? "60px 0" : "100px 0", background: "var(--ink)", color: "#fff", position: "relative", overflow: "hidden" }}>
      {/* Single subtle horizon line */}
      <div style={{
        position: "absolute", left: 0, right: 0, top: "50%",
        height: 1, background: "rgba(255,255,255,.06)",
      }} />

      <div className="container">
        {/* Top spec row — metadata */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 14,
          fontFamily: "JetBrains Mono", fontSize: 10,
          letterSpacing: ".14em", textTransform: "uppercase",
          color: "rgba(255,255,255,.4)", marginBottom: 28,
        }}>
          <span>§ 04 / {t("CATÁLOGO", "CATALOG")}</span>
          <span>·</span>
          <span>16 {t("TIPOS", "TYPES")}</span>
          <span>·</span>
          <span>7 {t("RARIDADES", "RARITIES")}</span>
          <span>·</span>
          <span style={{ color: "var(--amber)" }}>{t("ATUALIZADO V3.2", "UPDATED V3.2")}</span>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.1fr 1fr",
          gap: isMobile ? 36 : 80,
          alignItems: "start",
          marginBottom: isMobile ? 36 : 56,
        }}>
          <div>
            <h2 className="h-display" style={{
              fontSize: isMobile ? 44 : 80, margin: "0 0 20px",
              color: "#fff", lineHeight: .98, letterSpacing: "-.03em",
            }}>
              {t("Cada galo", "Every rooster")}<br/>
              <span style={{ fontStyle: "italic", fontWeight: 500, color: "var(--amber)" }}>{t("tem sua história.", "has its story.")}</span>
            </h2>
          </div>
          <div>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: isMobile ? 15 : 16, lineHeight: 1.6, margin: "0 0 22px", maxWidth: 440 }}>
              {t(
                "Do simples Galo Normal ao Divino, cada raridade entrega atributos base mais poderosos. Combine tipos para criar contra-counters e dominar o meta da sua arena.",
                "From the simple Normal Rooster to the Divine, each rarity delivers more powerful base attributes. Combine types to build counters and dominate your arena's meta."
              )}
            </p>
            <button className="btn" style={{ background: "var(--amber)", color: "#1a0a3a", padding: "14px 22px", fontWeight: 700 }} onClick={() => go("galos")}>
              {t("Explorar todos os tipos", "Explore all types")}
              <ArrowIcon />
            </button>
          </div>
        </div>

        {/* Catalog strip */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(6, 1fr)",
          gap: isMobile ? 10 : 14,
          paddingTop: isMobile ? 16 : 24,
          borderTop: "1px solid rgba(255,255,255,.1)",
        }}>
          {window.TIPOS.slice(0, isMobile ? 4 : 6).map((tipo, i) => (
            <button key={tipo.nome} onClick={() => go("galo", { tipo: tipo.nome })} style={{
              background: "transparent", border: 0, padding: 0,
              cursor: "pointer", textAlign: "left",
              display: "flex", flexDirection: "column", gap: 10,
            }}>
              {/* index */}
              <div style={{
                fontFamily: "JetBrains Mono", fontSize: 10,
                color: "rgba(255,255,255,.4)", letterSpacing: ".12em",
              }}>
                {String(i + 1).padStart(3, "0")} / {tipo.nome.toUpperCase()}
              </div>
              <RoosterMark tipo={tipo} size={isMobile ? 140 : 180} label={false} ratio={1.0} />
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "baseline",
                paddingTop: 2,
              }}>
                <div style={{ fontFamily: "Bricolage Grotesque", fontWeight: 700, fontSize: 18, color: "#fff" }}>
                  {tipo.nome}
                </div>
                <div style={{ fontSize: 10, fontFamily: "JetBrains Mono", color: "rgba(255,255,255,.4)" }}>
                  {tipo.forte.length ? `↑${tipo.forte.length}` : "—"} · {tipo.fraco.length ? `↓${tipo.fraco.length}` : "—"}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeCTA({ go }) {
  const isMobile = useIsMobile();
  const t = useT();
  return (
    <section style={{ padding: "40px 0 80px" }}>
      <div className="container">
        <div className="card" style={{
          padding: isMobile ? "40px 24px" : 56, textAlign: "center",
          background: "#fff",
          border: "1px solid var(--line)",
        }}>
          <div className="eyebrow">{t("PRONTO?", "READY?")}</div>
          <h2 className="h-display" style={{ fontSize: isMobile ? 32 : 56, margin: "12px 0 16px" }}>
            {t(<>Adicione o Asura ao<br/>seu servidor em <span style={{ color: "var(--primary)" }}>30 segundos</span>.</>,
               <>Add Asura to your<br/>server in <span style={{ color: "var(--primary)" }}>30 seconds</span>.</>)}
          </h2>
          <p style={{ fontSize: isMobile ? 15 : 16, color: "var(--ink-2)", maxWidth: 500, margin: "0 auto 28px" }}>
            {t(
              "Gratuito para usar. Apoie o projeto e desbloqueie benefícios exclusivos quando quiser.",
              "Free to use. Support the project and unlock exclusive benefits whenever you want."
            )}
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexDirection: isMobile ? "column" : "row" }}>
            <button className="btn btn-primary" style={{ padding: "14px 24px", fontSize: 15, justifyContent: "center" }}>
              <DiscordIcon size={18} />
              {t("Adicionar ao Discord", "Add to Discord")}
            </button>
            <button className="btn btn-ghost" style={{ padding: "14px 24px", fontSize: 15, justifyContent: "center" }} onClick={() => go("apoiar")}>
              {t("Ver planos de apoio", "See support plans")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

window.PageHome = PageHome;
