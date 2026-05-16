<template>
  <div v-if="ready" class="galo-detail">
    <!-- Breadcrumb -->
    <section class="breadcrumb-section">
      <div class="container breadcrumb">
        <router-link :to="{ name: 'Home' }">{{
          $t("nav.about")
        }}</router-link>
        <span>/</span>
        <router-link :to="{ name: 'Galos' }">{{
          $t("nav.roosters")
        }}</router-link>
        <span>/</span>
        <span class="current">{{ current.name }}</span>
      </div>
    </section>

    <!-- Header / Hero -->
    <section class="header-section">
      <div class="container">
        <div class="spec-line">
          <span>FILE · #{{ fileNum }} / {{ totalNum }}</span>
          <span class="dot" />
          <span class="strong"
            >{{ $t("home.type") }} {{ current.name.toUpperCase() }}</span
          >
          <span :class="['rarity-text', `rarity-${current.rarity}`]"
            >★ {{ rarityLabel.toUpperCase() }}</span
          >
          <div class="nav-arrows">
            <button @click="prev" aria-label="prev">‹</button>
            <button @click="next" aria-label="next">›</button>
          </div>
        </div>

        <div class="hero-grid">
          <div>
            <div class="hero-img-wrap">
              <img
                :src="currentSprite"
                :alt="current.name"
                class="hero-img"
                :key="currentIndex"
              />
            </div>
            <div class="hero-caption">
              <span>{{ current.name }}.png</span>
              <span>placeholder</span>
            </div>
            <div class="hero-tabs">
              <button class="btn btn-ghost" @click="scrollToSkins">
                {{ $t("galos.skins") }}
              </button>
              <button class="btn btn-ghost" @click="openCompare">
                {{ $t("compare.button") }}
              </button>
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
              <div :class="['rarity-pill', `rarity-${current.rarity}`]">
                ★ {{ rarityLabel }}
              </div>
            </div>

            <h1 class="h-display rooster-title">
              {{ $t("galos.rooster") || "Galo" }}<br />
              <span :style="{ color: rarityColor }">{{ current.name }}</span>
            </h1>
            <p v-if="current.description" class="rooster-desc">
              {{ current.description }}
            </p>

            <!-- Passive -->
            <div v-if="current.passive" class="passive-block">
              <div class="eyebrow">★ {{ $t("galos.passiveSkill") }}</div>
              <div class="passive-text">{{ current.passive }}</div>
            </div>

            <!-- Matchups -->
            <div class="matchups">
              <div>
                <div class="match-eyebrow up">
                  ↑ {{ $t("galos.goodAgainst") }}
                </div>
                <div v-if="goodAgainst.length === 0" class="match-empty">
                  {{ $t("galos.none") }}
                </div>
                <button
                  v-for="g in goodAgainst"
                  :key="g.name + '-up'"
                  class="match-row"
                  @click="goTo(g.index)"
                >
                  <div
                    class="match-thumb"
                    :class="`rarity-${g.rarity}`"
                    :style="{ background: rarityHex(g.rarity) + '33' }"
                  >
                    {{ g.name.slice(0, 2).toUpperCase() }}
                  </div>
                  {{ g.name }}
                </button>
              </div>
              <div>
                <div class="match-eyebrow down">
                  ↓ {{ $t("galos.badAgainst") }}
                </div>
                <div v-if="badAgainst.length === 0" class="match-empty">
                  {{ $t("galos.none") }}
                </div>
                <button
                  v-for="b in badAgainst"
                  :key="b.name + '-down'"
                  class="match-row"
                  @click="goTo(b.index)"
                >
                  <div
                    class="match-thumb"
                    :class="`rarity-${b.rarity}`"
                    :style="{ background: rarityHex(b.rarity) + '33' }"
                  >
                    {{ b.name.slice(0, 2).toUpperCase() }}
                  </div>
                  {{ b.name }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills -->
    <section class="skills-section">
      <div class="container">
        <div class="skills-head">
          <div>
            <div class="eyebrow">§ {{ $t("galos.skills") }}</div>
            <h2 class="h-display skills-title">
              {{ skills.length }} {{ $t("galos.attacks") || "ataques" }}
            </h2>
          </div>
        </div>
        <div class="skills-grid">
          <div
            v-for="(s, i) in skills"
            :key="s.name + i"
            class="skill-card card"
          >
            <div class="skill-badge" :style="{ background: rarityColor + '22', color: rarityColor }">
              {{ initials }}
            </div>
            <div class="skill-body">
              <div class="skill-eyebrow">
                SKILL · {{ String(i + 1).padStart(2, "0") }}
                <span v-if="s.evolved" class="evolved-tag">
                  ◇ {{ $t("skill.evolved") }}
                </span>
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
                <span v-if="s.effect.effect.type === 1">
                  · {{ s.effect.effect.range[0] }}-{{
                    s.effect.effect.range[1]
                  }}
                  {{ $t("skill.minDamage") }}
                </span>
                <span v-if="s.effect.effect.type === 2">
                  · {{ s.effect.effect.range[0] }}-{{
                    s.effect.effect.range[1]
                  }}
                  {{ $t("skill.minHeal") }}
                </span>
                <span v-if="s.effect.effect.type === 3"
                  >· {{ $t("skill.stun") }}</span
                >
                <span v-if="s.effect.effect.type === 4"
                  >· {{ $t("skill.reducedDamage") }}
                  {{ s.effect.effect.range[0] }}%</span
                >
                <span v-if="s.effect.effect.type === 5">·
                  {{ $t("skill.reflectNext") }}</span
                >
                <span v-if="s.effect.effect.type === 6"
                  >· {{ $t("skill.fragility") }}
                  {{ s.effect.effect.range[0] }}%</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skins -->
    <section class="skins-section" id="skins">
      <div class="container">
        <div class="skills-head">
          <div>
            <div class="eyebrow">§ {{ $t("galos.availableSkins") }}</div>
            <h2 class="h-display skills-title">
              {{ skins.length }}
              {{ skins.length === 1 ? "skin" : "skins" }}
            </h2>
          </div>
        </div>
        <div v-if="skins.length === 0" class="skins-empty card">
          {{ $t("galos.noSkinsAvailable") }}
        </div>
        <div v-else class="skins-grid">
          <div
            v-for="(skin, i) in skins"
            :key="i"
            class="skin-card card"
            :class="{ 'skin-mythic': skin.rarity === 5 }"
          >
            <div class="skin-img-wrap">
              <img :src="skin.value" :alt="skin.name" class="skin-img" />
            </div>
            <div class="skin-info">
              <div class="skin-name">{{ skin.name }}</div>
              <div :class="['rarity-pill-sm', `rarity-${skin.rarity}`]">
                ★ {{ rarityNames[skin.rarity] }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Compare modal -->
    <div v-if="compareOpen" class="compare-overlay" @click.self="closeCompare">
      <div class="compare-panel">
        <div class="compare-head">
          <div class="h-display">{{ $t("compare.title") }}</div>
          <button class="compare-close" @click="closeCompare">×</button>
        </div>
        <input
          v-model="compareName"
          :placeholder="$t('compare.placeholder')"
          class="compare-input"
          @keyup.enter="runCompare"
        />
        <button class="btn btn-primary" @click="runCompare">
          {{ $t("compare.button") }}
        </button>
        <div v-if="compareSkills.length" class="compare-result">
          <div
            v-for="(cs, i) in compareSkills"
            :key="i"
            class="compare-row card"
          >
            <div>
              <div class="compare-skill-name">{{ cs.name }}</div>
              <div class="compare-skill-line">
                {{ $t("skill.minDamage") }}: {{ cs.damage[0] }} ·
                {{ $t("skill.maxDamage") }}: {{ cs.damage[1] }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Other types -->
    <section class="others-section">
      <div class="container">
        <div class="others-head">
          <h2 class="h-display others-title">
            {{ $t("others") || "Outros tipos" }}
          </h2>
          <router-link to="/galos" class="btn btn-ghost">
            {{ $t("seeAll") || "Ver todos" }}
            <ArrowIcon :size="12" />
          </router-link>
        </div>
        <div class="others-grid">
          <button
            v-for="o in others"
            :key="o.name"
            class="other-cell"
            @click="goTo(o.index)"
          >
            <div class="other-idx">
              {{ String(o.index + 1).padStart(3, "0") }} /
              {{ o.name.toUpperCase() }}
            </div>
            <div class="other-img-wrap">
              <img :src="o.sprite" :alt="o.name" class="other-img" />
            </div>
            <div class="other-row">
              <div class="other-name">{{ o.name }}</div>
              <div
                :class="['rarity-text', `rarity-${o.rarity}`]"
                style="font-size: 9px"
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
import axios from "axios";
import ArrowIcon from "../components/icons/ArrowIcon.vue";
import { GetCosmeticInfo } from "../trade/info";

const RARITY_HEX = ["#9ca3af", "#3b82f6", "#a855f7", "#f59e0b", "#ef4444", "#14b8a6", "#fbbf24"];

export default {
  name: "GaloDetail",
  components: { ArrowIcon },
  data() {
    return {
      classes: [],
      sprites: [],
      effects: [],
      skills: [],
      allSkins: [],
      currentIndex: 0,
      compareOpen: false,
      compareName: "",
      compareSkills: [],
    };
  },
  computed: {
    ready() {
      return this.classes.length > 1;
    },
    current() {
      return this.classes[this.currentIndex + 1] || {};
    },
    currentSprite() {
      return this.sprites[this.currentIndex] || "";
    },
    fileNum() {
      return String(this.currentIndex + 1).padStart(3, "0");
    },
    totalNum() {
      return String(this.classes.length - 1).padStart(3, "0");
    },
    rarityColor() {
      return RARITY_HEX[this.current.rarity] || "#9ca3af";
    },
    initials() {
      return (this.current.name || "").slice(0, 2).toUpperCase();
    },
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
      return this.rarityNames[this.current.rarity] || "";
    },
    goodAgainst() {
      const target = this.currentIndex + 1;
      return this.classes
        .map((c, i) => ({ ...c, index: i - 1 }))
        .filter((c) => c.disadvantages && c.disadvantages.includes(target));
    },
    badAgainst() {
      if (!this.current.disadvantages) return [];
      return this.current.disadvantages
        .map((di) => ({
          ...this.classes[di],
          index: di - 1,
        }))
        .filter((c) => c && c.name);
    },
    others() {
      return this.classes
        .map((c, i) => ({
          name: c.name,
          rarity: c.rarity,
          sprite: this.sprites[i - 1],
          index: i - 1,
        }))
        .filter(
          (c) =>
            c.index >= 0 &&
            c.index !== this.currentIndex &&
            c.rarity !== -1 &&
            c.sprite
        )
        .slice(0, 6);
    },
    skins() {
      return this.allSkins.filter(
        (s) => s.type === 2 && s.extra === this.currentIndex + 1
      );
    },
  },
  methods: {
    rarityHex(r) {
      return RARITY_HEX[r] || "#9ca3af";
    },
    fetchSkills(cls) {
      const locale = this.$i18n.locale || "pt";
      return axios
        .get(
          `https://info.asurabot.com.br/attacks/${cls.name}.json?language=${locale}`
        )
        .then((r) => {
          (r.data || []).forEach((skill) => {
            if (skill.effect) {
              skill.effect = {
                chance: skill.effect[0],
                effect: this.effects[skill.effect[1]] || {
                  name: "",
                  turns: 0,
                  range: [0, 0],
                  type: 0,
                },
              };
            }
          });
          return r.data;
        })
        .catch(() => []);
    },
    async loadSkills() {
      const cls = this.classes[this.currentIndex + 1];
      if (!cls) return;
      this.skills = await this.fetchSkills(cls);
    },
    async loadSkins() {
      try {
        this.allSkins = await GetCosmeticInfo();
      } catch (e) {
        this.allSkins = [];
      }
    },
    next() {
      const max = this.classes.length - 1;
      this.currentIndex = (this.currentIndex + 1) % max;
      this.syncRoute();
    },
    prev() {
      const max = this.classes.length - 1;
      this.currentIndex = (this.currentIndex - 1 + max) % max;
      this.syncRoute();
    },
    goTo(idx) {
      this.currentIndex = idx;
      this.syncRoute();
    },
    syncRoute() {
      this.$router.replace({
        name: "Galo",
        query: { galo: this.currentIndex },
      });
      this.loadSkills();
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    scrollToSkins() {
      const el = document.getElementById("skins");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    openCompare() {
      this.compareOpen = true;
    },
    closeCompare() {
      this.compareOpen = false;
    },
    async runCompare() {
      const target = this.classes.find(
        (c) =>
          c.name && c.name.toLowerCase() === this.compareName.toLowerCase()
      );
      if (!target) return;
      this.compareSkills = await this.fetchSkills(target);
    },
    async loadAll() {
      const locale = this.$i18n.locale || "pt";
      try {
        const [c, s, e] = await Promise.all([
          axios.get(
            `https://info.asurabot.com.br/class.json?language=${locale}`
          ),
          axios.get(
            `https://info.asurabot.com.br/sprites.json?language=${locale}`
          ),
          axios.get(
            `https://info.asurabot.com.br/effects.json?language=${locale}`
          ),
        ]);
        this.classes = c.data;
        this.sprites = s.data[0];
        this.effects = e.data;
        if (this.$route.query.galo !== undefined) {
          this.currentIndex = parseInt(this.$route.query.galo, 10) || 0;
        }
        await this.loadSkills();
        await this.loadSkins();
      } catch (err) {
        /* render empty */
      }
    },
  },
  watch: {
    "$i18n.locale"() {
      this.loadAll();
    },
  },
  created() {
    this.loadAll();
  },
};
</script>

<style scoped>
.galo-detail {
  padding-bottom: 60px;
}

/* Breadcrumb */
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

/* Header */
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
.spec-line .rarity-text {
  font-weight: 600;
}

.nav-arrows {
  margin-left: auto;
  display: flex;
  gap: 8px;
}
.nav-arrows button {
  width: 30px;
  height: 30px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid var(--line);
  cursor: pointer;
  color: var(--ink-2);
  font-size: 16px;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: 56px;
  align-items: start;
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
.rooster-desc {
  font-size: 17px;
  color: var(--ink-2);
  line-height: 1.55;
  margin-bottom: 28px;
  max-width: 480px;
}

.passive-block {
  padding: 18px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(105, 56, 239, 0.06), rgba(105, 56, 239, 0.02));
  border: 1px solid #d9c9ff;
  margin-bottom: 22px;
}
.passive-block .eyebrow {
  margin-bottom: 6px;
}
.passive-text {
  font-size: 14px;
  color: var(--ink-2);
  line-height: 1.55;
}

.matchups {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
.match-eyebrow {
  font-size: 11px;
  font-weight: 700;
  margin-bottom: 10px;
  font-family: var(--font-mono);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 6px;
}
.match-eyebrow.up {
  color: var(--emerald);
}
.match-eyebrow.down {
  color: var(--rose);
}
.match-empty {
  font-size: 13px;
  color: var(--ink-3);
}
.match-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  color: var(--ink);
  font-family: inherit;
  text-transform: capitalize;
}
.match-thumb {
  width: 22px;
  height: 22px;
  border-radius: 4px;
  display: grid;
  place-items: center;
  color: var(--r);
  font-size: 9px;
  font-weight: 700;
  font-family: var(--font-mono);
}

@media (max-width: 768px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .rooster-title {
    font-size: 44px;
  }
  .rooster-desc {
    font-size: 15px;
  }
  .spec-line {
    font-size: 10px;
  }
  .nav-arrows {
    margin-left: 0;
  }
}

/* Skills */
.skills-section {
  padding: 60px 0;
  background: var(--bg-2);
}
.skills-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 12px;
  margin-bottom: 28px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--line);
}
.skills-title {
  font-size: 48px;
  margin: 8px 0 0;
  letter-spacing: -0.02em;
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
  display: flex;
  align-items: center;
  gap: 8px;
}
.evolved-tag {
  background: var(--amber-soft);
  color: #a17404;
  padding: 2px 7px;
  border-radius: 999px;
  font-size: 9px;
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

/* Skins */
.skins-section {
  padding: 60px 0;
}
.skins-empty {
  padding: 32px;
  text-align: center;
  color: var(--ink-3);
  font-family: var(--font-mono);
  font-size: 12px;
}
.skins-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.skin-card {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: transform 0.15s, box-shadow 0.2s;
}
.skin-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow);
}
.skin-img-wrap {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 12px;
  background: linear-gradient(135deg, #efeaf7, #ddd2f3);
  display: grid;
  place-items: center;
  overflow: hidden;
}
.skin-img {
  max-width: 92%;
  max-height: 92%;
  object-fit: contain;
}
.skin-info {
  padding: 0 6px 6px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 8px;
}
.skin-name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 16px;
}
.rarity-pill-sm {
  padding: 3px 8px;
  border-radius: 999px;
  border: 1px solid var(--r);
  color: var(--r);
  font-weight: 700;
  font-size: 9px;
  font-family: var(--font-mono);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.skin-mythic {
  background: linear-gradient(
      to bottom right,
      #b827fc 0%,
      #2c90fc 25%,
      #b8fd33 50%,
      #fec837 75%,
      #fd1892 100%
    );
  padding: 3px;
}
.skin-mythic > * {
  background: #fff;
  border-radius: 9px;
}

@media (max-width: 1024px) {
  .skins-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 768px) {
  .skins-section {
    padding: 40px 0;
  }
  .skins-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Compare overlay */
.compare-overlay {
  position: fixed;
  inset: 0;
  background: rgba(20, 16, 31, 0.5);
  z-index: 80;
  display: grid;
  place-items: center;
  padding: 24px;
}
.compare-panel {
  background: #fff;
  border-radius: var(--radius-lg);
  padding: 32px;
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: var(--shadow-lg);
}
.compare-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.compare-head .h-display {
  font-size: 24px;
}
.compare-close {
  background: none;
  border: 0;
  font-size: 26px;
  cursor: pointer;
  color: var(--ink-3);
}
.compare-input {
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid var(--line);
  font-size: 14px;
  font-family: inherit;
  outline: none;
}
.compare-result {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 280px;
  overflow-y: auto;
}
.compare-row {
  padding: 14px 18px;
}
.compare-skill-name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 16px;
}
.compare-skill-line {
  font-size: 12px;
  color: var(--ink-3);
  font-family: var(--font-mono);
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
.other-img-wrap {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 12px;
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
</style>
