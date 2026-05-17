<template>
  <!-- Scroll progress bar -->

  <div class="donate-page">
    <div v-if="showScrollBar" class="scroll-progress-bar">
      <span class="scroll-arrow scroll-arrow-up">&#8963;</span>
      <div class="scroll-track">
        <div
          class="scroll-progress-fill"
          :style="{ height: scrollProgress + '%' }"
        />
      </div>
      <span class="scroll-arrow scroll-arrow-down">&#8964;</span>
    </div>
    <!-- Hero -->
    <section class="donate-hero">
      <div class="container">
        <h1 class="h-display donate-title">
          {{ $t("donateNew.titleA") }}<br />
          <span style="color: var(--primary)">{{
            $t("donateNew.titleB")
          }}</span>
          {{ $t("donateNew.titleC") }}
        </h1>
        <p class="donate-sub">{{ $t("donateNew.sub") }}</p>
      </div>
    </section>

    <!-- Avulsos -->
    <section class="avulsos-section">
      <div class="container">
        <div class="avulsos-head">
          <div>
            <div class="eyebrow">{{ $t("donateNew.oneOffEyebrow") }}</div>
            <h2 class="h-display avulsos-title">
              {{ $t("donateNew.oneOffTitle") }}
            </h2>
          </div>
        </div>
        <div class="avulsos-grid">
          <div v-for="r in RECURSOS" :key="r.nome" class="card recurso-card">
            <div
              class="recurso-icon"
              :style="{
                background: `linear-gradient(160deg, ${r.gradient[0]} 0%, ${r.gradient[1]} 100%)`,
              }"
            >
              {{ r.icone }}
            </div>
            <div class="recurso-body">
              <div>
                <div class="recurso-name">
                  {{ $t("donatePage.buy") }} {{ r.nome }}
                </div>
                <div class="recurso-qtd">{{ r.qtd }}</div>
              </div>
              <div class="recurso-foot">
                <div>
                  <div class="recurso-price">R${{ r.preco }}</div>
                  <div class="recurso-unit">{{ $t("donateNew.unit") }}</div>
                </div>
                <button class="btn btn-primary" @click="openModal">
                  {{ $t("donatePage.buy") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Plans -->
    <section class="plans-section">
      <div class="container">
        <div class="period-toggle-wrap">
          <div class="period-toggle">
            <button
              v-for="p in periods"
              :key="p.key"
              :class="['period-btn', { active: period === p.key }]"
              @click="period = p.key"
            >
              {{ p.label }}
              <span v-if="p.badge" class="period-badge">{{ p.badge }}</span>
            </button>
          </div>
        </div>
      </div>
      <div class="container plans-grid">
        <PlanCard
          v-for="plano in PLANOS"
          :key="plano.nome"
          :plano="plano"
          :periodo="period"
          @subscribe="openModal"
        />
      </div>
    </section>

    <!-- Por que doar -->
    <section class="why-section">
      <div class="container">
        <div class="card why-card">
          <div class="why-dots" />
          <div class="why-glow" />
          <div class="why-grid">
            <div>
              <div class="eyebrow" style="color: var(--amber)">
                {{ $t("donateNew.whyEyebrow") }}
              </div>
              <h2 class="h-display why-title">
                {{ $t("donateNew.whyTitleA") }}
                <span style="color: var(--amber)">{{
                  $t("donateNew.whyTitleB")
                }}</span
                ><br />
                {{ $t("donateNew.whyTitleC") }}
              </h2>
              <p class="why-p">{{ $t("donateNew.whyP1") }}</p>
              <p class="why-p">{{ $t("donateNew.whyP2") }}</p>
              <p class="why-p" v-html="$t('donateNew.whyP3')"></p>
              <div class="why-actions">
                <a
                  class="btn"
                  style="background: var(--amber); color: #1a0a3a; font-weight: 700; padding: 14px 22px"
                  href="https://top.gg/bot/470684281102925844"
                  target="_blank"
                  rel="noopener"
                  >★ {{ $t("donateNew.voteTopgg") }}</a
                >
                <a
                  class="btn btn-discord"
                  style="padding: 14px 22px"
                  href="https://discord.gg/bn8yYNNNF3"
                  target="_blank"
                  rel="noopener"
                >
                  <DiscordIcon :size="16" />
                  {{ $t("donateNew.shareBot") }}
                </a>
              </div>
            </div>
            <div class="cost-widget">
              <div class="cost-eyebrow">{{ $t("donateNew.monthlyCosts") }}</div>
              <div class="cost-rows">
                <div v-for="(c, i) in costs" :key="i" class="cost-row">
                  <div class="cost-row-head">
                    <span>{{ c.label }}</span>
                    <span class="cost-val">{{ c.val }}</span>
                  </div>
                  <div class="cost-bar">
                    <div
                      class="cost-bar-fill"
                      :style="{ width: c.pct + '%', background: c.color }"
                    />
                  </div>
                </div>
              </div>
              <div class="cost-total">
                <span>{{ $t("donateNew.totalMonth") }}</span>
                <span class="cost-total-val">≈ R$ 600</span>
              </div>
              <div class="cost-note">{{ $t("donateNew.costNote") }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="faq-section">
      <div class="container faq-grid">
        <div>
          <div class="eyebrow">{{ $t("donateNew.faqEyebrow") }}</div>
          <h2 class="h-display faq-title">{{ $t("donateNew.faqTitle") }}</h2>
          <p class="faq-sub">{{ $t("donateNew.faqSub") }}</p>
          <a
            class="btn btn-discord"
            href="https://discord.gg/bn8yYNNNF3"
            target="_blank"
            rel="noopener"
            style="padding: 12px 20px"
          >
            <DiscordIcon :size="16" />
            {{ $t("donateNew.joinDiscord") }}
          </a>
        </div>
        <div class="faq-list">
          <div
            v-for="(item, i) in faqs"
            :key="i"
            class="card faq-item"
            @click="openIdx = openIdx === i ? -1 : i"
          >
            <div class="faq-row">
              <span class="faq-q">{{ item.q }}</span>
              <span class="faq-toggle" :class="{ active: openIdx === i }">{{
                openIdx === i ? "−" : "+"
              }}</span>
            </div>
            <div v-if="openIdx === i" class="faq-a">{{ item.a }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Donation notice modal -->
    <div v-if="modalOpen" class="modal-overlay" @click.self="modalOpen = false">
      <div class="modal-card">
        <p>
          {{ $t("donatePage.donationNotice") }}
          <a
            href="https://discord.gg/bn8yYNNNF3"
            target="_blank"
            rel="noopener"
            >{{ $t("donatePage.supportDiscord") }}</a
          >
        </p>
        <button class="btn btn-primary" @click="modalOpen = false">OK</button>
      </div>
    </div>
  </div>
</template>

<script>
import DiscordIcon from "../components/icons/DiscordIcon.vue";
import PlanCard from "../components/donate/PlanCard.vue";

const PLANOS = [
  {
    nome: "Prime",
    cor: "emerald",
    icone: "✋",
    base: 16,
    tagline: "primeDesc",
    benefitKeys: [
      "Ouro extra e xp extra por treino",
      "Trocar o nome do galo de graça",
      "Bônus adicional no comando daily",
      "Chance extra para conseguir chaves",
      "Xp e money extra no galinheiro",
      "Bônus de xp no egg",
      "Consumíveis duram 30% a mais",
      "35 treinos extras por dia",
    ],
  },
  {
    nome: "VIP",
    cor: "primary",
    icone: "♛",
    base: 35,
    tagline: "vipDesc",
    destaque: true,
    benefitKeys: [
      "Todas as vantagens do prime",
      "85 Treinos extras por dia",
      "Xp extra no passe de batalha",
      "Conteúdo exclusivo no passe",
      "Mais Asura Coins ao vender galos",
      "Bônus na torre e nas raids",
      "Xp extra para seu pet (pombo)",
      "Bonus xp e gold na survival",
    ],
  },
  {
    nome: "Royal VIP",
    cor: "royal",
    icone: "♚",
    base: 65,
    tagline: "royalVipDesc",
    benefitKeys: [
      "Todas as vantagens do VIP",
      "145 Treinos extras por dia",
      "Usar qualquer imagem como background",
      "Utilizar background gifs",
      "Limite de givemoney 6x maior",
      "50% de xp e money extra nos contratos",
      "Badge exclusiva",
      "Prioridade no suporte",
    ],
  },
];

const RECURSOS = [
  {
    nome: "Dinheiro",
    icone: "$",
    qtd: "20.000 Moedas",
    preco: 10,
    gradient: ["#7c4dff", "#5025c9"],
  },
  {
    nome: "XP",
    icone: "✦",
    qtd: "12.000 XP",
    preco: 10,
    gradient: ["#8b5cf6", "#6d28d9"],
  },
  {
    nome: "Asura Coins",
    icone: "◈",
    qtd: "1 Asura Coin",
    preco: 10,
    gradient: ["#a855f7", "#7e22ce"],
  },
  {
    nome: "UserXP",
    icone: "★",
    qtd: "2.000 UserXP",
    preco: 10,
    gradient: ["#7c3aed", "#5b21b6"],
  },
  {
    nome: "Resets",
    icone: "↻",
    qtd: "1 Reset de Galo",
    preco: 30,
    gradient: ["#9333ea", "#6b21a8"],
  },
];

export default {
  name: "Donate",
  components: { DiscordIcon, PlanCard },
  data() {
    return {
      period: "mensal",
      modalOpen: false,
      openIdx: 0,
      scrollProgress: 0,
      showScrollBar: true,
      PLANOS,
      RECURSOS,
      costs: [
        { label: "Hospedagem (VPS)", val: "US$ 60", pct: 60, color: "#7c4dff" },
        { label: "Banco de dados", val: "US$ 22", pct: 22, color: "#a855f7" },
        { label: "CDN + assets", val: "US$ 12", pct: 12, color: "#c084fc" },
        { label: "APIs externas", val: "US$ 6", pct: 6, color: "#ddd6fe" },
      ],
    };
  },
  computed: {
    periods() {
      return [
        { key: "mensal", label: this.$t("donatePage.monthlyPlan") },
        {
          key: "trimestral",
          label: this.$t("donatePage.quarterlyPlan"),
          badge: "10%",
        },
        {
          key: "semestral",
          label: this.$t("donatePage.semiannualPlan"),
          badge: "20%",
        },
        {
          key: "anual",
          label: this.$t("donatePage.annualPlan"),
          badge: "30%",
        },
      ];
    },
    faqs() {
      const pt = this.$i18n.locale === "pt";
      return [
        {
          q: pt ? "Como o pagamento funciona?" : "How does payment work?",
          a: pt
            ? "Aceitamos PIX e PayPal. A ativação dos benefícios é automática e instantânea após confirmação."
            : "We accept PIX and PayPal. Benefits are activated automatically and instantly after confirmation.",
        },
        {
          q: pt
            ? "Posso cancelar a qualquer momento?"
            : "Can I cancel anytime?",
          a: pt
            ? "Sim. Você pode cancelar a renovação automática a qualquer momento direto no painel — os benefícios continuam até o fim do período já pago."
            : "Yes. You can cancel auto-renewal anytime from the panel — benefits remain active until the end of the paid period.",
        },
        {
          q: pt
            ? "Os benefícios são acumulativos?"
            : "Are benefits cumulative?",
          a: pt
            ? "Royal VIP inclui tudo do VIP, que inclui tudo do Prime. Você sempre tem todos os benefícios do plano superior."
            : "Royal VIP includes everything from VIP, which includes everything from Prime. You always get all benefits of the higher plan.",
        },
        {
          q: pt
            ? "Como recebo os itens avulsos?"
            : "How do I receive one-time items?",
          a: pt
            ? "Após o pagamento, os recursos são entregues automaticamente na sua conta dentro de poucos segundos."
            : "After payment, items are delivered automatically to your account within seconds.",
        },
      ];
    },
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll, { passive: true });
    this.onScroll();
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    openModal() {
      this.modalOpen = true;
    },
    onScroll() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      this.scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      const footer = document.querySelector("footer");
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        this.showScrollBar = footerTop > window.innerHeight * 0.85;
      }
    },
  },
};
</script>

<style scoped>
/* Scroll progress bar */
.scroll-progress-bar {
  position: fixed;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  z-index: 100;
}
.scroll-track {
  width: 4px;
  height: 100px;
  background: rgba(124, 77, 255, 0.15);
  border-radius: 999px;
  overflow: hidden;
  position: relative;
}
.scroll-progress-fill {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: linear-gradient(to top, var(--primary), #a855f7);
  border-radius: 999px;
  transition: height 0.1s linear;
  min-height: 8px;
}
.scroll-arrow {
  font-size: 26px;
  color: var(--primary);
  line-height: 1;
  opacity: 0.7;
}
.scroll-arrow-up {
  animation: arrowBounceUp 1.4s ease-in-out infinite;
}
.scroll-arrow-down {
  animation: arrowBounceDown 1.4s ease-in-out infinite;
}
@keyframes arrowBounceUp {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.5;
  }
  50% {
    transform: translateY(-3px);
    opacity: 1;
  }
}
@keyframes arrowBounceDown {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.5;
  }
  50% {
    transform: translateY(3px);
    opacity: 1;
  }
}

