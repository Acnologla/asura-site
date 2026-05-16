/* APOIAR (DONATION) PAGE */
function PageApoiar({ go }) {
  const isMobile = useIsMobile();
  const t = useT();
  const [periodo, setPeriodo] = useState("mensal");

  return (
    <div data-screen-label="04 Apoiar">
      {/* Hero */}
      <section style={{ padding: isMobile ? "32px 0 24px" : "60px 0 40px" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="pill" style={{ marginBottom: 20, background: "#fff4d1", borderColor: "#f5d77a", color: "#a17404" }}>
            <span>♛</span>
            {t("Apoie o projeto", "Support the project")}
          </div>
          <h1 className="h-display" style={{ fontSize: isMobile ? 40 : 64, margin: "0 0 16px" }}>
            {t(<>Escolha como você quer<br/><span style={{ color: "var(--primary)" }}>dominar</span> o jogo.</>,
               <>Choose how you want<br/>to <span style={{ color: "var(--primary)" }}>dominate</span> the game.</>)}
          </h1>
          <p style={{ fontSize: isMobile ? 16 : 18, color: "var(--ink-2)", maxWidth: 600, margin: "0 auto 28px" }}>
            {t(
              "Apoie o desenvolvimento do bot e desbloqueie benefícios exclusivos para acelerar seu progresso. Cancele quando quiser.",
              "Support the bot's development and unlock exclusive benefits to accelerate your progress. Cancel anytime."
            )}
          </p>

          {/* Toggle mensal / trimestral */}
          <div style={{ display: "inline-flex", padding: 4, borderRadius: 999, background: "#fff", border: "1px solid var(--line)", boxShadow: "var(--shadow-sm)" }}>
            <button onClick={() => setPeriodo("mensal")} style={{
              padding: isMobile ? "9px 16px" : "10px 22px", borderRadius: 999, border: 0, cursor: "pointer",
              background: periodo === "mensal" ? "var(--ink)" : "transparent",
              color: periodo === "mensal" ? "#fff" : "var(--ink-2)",
              fontWeight: 600, fontSize: 13, fontFamily: "inherit",
            }}>{t("Mensal", "Monthly")}</button>
            <button onClick={() => setPeriodo("trimestral")} style={{
              padding: isMobile ? "9px 16px" : "10px 22px", borderRadius: 999, border: 0, cursor: "pointer",
              background: periodo === "trimestral" ? "var(--ink)" : "transparent",
              color: periodo === "trimestral" ? "#fff" : "var(--ink-2)",
              fontWeight: 600, fontSize: 13, fontFamily: "inherit",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              {t("Trimestral", "Quarterly")}
              <span style={{ fontSize: 10, padding: "3px 7px", borderRadius: 999, background: "var(--emerald)", color: "#fff" }}>{t("até 20% OFF", "up to 20% OFF")}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section style={{ padding: isMobile ? "20px 0 40px" : "32px 0 60px" }}>
        <div className="container">
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? 14 : 18,
          }}>
            {window.PLANOS.map(p => (
              <PlanCard key={p.nome} plano={p} periodo={periodo} isMobile={isMobile} />
            ))}
          </div>
        </div>
      </section>

      {/* Avulsos */}
      <section className="section-tight" style={{ background: "var(--bg-2)", padding: isMobile ? "48px 0" : "80px 0" }}>
        <div className="container">
          <div style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "flex-end",
            gap: 14, marginBottom: 32,
          }}>
            <div>
              <div className="eyebrow">{t("COMPRAS AVULSAS", "ONE-TIME PURCHASES")}</div>
              <h2 className="h-display" style={{ fontSize: isMobile ? 30 : 44, margin: "8px 0 8px" }}>
                {t("Recursos individuais", "Individual resources")}
              </h2>
              <p style={{ fontSize: 15, color: "var(--ink-2)", margin: 0, maxWidth: 500 }}>
                {t(
                  "Não quer assinar? Compre o que precisa, quando precisar. Itens entregues instantaneamente na sua conta.",
                  "Don't want a subscription? Buy what you need, when you need. Items delivered instantly to your account."
                )}
              </p>
            </div>
            <div className="chip">{t("Sem renovação", "No renewal")}</div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? 12 : 16,
          }}>
            {window.RECURSOS_AVULSOS.map(r => (
              <RecursoCard key={r.nome} recurso={r} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-tight">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div className="eyebrow">{t("COMPARAR", "COMPARE")}</div>
            <h2 className="h-display" style={{ fontSize: isMobile ? 30 : 44, margin: "8px 0 8px" }}>
              {t("Tudo que você ganha", "Everything you get")}
            </h2>
          </div>
          {isMobile ? <PlanCompareMobile /> : <PlanCompare />}
        </div>
      </section>

      {/* Por que doar */}
      <PorQueDoar />

      {/* FAQ */}
      <section className="section-tight">
        <div className="container">
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1.5fr",
            gap: isMobile ? 24 : 60
          }}>
            <div>
              <div className="eyebrow">{t("PERGUNTAS FREQUENTES", "FREQUENTLY ASKED")}</div>
              <h2 className="h-display" style={{ fontSize: isMobile ? 30 : 40, margin: "8px 0 16px" }}>
                {t("Ainda na dúvida?", "Still wondering?")}
              </h2>
              <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.6 }}>
                {t(
                  "Nossa equipe está sempre online no servidor oficial do Discord para tirar dúvidas, oferecer suporte e ouvir sugestões.",
                  "Our team is always online on the official Discord server to answer questions, offer support and listen to suggestions."
                )}
              </p>
              <button className="btn discord" style={{ marginTop: 20, padding: "12px 20px" }}>
                <DiscordIcon size={16} />
                {t("Entrar no Discord oficial", "Join official Discord")}
              </button>
            </div>
            <FAQ />
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─────────── PLAN CARD ─────────── */

