<template>
  <div v-if="pet" class="pet-detail">
    <section class="breadcrumb-section">
      <div class="container breadcrumb">
        <router-link :to="{ name: 'Home' }">{{ $t("nav.about") }}</router-link>
        <span>/</span>
        <router-link :to="{ name: 'Pets' }">{{
          $t("nav.pigeons")
        }}</router-link>
        <span>/</span>
        <span class="current">{{ pet.name }}</span>
      </div>
    </section>

    <section class="header-section">
      <div class="container">
        <div class="hero-grid">
          <div>
            <div :style="rarityBorderStyle" class="rarity-ring">
              <div class="hero-img-wrap">
                <img :src="pet.sprite" :alt="pet.name" class="hero-img" />
              </div>
            </div>
          </div>

          <div>
            <div class="hero-badges">
              <div
                class="initials-badge"
                :style="{
                  background:
                    'linear-gradient(135deg, ' +
                    rarityColor +
                    '33, ' +
                    rarityColor +
                    ')',
                }"
              >
                {{ initials }}
              </div>
              <div :class="['rarity-pill', `rarity-${pet.rarity}`]">
                ★ {{ rarityLabel }}
              </div>
            </div>

            <h1 class="h-display rooster-title">
              {{ $t("galos.pet") }}
              <span :style="{ color: rarityColor }">{{ pet.name }}</span>
            </h1>

            <div class="hero-tabs">
              <button class="btn btn-ghost" @click="openCompare">
                {{ $t("compare.button") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="skills-section">
      <div class="container">
        <div class="skills-head">
          <div>
            <div class="eyebrow">§ {{ $t("pet.skills") }}</div>
            <h2 class="h-display skills-title">
              {{ formattedSkills.length }} {{ $t("galos.attacks") }}
            </h2>
          </div>
        </div>

        <!-- Compare banner -->
        <div v-if="compareTarget" class="compare-banner card">
          <div class="compare-banner-info">
            <img :src="compareTarget.sprite" class="compare-banner-img" />
            <span>vs <strong>{{ compareTarget.name }}</strong></span>
          </div>
          <button class="compare-clear-btn" @click="clearCompare">✕ Remover</button>
        </div>

        <div v-if="formattedSkills.length === 0" class="skills-empty card">
          —
        </div>

        <!-- Normal skills grid -->
        <div v-else-if="!compareTarget" class="skills-grid">
          <div
            v-for="(s, i) in formattedSkills"
            :key="i"
            class="skill-card card"
          >
            <div class="skill-header">
              <div
                class="skill-badge"
                :style="{ background: rarityColor + '22', color: rarityColor }"
              >
                {{ initials }}
              </div>
              <div class="skill-eyebrow">LEVEL {{ s.level }}</div>
            </div>
            <div class="skill-name">{{ s.name }}</div>
            <div class="skill-stats">
              <div class="stat-row">
                <span class="stat-label">{{ $t("skill.minDamage") }}</span>
                <span class="stat-val">{{ s.damage[0] }}</span>
              </div>
              <div class="stat-row">
                <span class="stat-label">{{ $t("skill.maxDamage") }}</span>
                <span class="stat-val">{{ s.damage[1] }}</span>
              </div>
            </div>
            <div v-if="s.effect && s.effect.chance > 0" class="skill-effect">
              <div class="effect-eyebrow">{{ $t("skill.effect") }}</div>
              <span class="effect-name">{{ s.effect.effect.name }}</span>
              · {{ Math.round(s.effect.chance * 100) }}% ·
              {{ s.effect.effect.turns }}t
            </div>
          </div>
        </div>

        <!-- Compare skills grid -->
        <div v-else class="skills-compare-grid">
          <div v-for="(s, i) in formattedSkills" :key="i" class="skill-compare-row">
            <!-- Current pet skill -->
            <div class="skill-card card skill-compare-card skill-compare-left">
              <div class="skill-header">
                <div
                  class="skill-badge"
                  :style="{ background: rarityColor + '22', color: rarityColor }"
                >
                  {{ initials }}
                </div>
                <div class="skill-eyebrow">LEVEL {{ s.level }}</div>
              </div>
              <div class="skill-name">{{ s.name }}</div>
              <div class="skill-stats">
                <div class="stat-row">
                  <span class="stat-label">{{ $t("skill.minDamage") }}</span>
                  <span class="stat-val" :style="compareSkills[i] ? dmgColor(s.damage[0], compareSkills[i].damage[0]) : {}">{{ s.damage[0] }}</span>
                </div>
                <div class="stat-row">
                  <span class="stat-label">{{ $t("skill.maxDamage") }}</span>
                  <span class="stat-val" :style="compareSkills[i] ? dmgColor(s.damage[1], compareSkills[i].damage[1]) : {}">{{ s.damage[1] }}</span>
                </div>
              </div>
              <div v-if="s.effect && s.effect.chance > 0" class="skill-effect">
                <div class="effect-eyebrow">{{ $t("skill.effect") }}</div>
                <span class="effect-name">{{ s.effect.effect.name }}</span>
                · {{ Math.round(s.effect.chance * 100) }}% ·
                {{ s.effect.effect.turns }}t
              </div>
            </div>

            <div class="skill-compare-vs">VS</div>

            <!-- Opponent pet skill -->
            <template v-if="compareSkills[i]">
              <div class="skill-card card skill-compare-card skill-compare-right">
                <div class="skill-header">
                  <div
                    class="skill-badge"
                    :style="{ background: compareRarityHex + '22', color: compareRarityHex }"
                  >
                    {{ compareTarget.name.slice(0, 2).toUpperCase() }}
                  </div>
                  <div class="skill-eyebrow">LEVEL {{ compareSkills[i].level }}</div>
                </div>
                <div class="skill-name">{{ compareSkills[i].name }}</div>
                <div class="skill-stats">
                  <div class="stat-row">
                    <span class="stat-label">{{ $t("skill.minDamage") }}</span>
                    <span class="stat-val" :style="dmgColor(compareSkills[i].damage[0], s.damage[0])">{{ compareSkills[i].damage[0] }}</span>
                  </div>
                  <div class="stat-row">
                    <span class="stat-label">{{ $t("skill.maxDamage") }}</span>
                    <span class="stat-val" :style="dmgColor(compareSkills[i].damage[1], s.damage[1])">{{ compareSkills[i].damage[1] }}</span>
                  </div>
                </div>
                <div v-if="compareSkills[i].effect && compareSkills[i].effect.chance > 0" class="skill-effect">
                  <div class="effect-eyebrow">{{ $t("skill.effect") }}</div>
                  <span class="effect-name">{{ compareSkills[i].effect.effect.name }}</span>
                  · {{ Math.round(compareSkills[i].effect.chance * 100) }}% ·
                  {{ compareSkills[i].effect.effect.turns }}t
                </div>
              </div>
            </template>
            <div v-else class="skill-card card skill-compare-card skill-compare-right skill-compare-empty">—</div>
          </div>
        </div>

        <div style="text-align: center; margin-top: 32px">
          <router-link to="/pets" class="btn btn-ghost">
            ← {{ $t("pet.back") }}
          </router-link>
        </div>
      </div>
    </section>

    <!-- Compare modal -->
    <div v-if="compareOpen" class="compare-overlay" @click.self="closeCompare">
      <div class="compare-panel">
        <div class="compare-head">
          <div class="h-display" style="font-size:22px">{{ $t("compare.title") }}</div>
          <button class="compare-close" @click="closeCompare">×</button>
        </div>
        <div class="compare-search-wrap">
          <input
            v-model="compareName"
            :placeholder="$t('compare.placeholder')"
            class="compare-input"
            autocomplete="off"
            @focus="compareDropdownOpen = true"
          />
          <div v-if="compareFiltered.length" class="compare-dropdown">
            <button
              v-for="p in compareFiltered"
              :key="p.id"
              class="compare-option"
              @mousedown.prevent="selectCompareTarget(p)"
            >
              <img :src="p.sprite" class="compare-option-img" />
              <span class="compare-option-name">{{ p.name }}</span>
              <span class="compare-option-star" :style="{ color: rarityHex(p.rarity) }">★</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Other pets -->
    <section v-if="otherPets.length" class="others-section">
      <div class="container">
        <div class="others-head">
          <h2 class="h-display others-title">
            {{ $t("others") || "Outros pets" }}
          </h2>
          <router-link to="/pets" class="btn btn-ghost">
            {{ $t("seeAll") || "Ver todos" }}
            <ArrowIcon :size="12" />
          </router-link>
        </div>
        <div class="others-grid">
          <button
            v-for="o in otherPets"
            :key="o.id"
            class="other-cell"
            @click="goToPet(o)"
          >
            <div :style="otherRingStyle(o.rarity)" class="other-rarity-ring">
              <div class="other-img-wrap">
                <img :src="o.sprite" :alt="o.name" class="other-img" />
              </div>
            </div>
            <div class="other-row">
              <div class="other-name">{{ o.name }}</div>
              <div
                :class="['rarity-text', `rarity-${o.rarity}`]"
                style="font-size: 15px"
              >
                ★ {{ rarityNames[o.rarity] }}
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { GetAllPets, GetEffects } from "../trade/info.js";
import ArrowIcon from "../components/icons/ArrowIcon.vue";

const RARITY_HEX = [
  "#9ca3af",
  "#3b82f6",
  "#a855f7",
  "#f59e0b",
  "#ef4444",
  "#14b8a6",
  "#FF00FF",
];

export default {
  name: "PetDetail",
  components: { ArrowIcon },
  data() {
    return {
      pet: null,
      allPets: [],
      effects: [],
      compareOpen: false,
      compareName: "",
      compareTarget: null,
      compareSkills: [],
      compareDropdownOpen: false,
    };
  },
  computed: {
    rarityNames() {
      return [
        this.$t("selectMultiple.rarities.common"),
        this.$t("selectMultiple.rarities.rare"),
        this.$t("selectMultiple.rarities.epic"),
        this.$t("selectMultiple.rarities.legendary"),
        this.$t("selectMultiple.rarities.special"),
        this.$t("selectMultiple.rarities.mythic"),
        this.$t("selectMultiple.rarities.god"),
      ];
    },
    rarityLabel() {
      return (this.pet && this.rarityNames[this.pet.rarity]) || "";
    },
    rarityColor() {
      return (this.pet && RARITY_HEX[this.pet.rarity]) || "#9ca3af";
    },
    rarityBorderStyle() {
      const r = this.pet && this.pet.rarity;
      if (r === 5) {
        return {
          background:
            "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)",
          padding: "4px",
          borderRadius: "18px",
        };
      }
      return {
        background: this.rarityColor,
        padding: "4px",
        borderRadius: "18px",
      };
    },
    initials() {
      return ((this.pet && this.pet.name) || "").slice(0, 2).toUpperCase();
    },
    fileNum() {
      return String(this.pet && this.pet.id).padStart(3, "0");
    },
    otherPets() {
      if (!this.pet) return [];
      const others = this.allPets.filter((p) => p.id !== this.pet.id);
      const sameRarity = others.filter((p) => p.rarity === this.pet.rarity);
      const pool = sameRarity.length >= 2 ? sameRarity : others;
      const shuffled = [...pool];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled.slice(0, 6);
    },
    compareFiltered() {
      const q = this.compareName.toLowerCase().trim();
      const list = this.allPets.filter((p) => !this.pet || p.id !== this.pet.id);
      const filtered = q ? list.filter((p) => p.name && p.name.toLowerCase().includes(q)) : list;
      return filtered.slice(0, 30);
    },
    compareRarityHex() {
      return RARITY_HEX[this.compareTarget && this.compareTarget.rarity] || "#9ca3af";
    },
    formattedSkills() {
      if (!this.pet || !this.pet.skills) return [];
      return this.pet.skills.map((skill, i) => {
        const formatted = {
          name: skill.name,
          damage: skill.damage || [0, 0],
          level: i + 1,
        };
        if (skill.effect) {
          formatted.effect = {
            chance: skill.effect[0],
            effect: this.effects[skill.effect[1]] || {
              name: "Effect",
              turns: 1,
              range: [0, 0],
              type: 1,
            },
          };
        } else {
          formatted.effect = {
            chance: 0,
            effect: { name: "", turns: 0, range: [0, 0] },
          };
        }
        return formatted;
      });
    },
  },
  methods: {
    rarityHex(r) {
      return RARITY_HEX[r] || "#9ca3af";
    },
    dmgColor(val, other) {
      if (val > other) return { color: "var(--emerald)" };
      if (val < other) return { color: "var(--rose)" };
      return {};
    },
    formatPetSkills(pet) {
      if (!pet || !pet.skills) return [];
      return pet.skills.map((skill, i) => {
        const formatted = {
          name: skill.name,
          damage: skill.damage || [0, 0],
          level: i + 1,
        };
        if (skill.effect) {
          formatted.effect = {
            chance: skill.effect[0],
            effect: this.effects[skill.effect[1]] || { name: "Effect", turns: 1, range: [0, 0], type: 1 },
          };
        } else {
          formatted.effect = { chance: 0, effect: { name: "", turns: 0, range: [0, 0] } };
        }
        return formatted;
      });
    },
    openCompare() {
      this.compareOpen = true;
      this.compareTarget = null;
      this.compareName = "";
      this.compareDropdownOpen = false;
    },
    closeCompare() {
      this.compareOpen = false;
    },
    clearCompare() {
      this.compareTarget = null;
      this.compareSkills = [];
      this.compareName = "";
      this.compareDropdownOpen = false;
    },
    selectCompareTarget(p) {
      this.compareDropdownOpen = false;
      this.compareTarget = p;
      this.compareSkills = this.formatPetSkills(p);
      this.compareOpen = false;
    },
    otherRingStyle(r) {
      if (r === 5) {
        return {
          background:
            "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)",
          padding: "2px",
          borderRadius: "14px",
          overflow: "hidden",
        };
      }
      return {
        background: RARITY_HEX[r] || "#9ca3af",
        padding: "2px",
        borderRadius: "14px",
        overflow: "hidden",
      };
    },
    goToPet(pet) {
      this.$router.push({ name: "Pet", query: { pet: pet.id - 1 } });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    async load() {
      const petQuery = parseInt(this.$route.query.pet, 10);
      const petId = isNaN(petQuery) ? null : petQuery + 1;
      if (petId === null) return;
      try {
        const [pets, effects] = await Promise.all([GetAllPets(), GetEffects()]);
        this.effects = effects;
        this.allPets = pets;
        this.pet = pets.find((p) => p.id === petId - 1) || null;
      } catch (e) {
        /* render empty */
      }
    },
  },
  watch: {
    "$i18n.locale"() {
      this.load();
    },
    "$route.query.pet"() {
      this.load();
    },
  },
  created() {
    this.load();
  },
};
</script>

<style scoped>
.pet-detail {
  padding-bottom: 60px;
}

.breadcrumb-section {
  padding: 32px 0 16px;
}

@media (min-width: 1024px) {
  .breadcrumb-section {
    padding-top: 14px;
  }
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--ink-3);
}
.breadcrumb a {
  color: inherit;
}
.breadcrumb .current {
  color: var(--ink);
}

.header-section {
  padding: 8px 0 32px;
}
.spec-line {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  padding: 14px 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  margin-bottom: 36px;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-3);
}
.spec-line .dot {
  width: 4px;
  height: 4px;
  border-radius: 999px;
  background: var(--ink-3);
}
.spec-line .strong {
  color: var(--ink);
  font-weight: 600;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
}
@media (min-width: 1200px) {
  .hero-grid {
    grid-template-columns: 400px 1fr;
  }
}
.rarity-ring {
  width: 100%;
  border-radius: 18px;
  overflow: hidden;
}
.hero-img-wrap {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 14px;
  background: linear-gradient(135deg, #efeaf7, #ddd2f3);
  display: grid;
  place-items: center;
  overflow: hidden;
}
.hero-img {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
}
.hero-caption {
  margin-top: 14px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-3);
}

.hero-badges {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}
.initials-badge {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  color: #fff;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 0.04em;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.rarity-pill {
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid var(--r);
  color: var(--r);
  font-weight: 700;
  font-size: 13px;
  font-family: var(--font-mono);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: color-mix(in oklab, var(--r) 10%, white);
}
.rooster-title {
  font-size: 72px;
  margin: 0 0 12px;
  line-height: 0.98;
  letter-spacing: -0.025em;
  text-transform: capitalize;
}

@media (max-width: 768px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .rooster-title {
    font-size: 44px;
  }
}

.skills-section {
  padding: 60px 0;
  background: var(--bg-2);
}
.skills-head {
  padding-bottom: 20px;
}
.skills-title {
  font-size: 48px;
  margin: 8px 0 0;
  letter-spacing: -0.02em;
}
.skills-empty {
  padding: 32px;
  text-align: center;
  color: var(--ink-3);
}
.skills-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}
.skill-card {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}
.skill-badge {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.04em;
  flex-shrink: 0;
}
.skill-eyebrow {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--ink-3);
  text-transform: uppercase;
  text-align: right;
}
.skill-name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 22px;
  line-height: 1.1;
  letter-spacing: -0.02em;
}
.skill-stats {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 6px 0;
  border-bottom: 1px solid var(--line);
}
.stat-label {
  color: var(--ink-3);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.stat-val {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 14px;
}
.skill-effect {
  font-size: 13px;
  color: var(--ink-2);
  line-height: 1.5;
}
.effect-eyebrow {
  display: block;
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--primary);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 3px;
}
.effect-name {
  color: var(--primary);
  font-weight: 600;
}