.donate-page {
  padding-bottom: 24px;
}

/* Hero */
.donate-hero {
  padding: 12px 0 20px;
  text-align: center;
}
.amber-pill {
  background: #fff4d1;
  border-color: #f5d77a;
  color: #a17404;
  margin-bottom: 20px;
}
.donate-title {
  font-size: 56px;
  margin: 0 0 12px;
}
.donate-sub {
  font-size: 17px;
  color: var(--ink-2);
  max-width: 600px;
  margin: 0 auto 0;
}
.period-toggle {
  display: inline-flex;
  padding: 4px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid var(--line);
  box-shadow: var(--shadow-sm);
  flex-wrap: wrap;
}
.period-btn {
  padding: 10px 18px;
  border-radius: 999px;
  border: 0;
  background: transparent;
  color: var(--ink-2);
  font-weight: 600;
  font-size: 13px;
  font-family: inherit;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.period-btn.active {
  background: var(--ink);
  color: #fff;
}
.period-badge {
  font-size: 10px;
  padding: 3px 7px;
  border-radius: 999px;
  background: var(--emerald);
  color: #fff;
}

/* Period toggle placement */
.period-toggle-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

/* Plans */
.plans-section {
  padding: 16px 0 40px;
}
.plans-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

/* Avulsos */
.avulsos-section {
  background: var(--bg-2);
  padding: 48px 0;
}
.avulsos-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 14px;
  margin-bottom: 20px;
}
.avulsos-title {
  font-size: 44px;
  margin: 8px 0 8px;
}
.avulsos-sub {
  font-size: 15px;
  color: var(--ink-2);
  max-width: 500px;
  margin: 0;
}
.avulsos-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.recurso-card {
  padding: 0;
  overflow: hidden;
  display: flex;
}
.recurso-icon {
  width: 100px;
  display: grid;
  place-items: center;
  color: #fff;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 44px;
  flex-shrink: 0;
}
.recurso-body {
  flex: 1;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.recurso-name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 18px;
}
.recurso-qtd {
  font-size: 12px;
  color: var(--ink-3);
}
.recurso-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}
.recurso-price {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 22px;
  color: var(--primary);
  line-height: 1;
}
.recurso-unit {
  font-size: 10px;
  color: var(--ink-3);
  font-family: var(--font-mono);
  margin-top: 2px;
}

