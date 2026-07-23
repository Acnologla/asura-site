<template>
  <div v-if="ready" class="galo-detail">
    <!-- Breadcrumb -->
    <section class="breadcrumb-section">
      <div class="container breadcrumb">
        <router-link :to="{ name: 'Home' }">{{ $t("nav.about") }}</router-link>
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
        <div class="hero-grid">
          <div>
            <div :style="rarityBorderStyle" class="rarity-ring">
              <div class="hero-img-wrap">
                <img
                  :src="currentSprite"
                  :alt="current.name"
                  class="hero-img"
                  :key="currentIndex"
                />
              </div>
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
                    'linear-gradient(135deg, ' +
                    rarityColor +
                    '33, ' +
                    rarityColor +
                    ')',
                }"
              >
                {{ initials }}
              </div>
              <div :class="['rarity-pill', `rarity-${current.rarity}`]">
                ★ {{ rarityLabel }}
              </div>
            </div>

            <h1 class="h-display rooster-title">
              {{ $t("galos.rooster") || "Galo" }}
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

        <!-- Compare banner -->
        <div v-if="compareTarget" class="compare-banner card">
          <div class="compare-banner-info">
            <img :src="compareTargetSprite" class="compare-banner-img" />
            <span
              >vs <strong>{{ compareTarget.name }}</strong></span
            >
          </div>
          <button class="compare-clear-btn" @click="clearCompare">
            ✕ Remover
          </button>
        </div>

        <!-- Normal skills grid -->
        <div v-if="!compareTarget" class="skills-grid">
          <div
            v-for="(s, i) in skills"
            :key="s.name + i"
            class="skill-card card"
          >
            <div class="skill-header">
              <div
                class="skill-badge"
                :style="{ background: rarityColor + '22', color: rarityColor }"
              >
                {{ initials }}
              </div>
              <div class="skill-eyebrow">
                LEVEL {{ s.level }}
                <span v-if="s.evolved" class="evolved-tag"
                  >◇ {{ $t("skill.evolved") }}</span
                >
              </div>
            </div>
            <div class="skill-name">{{ s.name }}</div>
            <div class="skill-stats">
              <div class="stat-row">
                <span class="stat-label">{{ $t("skill.minDamage") }}</span
                ><span class="stat-val">{{ s.damage[0] }}</span>
              </div>
              <div class="stat-row">
                <span class="stat-label">{{ $t("skill.maxDamage") }}</span
                ><span class="stat-val">{{ s.damage[1] }}</span>
              </div>
            </div>
            <div v-if="s.effect && s.effect.chance > 0" class="skill-effect">
              <div class="effect-eyebrow">{{ $t("skill.effect") }}</div>
              <span class="effect-name">{{ s.effect.effect.name }}</span>
              · {{ Math.round(s.effect.chance * 100) }}% ·
              {{ s.effect.effect.turns }}t
              <span v-if="s.effect.effect.type === 1"
                >· {{ s.effect.effect.range[0] }}-{{
                  s.effect.effect.range[1]
                }}
                {{ $t("skill.minDamage") }}</span
              >
              <span v-if="s.effect.effect.type === 2"
                >· {{ s.effect.effect.range[0] }}-{{
                  s.effect.effect.range[1]
                }}
                {{ $t("skill.minHeal") }}</span
              >
              <span v-if="s.effect.effect.type === 3"
                >· {{ $t("skill.stun") }}</span
              >
              <span v-if="s.effect.effect.type === 4"
                >· {{ $t("skill.reducedDamage") }}
                {{ s.effect.effect.range[0] }}%</span
              >
              <span v-if="s.effect.effect.type === 5"
                >· {{ $t("skill.reflectNext") }}</span
              >
              <span v-if="s.effect.effect.type === 6"
                >· {{ $t("skill.fragility") }}
                {{ s.effect.effect.range[0] }}%</span
              >
            </div>
          </div>
        </div>

        <!-- Compare skills grid -->
        <div v-else class="skills-compare-grid">
          <div v-for="(s, i) in skills" :key="i" class="skill-compare-row">
            <!-- Current rooster skill -->
            <div class="skill-card card skill-compare-card skill-compare-left">
              <div class="skill-header">
                <div
                  class="skill-badge"
                  :style="{
                    background: rarityColor + '22',
                    color: rarityColor,
                  }"
                >
                  {{ initials }}
                </div>
                <div class="skill-eyebrow">LEVEL {{ s.level }}</div>
              </div>
              <div class="skill-name">{{ s.name }}</div>
              <div class="skill-stats">
                <div class="stat-row">
                  <span class="stat-label">{{ $t("skill.minDamage") }}</span
                  ><span class="stat-val" :style="compareSkills[i] ? dmgColor(s.damage[0], compareSkills[i].damage[0]) : {}">{{ s.damage[0] }}</span>
                </div>
                <div class="stat-row">
                  <span class="stat-label">{{ $t("skill.maxDamage") }}</span
                  ><span class="stat-val" :style="compareSkills[i] ? dmgColor(s.damage[1], compareSkills[i].damage[1]) : {}">{{ s.damage[1] }}</span>
                </div>
              </div>
              <div v-if="s.effect && s.effect.chance > 0" class="skill-effect">
                <div class="effect-eyebrow">{{ $t("skill.effect") }}</div>
                <span class="effect-name">{{ s.effect.effect.name }}</span>
                · {{ Math.round(s.effect.chance * 100) }}% ·
                {{ s.effect.effect.turns }}t
                <span v-if="s.effect.effect.type === 1"
                  >· {{ s.effect.effect.range[0] }}-{{
                    s.effect.effect.range[1]
                  }}
                  {{ $t("skill.minDamage") }}</span
                >
                <span v-if="s.effect.effect.type === 2"
                  >· {{ s.effect.effect.range[0] }}-{{
                    s.effect.effect.range[1]
                  }}
                  {{ $t("skill.minHeal") }}</span
                >
                <span v-if="s.effect.effect.type === 3"
                  >· {{ $t("skill.stun") }}</span
                >
                <span v-if="s.effect.effect.type === 4"
                  >· {{ $t("skill.reducedDamage") }}
                  {{ s.effect.effect.range[0] }}%</span
                >
                <span v-if="s.effect.effect.type === 5"
                  >· {{ $t("skill.reflectNext") }}</span
                >
                <span v-if="s.effect.effect.type === 6"
                  >· {{ $t("skill.fragility") }}
                  {{ s.effect.effect.range[0] }}%</span
                >
              </div>
            </div>

            <div class="skill-compare-vs">VS</div>

            <!-- Opponent skill at same index -->
            <template v-if="compareSkills[i]">
              <div
                class="skill-card card skill-compare-card skill-compare-right"
              >
                <div class="skill-header">
                  <div
                    class="skill-badge"
                    :style="{
                      background: rarityHex(compareTarget.rarity) + '22',
                      color: rarityHex(compareTarget.rarity),
                    }"
                  >
                    {{ compareTarget.name.slice(0, 2).toUpperCase() }}
                  </div>
                  <div class="skill-eyebrow">
                    LEVEL {{ compareSkills[i].level }}
                  </div>
                </div>
                <div class="skill-name">{{ compareSkills[i].name }}</div>
                <div class="skill-stats">
                  <div class="stat-row">
                    <span class="stat-label">{{ $t("skill.minDamage") }}</span
                    ><span class="stat-val" :style="dmgColor(compareSkills[i].damage[0], s.damage[0])">{{
                      compareSkills[i].damage[0]
                    }}</span>
                  </div>
                  <div class="stat-row">
                    <span class="stat-label">{{ $t("skill.maxDamage") }}</span
                    ><span class="stat-val" :style="dmgColor(compareSkills[i].damage[1], s.damage[1])">{{
                      compareSkills[i].damage[1]
                    }}</span>
                  </div>
                </div>
                <div
                  v-if="
                    compareSkills[i].effect &&
                      compareSkills[i].effect.chance > 0
                  "
                  class="skill-effect"
                >
                  <div class="effect-eyebrow">{{ $t("skill.effect") }}</div>
                  <span class="effect-name">{{
                    compareSkills[i].effect.effect.name
                  }}</span>
                  · {{ Math.round(compareSkills[i].effect.chance * 100) }}% ·
                  {{ compareSkills[i].effect.effect.turns }}t
                  <span v-if="compareSkills[i].effect.effect.type === 1"
                    >· {{ compareSkills[i].effect.effect.range[0] }}-{{
                      compareSkills[i].effect.effect.range[1]
                    }}
                    {{ $t("skill.minDamage") }}</span
                  >
                  <span v-if="compareSkills[i].effect.effect.type === 2"
                    >· {{ compareSkills[i].effect.effect.range[0] }}-{{
                      compareSkills[i].effect.effect.range[1]
                    }}
                    {{ $t("skill.minHeal") }}</span
                  >
                  <span v-if="compareSkills[i].effect.effect.type === 3"
                    >· {{ $t("skill.stun") }}</span
                  >
                  <span v-if="compareSkills[i].effect.effect.type === 4"
                    >· {{ $t("skill.reducedDamage") }}
                    {{ compareSkills[i].effect.effect.range[0] }}%</span
                  >
                  <span v-if="compareSkills[i].effect.effect.type === 5"
                    >· {{ $t("skill.reflectNext") }}</span
                  >
                  <span v-if="compareSkills[i].effect.effect.type === 6"
                    >· {{ $t("skill.fragility") }}
                    {{ compareSkills[i].effect.effect.range[0] }}%</span
                  >
                </div>
              </div>
            </template>
            <div
              v-else
              class="skill-card card skill-compare-card skill-compare-right skill-compare-empty"
            >
              —
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
          <div v-for="(skin, i) in skins" :key="i" class="skin-card card">
            <div :style="skinRingStyle(skin.rarity)" class="skin-rarity-ring">
              <div class="skin-img-wrap">
                <img :src="skin.value" :alt="skin.name" class="skin-img" />
              </div>
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

    <!-- Compare modal (picker only) -->
    <div v-if="compareOpen" class="compare-overlay" @click.self="closeCompare">
      <div class="compare-panel">
        <div class="compare-head">
          <div class="h-display" style="font-size:22px">
            {{ $t("compare.title") }}
          </div>
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
              v-for="r in compareFiltered"
              :key="r.name"
              class="compare-option"
              @mousedown.prevent="selectCompareTarget(r)"
            >
              <img :src="compareOptionSprite(r)" class="compare-option-img" />
              <span class="compare-option-name">{{ r.name }}</span>
              <span
                class="compare-option-star"
                :style="{ color: rarityHex(r.rarity) }"
                >★</span
              >
            </button>
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
import axios from "axios";
import ArrowIcon from "../components/icons/ArrowIcon.vue";
import { GetCosmeticInfo, GetClasses, GetSprites, GetEffects } from "../trade/info";

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
      compareTarget: null,
      compareTargetSprite: "",
      compareDropdownOpen: false,
    };
  },
  computed: {
    compareFiltered() {
      const q = this.compareName.toLowerCase().trim();
      const list = this.classes.slice(1);
      const filtered = q
        ? list.filter((c) => c.name && c.name.toLowerCase().includes(q))
        : list;
      return filtered.slice(0, 30);
    },
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
    rarityBorderStyle() {
      if (this.current.rarity === 5) {
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
      const all = this.classes
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
            c.sprite,
        );
      const sameRarity = all.filter((c) => c.rarity === this.current.rarity);
      const pool = sameRarity.length >= 2 ? sameRarity : all;
      const shuffled = [...pool];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled.slice(0, 6);
    },
    skins() {
      return this.allSkins.filter(
        (s) => s.type === 5 || (s.type === 2 && s.extra === this.currentIndex + 1),
      );
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
    skinRingStyle(r) {
      if (r === 5) {
        return {
          background:
            "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)",
          padding: "3px",
          borderRadius: "15px",
          overflow: "hidden",
        };
      }
      return {
        background: RARITY_HEX[r] || "#9ca3af",
        padding: "3px",
        borderRadius: "15px",
        overflow: "hidden",
      };
    },
    fetchSkills(cls) {
      const locale = this.$i18n.locale || "pt";
      return axios
        .get(
          `https://info.asurabot.com.br/attacks/${cls.name}.json?language=${locale}`,
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
    compareOptionSprite(r) {
      const idx = this.classes.findIndex((c) => c.name === r.name);
      return this.sprites[idx - 1] || "";
    },
    async selectCompareTarget(r) {
      this.compareDropdownOpen = false;
      this.compareTarget = r;
      const idx = this.classes.findIndex((c) => c.name === r.name);
      this.compareTargetSprite = this.sprites[idx - 1] || "";
      this.compareSkills = await this.fetchSkills(r);
      this.compareOpen = false;
    },
    async loadAll() {
      try {
        const [classes, sprites, effects] = await Promise.all([
          GetClasses(),
          GetSprites(),
          GetEffects(),
        ]);
        this.classes = classes;
        this.sprites = sprites[0];
        this.effects = effects;
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
  background: linear-gradient(
    135deg,
    rgba(105, 56, 239, 0.06),
    rgba(105, 56, 239, 0.02)
  );
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
  padding-bottom: 20px;
}
.skills-title {
  font-size: 48px;
  margin: 8px 0 0;
  letter-spacing: -0.02em;
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
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: flex-end;
  text-align: right;
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
.skin-rarity-ring {
  width: 100%;
  border-radius: 15px;
  overflow: hidden;
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
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid var(--r);
  color: var(--r);
  font-weight: 700;
  font-size: 11px;
  font-family: var(--font-mono);
  letter-spacing: 0.08em;
  text-transform: uppercase;
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

/* Inline compare grid */
.skills-compare-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.skill-compare-row {
  display: grid;
  grid-template-columns: 1fr 36px 1fr;
  gap: 0;
  align-items: stretch;
}
.skill-compare-card {
  flex: 1;
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
    gap: 0;
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
  .skins-grid {
    grid-template-columns: 1fr;
  }
  .others-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
