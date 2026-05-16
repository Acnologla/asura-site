<template>
  <div v-if="pet" class="pet-detail">
    <section class="breadcrumb-section">
      <div class="container breadcrumb">
        <router-link :to="{ name: 'Home' }">{{
          $t("nav.about")
        }}</router-link>
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
        <div class="spec-line">
          <span>FILE · #{{ fileNum }}</span>
          <span class="dot" />
          <span class="strong"
            >{{ $t("galos.pet") }} {{ pet.name.toUpperCase() }}</span
          >
          <span :class="['rarity-text', `rarity-${pet.rarity}`]"
            >★ {{ rarityLabel.toUpperCase() }}</span
          >
        </div>

        <div class="hero-grid">
          <div>
            <div class="hero-img-wrap">
              <img :src="pet.sprite" :alt="pet.name" class="hero-img" />
            </div>
            <div class="hero-caption">
              <span>{{ pet.name }}.png</span>
              <span>placeholder</span>
            </div>
          </div>

          <div>
            <div class="hero-badges">
              <div
                class="initials-badge"
                :style="{
                  background:
                    'linear-gradient(135deg, ' + rarityColor + '33, ' + rarityColor + ')',
                }"
              >
                {{ initials }}
              </div>
              <div :class="['rarity-pill', `rarity-${pet.rarity}`]">
                ★ {{ rarityLabel }}
              </div>
            </div>

            <h1 class="h-display rooster-title">
              {{ $t("galos.pet") }}<br />
              <span :style="{ color: rarityColor }">{{ pet.name }}</span>
            </h1>
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
        <div v-if="formattedSkills.length === 0" class="skills-empty card">
          —
        </div>
        <div v-else class="skills-grid">
          <div
            v-for="(s, i) in formattedSkills"
            :key="i"
            class="skill-card card"
          >
            <div
              class="skill-badge"
              :style="{ background: rarityColor + '22', color: rarityColor }"
            >
              {{ initials }}
            </div>
            <div class="skill-body">
              <div class="skill-eyebrow">
                SKILL · {{ String(i + 1).padStart(2, "0") }}
              </div>
              <div class="skill-name">{{ s.name }}</div>
              <div class="skill-stats">
                <div>
                  <span class="stat-label">{{ $t("skill.minDamage") }}</span>
                  <span class="stat-val">{{ s.damage[0] }}</span>
                </div>
                <div class="stat-sep" />
                <div>
                  <span class="stat-label">{{ $t("skill.maxDamage") }}</span>
                  <span class="stat-val">{{ s.damage[1] }}</span>
                </div>
                <div class="stat-sep" />
                <div>
                  <span class="stat-label">{{ $t("skill.level") }}</span>
                  <span class="stat-val">{{ s.level }}</span>
                </div>
              </div>
              <div v-if="s.effect && s.effect.chance > 0" class="skill-effect">
                <span class="effect-eyebrow">{{ $t("skill.effect") }}</span>
                <span class="effect-name">{{ s.effect.effect.name }}</span>
                · {{ Math.round(s.effect.chance * 100) }}% ·
                {{ s.effect.effect.turns }}t
              </div>
            </div>
          </div>
        </div>

        <div style="text-align: center; margin-top: 32px">
          <router-link to="/pets" class="btn btn-ghost">
            ← {{ $t("pet.back") }}
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { GetPets } from "../trade/info.js";

const RARITY_HEX = [
  "#9ca3af",
  "#3b82f6",
  "#a855f7",
  "#f59e0b",
  "#ef4444",
  "#14b8a6",
  "#fbbf24",
];

export default {
  name: "PetDetail",
  data() {
    return {
      pet: null,
      effects: [],
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
    initials() {
      return ((this.pet && this.pet.name) || "").slice(0, 2).toUpperCase();
    },
    fileNum() {
      return String(this.pet && this.pet.id).padStart(3, "0");
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
    async load() {
      const petQuery = parseInt(this.$route.query.pet, 10);
      const petId = isNaN(petQuery) ? null : petQuery + 1;
      if (petId === null) return;
      try {
        const locale = this.$i18n.locale || "pt";
        const effectsRes = await fetch(
          `https://info.asurabot.com.br/effects.json?language=${locale}`
        );
        this.effects = await effectsRes.json();

        const petsData = await Promise.all(GetPets());
        const validPets = petsData.filter((p) => p !== 1);
        this.pet = validPets.find((p) => p.id === petId) || null;
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
.hero-img-wrap {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 14px;
  background: linear-gradient(135deg, #efeaf7, #ddd2f3);
  border: 1px solid var(--line);
  display: grid;
  place-items: center;
  overflow: hidden;
}
.hero-img {
  max-width: 78%;
  max-height: 78%;
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
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid var(--r);
  color: var(--r);
  font-weight: 700;
  font-size: 11px;
  font-family: var(--font-mono);
  letter-spacing: 0.1em;
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
  margin-bottom: 28px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--line);
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
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}
.skill-card {
  padding: 26px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 18px;
  align-items: start;
}
.skill-badge {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.04em;
}
.skill-eyebrow {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  color: var(--ink-3);
  margin-bottom: 4px;
  text-transform: uppercase;
}
.skill-name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 26px;
  margin-bottom: 10px;
  line-height: 1.1;
  letter-spacing: -0.02em;
}
.skill-stats {
  display: flex;
  gap: 18px;
  margin-bottom: 14px;
  font-size: 13px;
  color: var(--ink-2);
  flex-wrap: wrap;
}
.stat-label {
  color: var(--ink-3);
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-right: 6px;
}
.stat-val {
  font-family: var(--font-mono);
  font-weight: 700;
}
.stat-sep {
  width: 1px;
  background: var(--line);
}
.skill-effect {
  padding-top: 14px;
  border-top: 1px solid var(--line);
  font-size: 13px;
  color: var(--ink-2);
  line-height: 1.5;
}
.effect-eyebrow {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--primary);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-right: 8px;
}
.effect-name {
  color: var(--primary);
  font-weight: 600;
}

@media (max-width: 768px) {
  .skills-section {
    padding: 40px 0;
  }
  .skills-title {
    font-size: 32px;
  }
  .skills-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  .skill-card {
    padding: 20px;
  }
  .skill-name {
    font-size: 22px;
  }
}
</style>
