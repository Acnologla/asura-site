<template>
  <div
    :class="['card', 'plan-card', { destaque: plano.destaque }]"
    :style="cardStyle"
  >
    <div v-if="plano.destaque" class="most-popular">
      ★ {{ $t("donateNew.mostPopular") }}
    </div>

    <div class="plan-head" :style="{ background: gradient, color: '#fff' }">
      <svg
        class="plan-rings"
        width="180"
        height="180"
        viewBox="0 0 180 180"
        aria-hidden="true"
      >
        <circle
          cx="90"
          cy="90"
          r="70"
          stroke="#fff"
          stroke-width="1"
          fill="none"
        />
        <circle
          cx="90"
          cy="90"
          r="50"
          stroke="#fff"
          stroke-width="1"
          fill="none"
        />
        <circle
          cx="90"
          cy="90"
          r="30"
          stroke="#fff"
          stroke-width="1"
          fill="none"
        />
      </svg>

      <div class="plan-icon">{{ plano.icone }}</div>
      <div class="plan-name">{{ plano.nome }}</div>
      <div class="plan-tagline" :style="{ color: accent }">{{ tagline }}</div>

      <div class="plan-price">
        <div class="plan-price-num">R${{ price }}</div>
        <div class="plan-price-period" :style="{ color: accent }">
          / {{ periodLabel }}
        </div>
        <span v-if="period !== 'mensal' && discount" class="plan-discount">{{
          discount
        }}</span>
      </div>
    </div>

    <div class="plan-body">
      <div class="plan-benefits">
        <div v-for="(b, i) in benefits" :key="i" class="benefit-row">
          <div class="check-bg" :style="{ background: checkBg }">
            <CheckIcon :size="11" :color="checkColor" />
          </div>
          {{ b }}
        </div>
      </div>
      <button
        class="btn plan-cta"
        :style="ctaStyle"
        @click="
          $emit('subscribe', { name: plano.nome, price: price, period: period })
        "
      >
        {{ $t("donatePage.buy") }} {{ plano.nome }}
      </button>
      <div class="plan-pay">PIX · PayPal</div>
    </div>
  </div>
</template>

<script>
import CheckIcon from "../icons/CheckIcon.vue";

const PERIOD_MULT = {
  mensal: { mult: 1, off: 1 },
  trimestral: { mult: 3, off: 0.9 },
  semestral: { mult: 6, off: 0.8 },
  anual: { mult: 12, off: 0.7 },
};

const DISCOUNT_LABEL = {
  trimestral: "10% OFF",
  semestral: "20% OFF",
  anual: "30% OFF",
};

const BENEF_EN = {
  "Ouro extra e xp extra por treino": "Extra gold and XP per training",
  "Trocar o nome do galo de graça": "Free rooster name change",
  "Bônus adicional no comando daily": "Extra bonus on daily command",
  "Chance extra para conseguir chaves": "Extra chance to get keys",
  "Xp e money extra no galinheiro": "Extra XP and money on the coop",
  "Bônus de xp no egg": "XP bonus on egg",
  "Consumíveis duram 30% a mais": "Consumables last 30% longer",
  "35 treinos extras por dia": "35 extra trainings per day",
  "Todas as vantagens do prime": "All Prime benefits",
  "85 Treinos extras por dia": "85 extra trainings per day",
  "Xp extra no passe de batalha": "Extra XP on battle pass",
  "Conteúdo exclusivo no passe": "Exclusive battle pass content",
  "Mais Asura Coins ao vender galos": "More Asura Coins when selling roosters",
  "Bônus na torre e nas raids": "Tower and raid bonuses",
  "Xp extra para seu pet (pombo)": "Extra XP for your pet (pigeon)",
  "Bonus xp e gold na survival": "XP and gold bonus on survival",
  "Todas as vantagens do VIP": "All VIP benefits",
  "145 Treinos extras por dia": "145 extra trainings per day",
  "Usar qualquer imagem como background": "Use any image as background",
  "Utilizar background gifs": "Use animated GIF backgrounds",
  "Limite de givemoney 6x maior": "Givemoney limit 6× larger",
  "50% de xp e money extra nos contratos":
    "50% extra XP and money on contracts",
  "Badge exclusiva": "Exclusive badge",
  "Prioridade no suporte": "Priority support",
};