function PlanCard({ plano, periodo, isMobile }) {
  const t = useT();
  const isDestaque = plano.destaque;
  const preco = periodo === "mensal" ? plano.preco : plano.trimestral.preco;
  const off = plano.trimestral.off;

  // Translated benefits
  const BENEF_EN = {
    "Ouro extra e XP extra por treino": "Extra gold and XP per training",
    "Trocar o nome do galo de graça": "Free rooster name change",
    "Bônus adicional no comando daily": "Extra bonus on daily command",
    "Chance extra para conseguir chaves": "Extra chance to get keys",
    "XP e money extra no galinheiro": "Extra XP and money on the coop",
    "Bônus de xp no egg": "XP bonus on egg",
    "Consumíveis duram 30% a mais": "Consumables last 30% longer",
    "35 treinos extras por dia": "35 extra trainings per day",
    "Todas as vantagens do Prime": "All Prime benefits",
    "85 treinos extras por dia": "85 extra trainings per day",
    "XP extra no passe de batalha": "Extra XP on battle pass",
    "Conteúdo exclusivo no passe": "Exclusive battle pass content",
    "Mais Asura Coins ao vender galos": "More Asura Coins when selling roosters",
    "Bônus na torre e nas raids": "Tower and raid bonuses",
    "XP extra para seu pet (pombo)": "Extra XP for your pet (pigeon)",
    "Bônus de XP e gold na survival": "XP and gold bonus on survival",
    "Todas as vantagens do VIP": "All VIP benefits",
    "145 treinos extras por dia": "145 extra trainings per day",
    "Usar qualquer imagem como background": "Use any image as background",
    "Utilizar background gifs": "Use animated GIF backgrounds",
    "Limite de givemoney 6× maior": "Givemoney limit 6× larger",
    "50% de XP e money extra nos contratos": "50% extra XP and money on contracts",
    "Badge exclusiva": "Exclusive badge",
    "Prioridade no suporte": "Priority support",
  };

  let bgGradient, ink, accent, btnStyle, chipStyle;
  if (plano.cor === "emerald") {
    bgGradient = "linear-gradient(160deg, #1ed687 0%, #0e9b65 100%)";
    ink = "#fff"; accent = "#cffce6";
    btnStyle = { background: "#fff", color: "#0a6a45" };
    chipStyle = { background: "rgba(255,255,255,.2)", color: "#fff", borderColor: "rgba(255,255,255,.25)" };
  } else if (plano.cor === "primary") {
    bgGradient = "linear-gradient(160deg, #7c4dff 0%, #4a1fd1 100%)";
    ink = "#fff"; accent = "#e2d4ff";
    btnStyle = { background: "#fff", color: "var(--primary-deep)" };
    chipStyle = { background: "rgba(255,255,255,.2)", color: "#fff", borderColor: "rgba(255,255,255,.25)" };
  } else {
    bgGradient = "linear-gradient(160deg, #1a0a3a 0%, #2d1066 50%, #0a0418 100%)";
    ink = "#fff"; accent = "#fbd34a";
    btnStyle = { background: "var(--amber)", color: "#1a0a3a" };
    chipStyle = { background: "rgba(251,179,8,.2)", color: "var(--amber)", borderColor: "rgba(251,179,8,.35)" };
  }

  return (
    <div className="card" style={{
      padding: 0,
      overflow: "hidden",
      position: "relative",
      transform: !isMobile && isDestaque ? "translateY(-12px)" : "none",
      boxShadow: isDestaque ? "var(--shadow-lg)" : "var(--shadow-sm)",
      borderColor: isDestaque ? "transparent" : "var(--line)",
    }}>
      {isDestaque && (
        <div style={{
          position: "absolute", top: 18, right: 18, zIndex: 2,
          background: "var(--amber)", color: "#000",
          padding: "4px 10px", borderRadius: 999,
          fontSize: 11, fontWeight: 700,
          fontFamily: "JetBrains Mono", letterSpacing: ".08em", textTransform: "uppercase",
        }}>
          ★ {t("Mais popular", "Most popular")}
        </div>
      )}

      <div style={{
        background: bgGradient,
        color: ink, padding: "32px 28px 28px",
        position: "relative", overflow: "hidden",
      }}>
        <svg width="180" height="180" viewBox="0 0 180 180" style={{ position: "absolute", top: -40, right: -40, opacity: .12 }}>
          <circle cx="90" cy="90" r="70" stroke={ink} strokeWidth="1" fill="none" />
          <circle cx="90" cy="90" r="50" stroke={ink} strokeWidth="1" fill="none" />
          <circle cx="90" cy="90" r="30" stroke={ink} strokeWidth="1" fill="none" />
        </svg>

        <div style={{ fontSize: 28, marginBottom: 8 }}>{plano.icone}</div>
        <div style={{ fontFamily: "Bricolage Grotesque", fontWeight: 700, fontSize: 32, marginBottom: 4 }}>
          {plano.nome}
        </div>
        <div style={{ fontSize: 13, color: accent, marginBottom: 24 }}>
          {t(plano.tagline,
             plano.cor === "emerald" ? "Essential benefits" :
             plano.cor === "primary" ? "All benefits" : "Definitive premium experience")}
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
          <div style={{ fontFamily: "Bricolage Grotesque", fontWeight: 700, fontSize: 56, lineHeight: 1, letterSpacing: "-.02em" }}>
            R${preco}
          </div>
          <div style={{ fontSize: 14, color: accent }}>/ {periodo === "mensal" ? t("mês", "month") : t("trimestre", "quarter")}</div>
          {periodo === "trimestral" && (
            <span className="chip" style={{ ...chipStyle, marginLeft: 6, fontSize: 10 }}>{off}</span>
          )}
        </div>
      </div>

      <div style={{ padding: 24, background: "#fff" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
          {plano.beneficios.map((b, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.45 }}>
              <div style={{ flexShrink: 0, marginTop: 1, width: 18, height: 18, borderRadius: 999, background: plano.cor === "emerald" ? "var(--emerald-soft)" : plano.cor === "primary" ? "var(--primary-soft)" : "var(--amber-soft)", display: "grid", placeItems: "center" }}>
                <CheckIcon size={11} color={plano.cor === "emerald" ? "var(--emerald)" : plano.cor === "primary" ? "var(--primary)" : "#c08400"} />
              </div>
              {t(b, BENEF_EN[b] || b)}
            </div>
          ))}
        </div>

        <button className="btn" style={{
          ...btnStyle,
          width: "100%", padding: "14px 0", fontSize: 14, fontWeight: 700,
          boxShadow: "0 4px 12px -4px rgba(0,0,0,.2)",
        }}>
          {t("Assinar", "Subscribe to")} {plano.nome}
        </button>

        <div style={{ marginTop: 14, fontSize: 11, color: "var(--ink-3)", textAlign: "center", fontFamily: "JetBrains Mono" }}>
          PIX · {t("Cartão", "Card")} · PayPal · Mercado Pago
        </div>
      </div>
    </div>
  );
}