@media (max-width: 1024px) {
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 768px) {
  .skills-section {
    padding: 40px 0;
  }
  .skills-title {
    font-size: 32px;
  }
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  .skill-card {
    padding: 16px;
  }
  .skill-name {
    font-size: 18px;
  }
}

.hero-tabs {
  display: flex;
  gap: 8px;
  margin-top: 16px;
  flex-wrap: wrap;
}
.hero-tabs .btn {
  padding: 8px 14px;
  font-size: 12px;
}

/* Compare banner */
.compare-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 18px;
  margin-bottom: 16px;
  gap: 12px;
}
.compare-banner-info {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: var(--ink-2);
}
.compare-banner-img {
  width: 32px;
  height: 32px;
  object-fit: contain;
  border-radius: 6px;
  background: var(--bg-2);
}
.compare-clear-btn {
  font-size: 12px;
  padding: 7px 14px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--bg-2);
  cursor: pointer;
  font-family: inherit;
  color: var(--ink-2);
  white-space: nowrap;
}
.compare-clear-btn:hover {
  background: var(--bg);
}

/* Compare grid */
.skills-compare-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.skill-compare-row {
  display: grid;
  grid-template-columns: 1fr 36px 1fr;
  align-items: stretch;
}
.skill-compare-vs {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 11px;
  color: var(--ink-3);
  letter-spacing: 0.05em;
}
.skill-compare-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ink-3);
  font-size: 20px;
}