/* Why */
.why-section {
  padding: 48px 0;
}
.why-card {
  padding: 0;
  overflow: hidden;
  background: linear-gradient(160deg, #1a0a3a 0%, #2d1066 60%, #1a0a3a 100%);
  color: #fff;
  border-color: transparent;
  position: relative;
}
.why-dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.06) 1px,
    transparent 1px
  );
  background-size: 28px 28px;
  opacity: 0.5;
}
.why-glow {
  position: absolute;
  top: 0;
  right: 0;
  width: 320px;
  height: 320px;
  background: radial-gradient(circle, rgba(240, 165, 0, 0.25), transparent 70%);
  pointer-events: none;
}
.why-grid {
  position: relative;
  padding: 56px;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 56px;
  align-items: center;
}
.why-title {
  font-size: 48px;
  margin: 12px 0 20px;
  color: #fff;
  line-height: 1.05;
}
.why-p {
  font-size: 16px;
  color: #d4cbe8;
  line-height: 1.65;
  margin-bottom: 16px;
  max-width: 520px;
}
.why-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 12px;
}

.cost-widget {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  padding: 24px;
  backdrop-filter: blur(8px);
}
.cost-eyebrow {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--amber);
  margin-bottom: 14px;
}
.cost-rows {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.cost-row-head {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #e8def7;
  margin-bottom: 6px;
}
.cost-val {
  font-family: var(--font-mono);
  color: #fff;
  font-weight: 600;
}
.cost-bar {
  height: 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
}
.cost-bar-fill {
  height: 100%;
  border-radius: 999px;
}
.cost-total {
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  color: #d4cbe8;
  font-size: 13px;
}
.cost-total-val {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 700;
  color: var(--amber);
  line-height: 1;
}
.cost-note {
  margin-top: 14px;
  padding: 10px 12px;
  background: rgba(240, 165, 0, 0.08);
  border-radius: 10px;
  font-size: 12px;
  color: #fbd34a;
  line-height: 1.5;
  border: 1px solid rgba(240, 165, 0, 0.18);
}

/* FAQ */
.faq-section {
  padding: 40px 0;
}
.faq-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 60px;
}
.faq-title {
  font-size: 40px;
  margin: 8px 0 16px;
}
.faq-sub {
  font-size: 15px;
  color: var(--ink-2);
  line-height: 1.6;
  margin-bottom: 20px;
}
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.faq-item {
  padding: 0;
  overflow: hidden;
  cursor: pointer;
}
.faq-row {
  padding: 18px 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
.faq-q {
  font-weight: 600;
  font-size: 15px;
}
.faq-toggle {
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background: var(--bg-2);
  color: var(--ink-2);
  display: grid;
  place-items: center;
  font-size: 14px;
  font-weight: 600;
  transition: background 0.2s;
  flex-shrink: 0;
}
.faq-toggle.active {
  background: var(--primary);
  color: #fff;
}
.faq-a {
  padding: 0 22px 20px;
  font-size: 14px;
  color: var(--ink-2);
  line-height: 1.55;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(20, 16, 31, 0.5);
  display: grid;
  place-items: center;
  z-index: 80;
  padding: 24px;
}
.modal-card {
  background: #fff;
  border-radius: var(--radius-lg);
  padding: 32px;
  max-width: 480px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: var(--shadow-lg);
}

/* Mobile */
@media (max-width: 768px) {
  .donate-hero {
    padding: 20px 0 12px;
  }
  .donate-title {
    font-size: 36px;
  }
  .donate-sub {
    font-size: 15px;
  }
  .scroll-progress-bar {
    right: 6px;
  }
  .period-toggle {
    width: 100%;
    justify-content: center;
  }
  .plans-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  .avulsos-section {
    padding: 32px 0;
  }
  .avulsos-head {
    flex-direction: column;
    align-items: flex-start;
  }
  .avulsos-title {
    font-size: 30px;
  }
  .avulsos-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .why-grid {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 28px;
  }
  .why-title {
    font-size: 32px;
  }
  .faq-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  .faq-title {
    font-size: 30px;
  }
}
</style>