export default {
  name: "PlanCard",
  components: { CheckIcon },
  props: {
    plano: { type: Object, required: true },
    periodo: { type: String, default: "mensal" },
  },
  computed: {
    period() {
      return this.periodo;
    },
    benefits() {
      const en = this.$i18n.locale === "en";
      return this.plano.benefitKeys.map((k) => (en ? BENEF_EN[k] || k : k));
    },
    price() {
      const conf = PERIOD_MULT[this.period] || PERIOD_MULT.mensal;
      return Math.round(this.plano.base * conf.mult * conf.off);
    },
    periodLabel() {
      const pt = this.$i18n.locale === "pt";
      return {
        mensal: pt ? "mês" : "month",
        trimestral: pt ? "trimestre" : "quarter",
        semestral: pt ? "semestre" : "semester",
        anual: pt ? "ano" : "year",
      }[this.period];
    },
    discount() {
      return DISCOUNT_LABEL[this.period];
    },
    tagline() {
      const pt = this.$i18n.locale === "pt";
      if (this.plano.cor === "emerald")
        return pt ? "Benefícios essenciais" : "Essential benefits";
      if (this.plano.cor === "primary")
        return pt ? "Todos os benefícios" : "All benefits";
      return pt
        ? "Experiência premium definitiva"
        : "Definitive premium experience";
    },
    gradient() {
      if (this.plano.cor === "emerald")
        return "linear-gradient(160deg, #1ed687 0%, #0e9b65 100%)";
      if (this.plano.cor === "primary")
        return "linear-gradient(160deg, #7c4dff 0%, #4a1fd1 100%)";
      return "linear-gradient(160deg, #1a0a3a 0%, #2d1066 50%, #0a0418 100%)";
    },
    accent() {
      if (this.plano.cor === "emerald") return "#cffce6";
      if (this.plano.cor === "primary") return "#e2d4ff";
      return "#fbd34a";
    },
    cardStyle() {
      return {
        padding: 0,
        overflow: "hidden",
        position: "relative",
        transform: this.plano.destaque ? "translateY(-12px)" : "none",
        boxShadow: this.plano.destaque
          ? "var(--shadow-lg)"
          : "var(--shadow-sm)",
        borderColor: this.plano.destaque ? "transparent" : "var(--line)",
      };
    },
    ctaStyle() {
      if (this.plano.cor === "emerald")
        return { background: "#0a6a45", color: "#fff" };
      if (this.plano.cor === "primary")
        return { background: "var(--primary-deep)", color: "#fff" };
      return { background: "var(--amber)", color: "#1a0a3a" };
    },
    checkBg() {
      if (this.plano.cor === "emerald") return "var(--emerald-soft)";
      if (this.plano.cor === "primary") return "var(--primary-soft)";
      return "var(--amber-soft)";
    },
    checkColor() {
      if (this.plano.cor === "emerald") return "var(--emerald)";
      if (this.plano.cor === "primary") return "var(--primary)";
      return "#c08400";
    },
  },
};
</script>

<style scoped>
.plan-card {
  display: flex;
  flex-direction: column;
}
.most-popular {
  position: absolute;
  top: 18px;
  right: 18px;
  z-index: 2;
  background: var(--amber);
  color: #000;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  font-family: var(--font-mono);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.plan-head {
  padding: 32px 28px 28px;
  position: relative;
  overflow: hidden;
}
.plan-rings {
  position: absolute;
  top: -40px;
  right: -40px;
  opacity: 0.12;
}
.plan-icon {
  font-size: 28px;
  margin-bottom: 8px;
}
.plan-name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 32px;
  margin-bottom: 4px;
}
.plan-tagline {
  font-size: 13px;
  margin-bottom: 24px;
}
.plan-price {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
}
.plan-price-num {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 56px;
  line-height: 1;
  letter-spacing: -0.02em;
}
.plan-price-period {
  font-size: 14px;
}
.plan-discount {
  margin-left: 6px;
  font-size: 10px;
  padding: 3px 7px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.25);
  font-family: var(--font-mono);
  font-weight: 600;
}

.plan-body {
  padding: 24px;
  background: #fff;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.plan-benefits {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}
.benefit-row {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  font-size: 13.5px;
  color: var(--ink-2);
  line-height: 1.45;
}
.check-bg {
  flex-shrink: 0;
  margin-top: 1px;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  display: grid;
  place-items: center;
}
.plan-cta {
  width: 100%;
  padding: 14px 0;
  font-size: 14px;
  font-weight: 700;
  box-shadow: 0 4px 12px -4px rgba(0, 0, 0, 0.2);
  margin-top: auto;
}
.plan-pay {
  margin-top: 14px;
  font-size: 11px;
  color: var(--ink-3);
  text-align: center;
  font-family: var(--font-mono);
}
</style>