@media (max-width: 600px) {
  .skill-compare-row {
    grid-template-columns: 1fr;
  }
  .skill-compare-vs {
    display: none;
  }
  .skill-compare-left {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: none;
  }
  .skill-compare-right {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-top: 1px dashed var(--line);
  }
}

/* Compare overlay */
.compare-overlay {
  position: fixed;
  inset: 0;
  background: rgba(20, 16, 31, 0.55);
  z-index: 80;
  display: grid;
  place-items: start center;
  padding: 60px 24px 24px;
}
.compare-panel {
  background: var(--bg);
  border-radius: var(--radius-lg);
  padding: 24px;
  max-width: 480px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: var(--shadow-lg);
}
.compare-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.compare-close {
  background: none;
  border: 0;
  font-size: 26px;
  cursor: pointer;
  color: var(--ink-3);
  line-height: 1;
}
.compare-search-wrap {
  position: relative;
}
.compare-input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid var(--line);
  font-size: 14px;
  font-family: inherit;
  outline: none;
  background: var(--bg-2);
  color: var(--ink);
  box-sizing: border-box;
}
.compare-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: 12px;
  box-shadow: var(--shadow-lg);
  max-height: 300px;
  overflow-y: auto;
  z-index: 10;
  display: flex;
  flex-direction: column;
}
.compare-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border: 0;
  background: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  color: var(--ink);
  text-align: left;
  transition: background 0.15s;
}
.compare-option:hover {
  background: var(--bg-2);
}
.compare-option-img {
  width: 36px;
  height: 36px;
  object-fit: contain;
  border-radius: 8px;
  background: var(--bg-2);
  flex-shrink: 0;
}
.compare-option-name {
  flex: 1;
  font-weight: 600;
}
.compare-option-star {
  font-size: 13px;
  flex-shrink: 0;
}

/* Others */
.others-section {
  padding: 60px 0 20px;
}
.others-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}
.others-title {
  font-size: 36px;
  margin: 0;
  letter-spacing: -0.02em;
}
.others-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
}
.other-cell {
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: inherit;
  font-family: inherit;
}
.other-idx {
  font-size: 10px;
  font-family: var(--font-mono);
  color: var(--ink-3);
  letter-spacing: 0.08em;
}
.other-rarity-ring {
  width: 100%;
  border-radius: 14px;
  overflow: hidden;
}
.other-img-wrap {
  width: 100%;
  aspect-ratio: 1;
  background: linear-gradient(135deg, #efeaf7, #ddd2f3);
  display: grid;
  place-items: center;
  overflow: hidden;
}
.other-img {
  max-width: 82%;
  max-height: 82%;
  object-fit: contain;
}
.other-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.other-name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 14px;
  text-transform: capitalize;
}

@media (max-width: 768px) {
  .others-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .others-title {
    font-size: 26px;
  }
}
@media (max-width: 450px) {
  .others-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
