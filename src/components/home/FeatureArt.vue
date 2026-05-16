<template>
  <div>
    <div v-if="kind === 'rarity'" class="rarity-art">
      <div
        v-for="(r, i) in rarities"
        :key="r"
        :class="['rarity-row', `rarity-${i}`]"
      >
        <span class="rarity-row-idx">{{ String(i + 1).padStart(2, "0") }}</span>
        <span class="rarity-row-dot" />
        <span class="rarity-row-name">{{ r }}</span>
        <span v-if="i === rarities.length - 1" class="rarity-row-tag"
          >★ {{ $t("rarestLabel") || "MAIS RARO" }}</span
        >
      </div>
    </div>

    <div v-else-if="kind === 'training'" class="training-art">
      <div class="t-cmd">
        <span style="color: var(--amber)">›</span> j!train
      </div>
      <div class="t-line">
        {{ trainingLine }}
        <span style="color: #fff; font-weight: 600">Plasmorin</span>…
      </div>
      <div class="t-line t-sub">↳ +1.240 <span style="color: var(--amber)">XP</span></div>
      <div class="t-line t-sub">
        ↳ +850 <span style="color: var(--emerald)">{{ goldLabel }}</span>
      </div>
      <div class="t-foot">
        {{ remainingLabel }}: <span style="color: #fff">27 / 35</span>
      </div>
    </div>

    <div v-else-if="kind === 'rank'" class="rank-art">
      <div class="r-eyebrow">{{ rankedLabel }}</div>
      <div class="r-main">
        <div class="r-rank">#1</div>
        <div>
          <div class="r-title">{{ topLabel }}</div>
          <div class="r-sub">{{ rewardLabel }}</div>
        </div>
      </div>
      <div class="r-foot">
        <span>2.840 ELO</span>
        <span class="up">↑ +12</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FeatureArt",
  props: { kind: String },
  computed: {
    rarities() {
      const pt = this.$i18n.locale === "pt";
      return pt
        ? ["Comum", "Raro", "Épico", "Lendário", "Especial", "Mítico", "Deus"]
        : ["Common", "Rare", "Epic", "Legendary", "Special", "Mythic", "God"];
    },
    trainingLine() {
      return this.$i18n.locale === "pt" ? "Treinando" : "Training";
    },
    goldLabel() {
      return this.$i18n.locale === "pt" ? "ouro" : "gold";
    },
    remainingLabel() {
      return this.$i18n.locale === "pt"
        ? "treinos restantes hoje"
        : "trainings left today";
    },
    rankedLabel() {
      return this.$i18n.locale === "pt" ? "RANKED · SEMANA 14" : "RANKED · WEEK 14";
    },
    topLabel() {
      return this.$i18n.locale === "pt" ? "Top do servidor" : "Server top";
    },
    rewardLabel() {
      return this.$i18n.locale === "pt"
        ? "recompensa em Asura Coins"
        : "reward in Asura Coins";
    },
  },
};
</script>

<style scoped>
.rarity-art {
  padding: 22px 24px;
  border-radius: 14px;
  background: #fbfaff;
  border: 1px solid var(--line);
  height: 200px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  justify-content: center;
}
.rarity-row {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--ink-2);
}
.rarity-row:last-child {
  color: var(--r);
  font-weight: 700;
}
.rarity-row-idx {
  color: var(--ink-3);
}
.rarity-row-dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: var(--r);
}
.rarity-row-name {
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.rarity-row-tag {
  margin-left: auto;
  font-size: 9px;
  color: var(--r);
  letter-spacing: 0.12em;
}

.training-art {
  padding: 20px;
  border-radius: 14px;
  background: #1a1620;
  color: #e9e0f5;
  border: 1px solid #2a2333;
  height: 200px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-family: var(--font-mono);
  font-size: 11.5px;
  line-height: 1.55;
  position: relative;
  overflow: hidden;
}
.t-cmd {
  color: #8a7fa8;
  margin-bottom: 8px;
}
.t-line {
  color: #cabfe0;
}
.t-sub {
  color: #8a7fa8;
}
.t-foot {
  color: #6e6587;
  font-size: 10px;
  margin-top: auto;
}

.rank-art {
  padding: 20px 24px;
  border-radius: 14px;
  background: linear-gradient(135deg, #e6f5ee 0%, #c5e9d4 100%);
  border: 1px solid #a8d9bc;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.r-eyebrow {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #155a3c;
}
.r-main {
  display: flex;
  align-items: baseline;
  gap: 14px;
}
.r-rank {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 64px;
  color: var(--emerald);
  line-height: 1;
  letter-spacing: -0.04em;
}
.r-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 18px;
  color: #0a3a25;
}
.r-sub {
  font-size: 12px;
  color: #155a3c;
}
.r-foot {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 10px;
  color: #155a3c;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.up {
  color: var(--emerald);
}
</style>