/* ─────────── INDIVIDUAL RECURSO CARD ─────────── */

function RecursoCard({ recurso }) {
  const t = useT();
  const NAME_EN = {
    "Dinheiro": "Money", "XP": "XP", "Asura Coins": "Asura Coins",
    "UserXP": "UserXP", "Resets": "Resets", "Chaves": "Keys",
  };
  const QTD_EN = {
    "20.000 Moedas": "20,000 Coins",
    "12.000 XP": "12,000 XP",
    "1 Asura Coin": "1 Asura Coin",
    "2.000 UserXP": "2,000 UserXP",
    "1 Reset de Galo": "1 Rooster Reset",
    "10 Chaves Raras": "10 Rare Keys",
  };
  return (
    <div className="card" style={{ padding: 0, overflow: "hidden", display: "flex" }}>
      <div style={{
        width: 100,
        background: `linear-gradient(160deg, ${recurso.gradient[0]} 0%, ${recurso.gradient[1]} 100%)`,
        display: "grid", placeItems: "center", color: "#fff",
        fontFamily: "Bricolage Grotesque", fontWeight: 700, fontSize: 44,
        flexShrink: 0,
      }}>
        {recurso.icone}
      </div>
      <div style={{ flex: 1, padding: "18px 20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "Bricolage Grotesque", fontWeight: 700, fontSize: 18, marginBottom: 2 }}>
            {t("Compra de", "Buy")} {t(recurso.nome, NAME_EN[recurso.nome] || recurso.nome)}
          </div>
          <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{t(recurso.qtd, QTD_EN[recurso.qtd] || recurso.qtd)}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
          <div>
            <div style={{ fontFamily: "Bricolage Grotesque", fontWeight: 700, fontSize: 22, color: "var(--primary)", lineHeight: 1 }}>
              R${recurso.preco}
            </div>
            <div style={{ fontSize: 10, color: "var(--ink-3)", fontFamily: "JetBrains Mono", marginTop: 2 }}>{t("UNIDADE", "UNIT")}</div>
          </div>
          <button className="btn btn-primary" style={{ padding: "10px 18px", fontSize: 13 }}>
            {t("Comprar", "Buy")}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────── COMPARE TABLE (desktop) ─────────── */

function PlanCompare() {
  const t = useT();
  const rows = [
    [t("Treinos extras por dia", "Extra trainings per day"),       "+35",  "+85",  "+145"],
    [t("XP extra por treino", "Extra XP per training"),            "+15%", "+25%", "+40%"],
    [t("Ouro extra por treino", "Extra gold per training"),        "+15%", "+25%", "+40%"],
    [t("Bônus em raids", "Raid bonus"),                             "✓",    "✓",    "✓"],
    [t("Bônus no passe de batalha", "Battle pass bonus"),           "—",    "✓",    "✓"],
    [t("Background customizado", "Custom background"),              "—",    "—",    "✓"],
    [t("Background animado (GIF)", "Animated background (GIF)"),    "—",    "—",    "✓"],
    [t("Givemoney aumentado", "Increased givemoney"),               "2×",   "3×",   "6×"],
    [t("Badge exclusiva", "Exclusive badge"),                        "—",    "—",    "✓"],
    [t("Prioridade no suporte", "Priority support"),                "—",    "—",    "✓"],
  ];
  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", background: "var(--bg-2)", borderBottom: "1px solid var(--line)" }}>
        <div style={{ padding: "16px 20px", fontSize: 12, fontWeight: 700, color: "var(--ink-3)", letterSpacing: ".1em", textTransform: "uppercase" }}>{t("RECURSO", "FEATURE")}</div>
        {["Prime", "VIP", "Royal"].map((p, i) => (
          <div key={p} style={{ padding: "16px 20px", textAlign: "center", borderLeft: "1px solid var(--line)", fontFamily: "Bricolage Grotesque", fontWeight: 700, fontSize: 16, color: i === 0 ? "var(--emerald)" : i === 1 ? "var(--primary)" : "var(--amber)" }}>
            {p}
          </div>
        ))}
      </div>
      {rows.map((row, i) => (
        <div key={i} style={{
          display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr",
          borderBottom: i < rows.length - 1 ? "1px solid var(--line)" : "none",
          background: i % 2 ? "#fff" : "#fbfaff",
        }}>
          <div style={{ padding: "14px 20px", fontSize: 13.5, color: "var(--ink-2)" }}>{row[0]}</div>
          {row.slice(1).map((val, j) => (
            <div key={j} style={{
              padding: "14px 20px", textAlign: "center",
              borderLeft: "1px solid var(--line)",
              fontFamily: "JetBrains Mono", fontWeight: 600, fontSize: 13,
              color: val === "—" ? "var(--ink-3)" : val === "✓" ? "var(--emerald)" : "var(--ink)",
            }}>
              {val}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ─────────── COMPARE TABLE (mobile, accordion-like) ─────────── */

function PlanCompareMobile() {
  const t = useT();
  const data = [
    { plan: "Prime", color: "var(--emerald)", rows: [
      [t("Treinos extras / dia", "Extra trainings / day"), "+35"],
      [t("XP extra por treino", "Extra XP per training"), "+15%"],
      [t("Ouro extra por treino", "Extra gold per training"), "+15%"],
      [t("Givemoney", "Givemoney"), "2×"],
    ]},
    { plan: "VIP", color: "var(--primary)", rows: [
      [t("Treinos extras / dia", "Extra trainings / day"), "+85"],
      [t("XP extra por treino", "Extra XP per training"), "+25%"],
      [t("Ouro extra por treino", "Extra gold per training"), "+25%"],
      [t("Bônus no passe de batalha", "Battle pass bonus"), "✓"],
      [t("Givemoney", "Givemoney"), "3×"],
    ]},
    { plan: "Royal", color: "var(--amber)", rows: [
      [t("Treinos extras / dia", "Extra trainings / day"), "+145"],
      [t("XP extra por treino", "Extra XP per training"), "+40%"],
      [t("Ouro extra por treino", "Extra gold per training"), "+40%"],
      [t("Background customizado", "Custom background"), "✓"],
      [t("Background animado", "Animated background"), "✓"],
      [t("Badge exclusiva", "Exclusive badge"), "✓"],
      [t("Givemoney", "Givemoney"), "6×"],
      [t("Suporte prioritário", "Priority support"), "✓"],
    ]},
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {data.map(d => (
        <div key={d.plan} className="card" style={{ padding: 18 }}>
          <div style={{ fontFamily: "Bricolage Grotesque", fontWeight: 700, fontSize: 20, color: d.color, marginBottom: 10 }}>
            {d.plan}
          </div>
          {d.rows.map(([k, v], i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between",
              padding: "10px 0",
              borderTop: i > 0 ? "1px solid var(--line)" : "none",
              fontSize: 13,
            }}>
              <span style={{ color: "var(--ink-2)" }}>{k}</span>
              <span style={{
                fontFamily: "JetBrains Mono", fontWeight: 700,
                color: v === "✓" ? "var(--emerald)" : "var(--ink)",
              }}>{v}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ─────────── POR QUE DOAR ─────────── */

function PorQueDoar() {
  const isMobile = useIsMobile();
  const t = useT();
  return (
    <section className="section-tight" style={{ paddingTop: 40 }}>
      <div className="container">
        <div className="card" style={{
          padding: 0, overflow: "hidden",
          background: "linear-gradient(160deg, #1a0a3a 0%, #2d1066 60%, #1a0a3a 100%)",
          color: "#fff", borderColor: "transparent",
          position: "relative",
        }}>
          {/* decorative bg */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px", opacity: .5,
          }}/>
          {/* amber accent */}
          <div style={{
            position: "absolute", top: 0, right: 0, width: 320, height: 320,
            background: "radial-gradient(circle, rgba(240,165,0,.25), transparent 70%)",
            pointerEvents: "none",
          }}/>

          <div style={{
            position: "relative", padding: isMobile ? 28 : 56,
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.1fr 1fr",
            gap: isMobile ? 32 : 56,
            alignItems: "center",
          }}>
            <div>
              <div className="eyebrow" style={{ color: "var(--amber)" }}>
                {t("POR QUE APOIAR?", "WHY SUPPORT?")}
              </div>
              <h2 className="h-display" style={{ fontSize: isMobile ? 32 : 48, margin: "12px 0 20px", color: "#fff", lineHeight: 1.05 }}>
                {t(
                  <>Por que <span style={{ color: "var(--amber)" }}>doar</span><br/>para o Asura?</>,
                  <>Why <span style={{ color: "var(--amber)" }}>donate</span><br/>to Asura?</>
                )}
              </h2>
              <p style={{ fontSize: isMobile ? 15 : 16, color: "#d4cbe8", lineHeight: 1.65, marginBottom: 16, maxWidth: 520 }}>
                {t(
                  "Atualmente é preciso gastar cerca de US$ 100 mensalmente (aproximadamente R$ 600) para hospedar o Asura e manter toda a infraestrutura rodando 24/7.",
                  "Currently we spend around US$ 100 per month (roughly R$ 600) to host Asura and keep the entire infrastructure running 24/7."
                )}
              </p>
              <p style={{ fontSize: isMobile ? 15 : 16, color: "#d4cbe8", lineHeight: 1.65, marginBottom: 16, maxWidth: 520 }}>
                {t(
                  "Doar ajuda o bot a se manter online, faz a qualidade aumentar, deixa o jogo mais divertido e ajuda o desenvolvedor a continuar dedicando tempo ao projeto.",
                  "Donating keeps the bot online, raises its quality, makes the game more fun and helps the developer keep dedicating time to the project."
                )}
              </p>
              <p style={{ fontSize: isMobile ? 15 : 16, color: "#d4cbe8", lineHeight: 1.65, maxWidth: 520, marginBottom: 28 }}>
                {t(
                  <>Não tem condições de doar? Sem problema — você ainda pode ajudar votando no <span style={{ color: "var(--amber)", fontWeight: 600 }}>top.gg</span>. É grátis e ajuda muito.</>,
                  <>Can't donate right now? No worries — you can still help by voting on <span style={{ color: "var(--amber)", fontWeight: 600 }}>top.gg</span>. It's free and helps a lot.</>
                )}
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button className="btn" style={{ background: "var(--amber)", color: "#1a0a3a", padding: "14px 22px", fontWeight: 700 }}>
                  ★ {t("Votar no top.gg", "Vote on top.gg")}
                </button>
                <button className="btn" style={{ background: "rgba(255,255,255,.1)", color: "#fff", borderColor: "rgba(255,255,255,.18)", padding: "14px 22px" }}>
                  <DiscordIcon size={16} />
                  {t("Compartilhar o bot", "Share the bot")}
                </button>
              </div>
            </div>

            {/* Cost breakdown widget */}
            <div style={{
              background: "rgba(255,255,255,.05)",
              border: "1px solid rgba(255,255,255,.1)",
              borderRadius: 18, padding: 24,
              backdropFilter: "blur(8px)",
            }}>
              <div style={{
                fontFamily: "JetBrains Mono", fontSize: 11, letterSpacing: ".1em",
                textTransform: "uppercase", color: "var(--amber)", marginBottom: 14,
              }}>
                {t("CUSTOS MENSAIS", "MONTHLY COSTS")}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { label: t("Hospedagem (VPS)", "Hosting (VPS)"),        val: "US$ 60", pct: 60, color: "#7c4dff" },
                  { label: t("Banco de dados", "Database"),                val: "US$ 22", pct: 22, color: "#a855f7" },
                  { label: t("CDN + assets", "CDN + assets"),               val: "US$ 12", pct: 12, color: "#c084fc" },
                  { label: t("APIs externas", "External APIs"),             val: "US$ 6",  pct: 6,  color: "#ddd6fe" },
                ].map(row => (
                  <div key={row.label}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 13, color: "#e8def7" }}>{row.label}</span>
                      <span style={{ fontSize: 13, fontFamily: "JetBrains Mono", color: "#fff", fontWeight: 600 }}>{row.val}</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 999, background: "rgba(255,255,255,.08)", overflow: "hidden" }}>
                      <div style={{ width: `${row.pct}%`, height: "100%", background: row.color, borderRadius: 999 }} />
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: 22, paddingTop: 18,
                borderTop: "1px solid rgba(255,255,255,.12)",
                display: "flex", justifyContent: "space-between", alignItems: "baseline",
              }}>
                <span style={{ fontSize: 13, color: "#d4cbe8" }}>{t("Total / mês", "Total / month")}</span>
                <span style={{
                  fontFamily: "Bricolage Grotesque", fontSize: 32, fontWeight: 700,
                  color: "var(--amber)", lineHeight: 1,
                }}>
                  ≈ R$ 600
                </span>
              </div>
              <div style={{
                marginTop: 14, padding: "10px 12px",
                background: "rgba(240,165,0,.08)", borderRadius: 10,
                fontSize: 12, color: "#fbd34a", lineHeight: 1.5,
                border: "1px solid rgba(240,165,0,.18)",
              }}>
                {t(
                  "Cada apoio, por menor que seja, faz diferença real na sustentabilidade do projeto.",
                  "Every contribution — no matter how small — makes a real difference for the project's sustainability."
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── FAQ ─────────── */
function FAQ() {
  const t = useT();
  const items = [
    { q: t("Como o pagamento funciona?", "How does payment work?"),
      a: t(
        "Aceitamos PIX, cartão de crédito, PayPal e Mercado Pago. A ativação dos benefícios é automática e instantânea após confirmação.",
        "We accept PIX, credit card, PayPal and Mercado Pago. Benefits are activated automatically and instantly after confirmation."
      ) },
    { q: t("Posso cancelar a qualquer momento?", "Can I cancel anytime?"),
      a: t(
        "Sim. Você pode cancelar a renovação automática a qualquer momento direto no painel — os benefícios continuam até o fim do período já pago.",
        "Yes. You can cancel auto-renewal anytime from the panel — benefits remain active until the end of the paid period."
      ) },
    { q: t("Os benefícios são acumulativos?", "Are benefits cumulative?"),
      a: t(
        "Royal VIP inclui tudo do VIP, que inclui tudo do Prime. Você sempre tem todos os benefícios do plano superior.",
        "Royal VIP includes everything from VIP, which includes everything from Prime. You always get all benefits of the higher plan."
      ) },
    { q: t("Como recebo os itens avulsos?", "How do I receive one-time items?"),
      a: t(
        "Após o pagamento, os recursos são entregues automaticamente na sua conta dentro de poucos segundos. Use j!money para conferir.",
        "After payment, items are delivered automatically to your account within seconds. Use j!money to check."
      ) },
    { q: t("É seguro comprar?", "Is it safe to purchase?"),
      a: t(
        "Sim. Todos os pagamentos são processados por gateways certificados e nenhum dado de cartão passa pelos nossos servidores.",
        "Yes. All payments are processed by certified gateways and no card data passes through our servers."
      ) },
  ];
  const [open, setOpen] = useState(0);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {items.map((item, i) => (
        <div key={i} className="card" style={{ padding: 0, overflow: "hidden" }}>
          <button onClick={() => setOpen(open === i ? -1 : i)} style={{
            width: "100%", padding: "18px 22px", textAlign: "left",
            display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
            background: "transparent", border: 0, cursor: "pointer",
            fontFamily: "inherit",
          }}>
            <span style={{ fontWeight: 600, fontSize: 15 }}>{item.q}</span>
            <span style={{
              width: 28, height: 28, borderRadius: 999,
              background: open === i ? "var(--primary)" : "var(--bg-2)",
              color: open === i ? "#fff" : "var(--ink-2)",
              display: "grid", placeItems: "center", fontSize: 14, fontWeight: 600,
              transition: "background .2s", flexShrink: 0,
            }}>{open === i ? "−" : "+"}</span>
          </button>
          {open === i && (
            <div style={{ padding: "0 22px 20px", fontSize: 14, color: "var(--ink-2)", lineHeight: 1.55 }}>
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

window.PageApoiar = PageApoiar;
