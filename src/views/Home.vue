<template>
  <div>
    <!-- ─── HERO ─── -->
    <section class="home-section hero-section">
      <div class="container hero-grid">
        <div>
          <div class="pill hero-pill">
            <span class="hero-pill-dot" />
            {{ $t("home.heroPill") }}
          </div>
          <h1 class="h-display hero-title">
            {{ $t("home.heroLine1") }}<br />
            {{ $t("home.heroLine2") }}<br />
            <span style="color: var(--primary)">{{
              $t("home.heroLine3a")
            }}</span>
            {{ $t("home.heroLine3b") }}
          </h1>
          <p class="hero-sub">{{ $t("home.heroSub") }}</p>
          <div class="hero-actions">
            <a href="#" class="btn btn-primary" @click.prevent="invite">
              <DiscordIcon :size="18" />
              {{ $t("home.addToDiscord") }}
            </a>
            <a
              href="https://discord.gg/CfkBZyVsd7"
              class="btn btn-ghost"
              target="_blank"
              rel="noopener"
            >
              <DiscordIcon :size="18" />
              {{ $t("nav.supportServer") || "Support Server" }}
            </a>
            <div class="hero-secondary-actions">
              <router-link to="/galos" class="hero-text-link">
                {{ $t("home.seeRoosters") }}
                <ArrowIcon :size="14" />
              </router-link>
              <a
                href="#asura-card"
                class="hero-text-link"
                @click.prevent="scrollAsuraCard"
              >
                {{ $t("home.seeAsuraCards") }}
                <ArrowIcon :size="14" />
              </a>
            </div>
          </div>
          <div class="hero-meta">
            <span class="hero-meta-pill">
              <span class="hero-meta-dot" />
              {{ $t("home.activeServers") }}
            </span>
          </div>
        </div>

        <HeroVisual :rooster="heroRooster" />
      </div>
    </section>

    <!-- ─── FEATURES ─── -->
    <section class="home-section">
      <div class="container">
        <div class="features-head">
          <div class="eyebrow" style="font-size: 15px;">
            {{ $t("home.howItWorks") }}
          </div>
          <h2 class="h-display features-title">
            {{ $t("home.howTitleA") }}
            <span style="color: var(--primary)">{{
              $t("home.howTitleB")
            }}</span>
            {{ $t("home.howTitleC") }}
          </h2>
          <p class="features-sub">{{ $t("home.howSub") }}</p>
        </div>
        <div class="features-grid">
          <div v-for="(f, i) in features" :key="i" class="card feature-card">
            <FeatureArt :kind="f.art" />
            <div class="feature-head-row">
              <div class="feature-num">{{ i + 1 }}</div>
              <div class="eyebrow" style="font-size: 11px">{{ f.eyebrow }}</div>
            </div>
            <h3 class="feature-title">{{ f.title }}</h3>
            <p class="feature-desc">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── MODOS ─── -->
    <section class="home-section" id="modos">
      <div class="container">
        <div class="modos-head">
          <div>
            <div class="modos-tag">
              <span>§ 03</span>
              <span class="modos-tag-line" />
              <span>{{ $t("home.modos") }}</span>
            </div>
            <h2 class="h-display modos-title">
              {{ $t("home.modosTitleA") }}<br />
              <span class="modos-title-em">{{ $t("home.modosTitleB") }}</span>
            </h2>
          </div>
          <p class="modos-sub">{{ $t("home.modosSub") }}</p>
        </div>

        <div class="modes-grid">
          <div
            v-for="m in modos"
            :key="m.nome"
            class="mode-card card"
            :class="{ 'mode-featured': m.featured }"
          >
            <div class="mode-card-top">
              <div
                class="mode-icon"
                :class="{ 'mode-icon-featured': m.featured }"
              >
                {{ m.icon }}
              </div>
              <span v-if="m.featured" class="mode-featured-badge">★ TOP 3</span>
            </div>
            <div class="mode-card-name">{{ m.nome }}</div>
            <div class="mode-card-desc">{{ m.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── ASURA CARD ─── -->
    <section id="asura-card" class="asura-card-section">
      <div class="container asura-card-grid">
        <div class="asura-card-copy">
          <div class="eyebrow">{{ $t("home.asuraCardEyebrow") }}</div>
          <h2 class="h-display asura-card-title">
            {{ $t("home.asuraCardTitleA") }}<br />
            <span>{{ $t("home.asuraCardTitleB") }}</span>
          </h2>
          <p class="asura-card-sub">{{ $t("home.asuraCardSub") }}</p>

          <div class="asura-card-points">
            <span>{{ $t("home.asuraCardPoint1") }}</span>
            <span>{{ $t("home.asuraCardPoint2") }}</span>
            <span>{{ $t("home.asuraCardPoint3") }}</span>
          </div>

          <a
            class="btn btn-primary asura-card-btn"
            :href="asuraCardInviteUrl"
            target="_blank"
            rel="noopener"
          >
            <DiscordIcon :size="18" />
            {{ $t("home.asuraCardBtn") }}
          </a>
        </div>

        <button
          class="asura-card-visual"
          type="button"
          :aria-label="$t('home.asuraCardOpenPreview')"
          @click="openAsuraCardPreview"
        >
          <img
            :src="asuraCardPreview"
            :alt="$t('home.asuraCardAlt')"
            class="asura-card-image"
          />
          <span class="asura-card-zoom-label">
            {{ $t("home.asuraCardOpenPreview") }}
          </span>
        </button>
      </div>
    </section>

    <div
      v-if="asuraCardPreviewOpen"
      class="asura-card-modal"
      role="dialog"
      aria-modal="true"
      :aria-label="$t('home.asuraCardOpenPreview')"
      @click.self="closeAsuraCardPreview"
    >
      <button
        class="asura-card-modal-close"
        type="button"
        @click="closeAsuraCardPreview"
      >
        {{ $t("home.asuraCardClosePreview") }}
      </button>
      <img
        :src="asuraCardPreview"
        :alt="$t('home.asuraCardAlt')"
        class="asura-card-modal-image"
      />
    </div>

    <!-- ─── COMANDOS ─── -->
    <section class="home-section commands-section" id="comandos">
      <div class="container commands-grid">
        <div>
          <div class="eyebrow">{{ $t("home.cmdsEyebrow") }}</div>
          <h2 class="h-display commands-title">
            {{ $t("home.cmdsTitleA") }}<br />
            {{ $t("home.cmdsTitleB") }}
            <span style="color: var(--primary)">j!</span>
          </h2>
          <p class="commands-sub">{{ $t("home.cmdsSub") }}</p>
          <a
            class="btn btn-dark"
            href="https://docs.asurabot.com.br"
            target="_blank"
            rel="noopener"
          >
            {{ $t("home.cmdsBtn") }}
            <ArrowIcon />
          </a>
        </div>
        <div class="commands-list">
          <div v-for="c in commands" :key="c.cmd" class="card command-card">
            <span class="cmd command-pill">{{ c.cmd }}</span>
            <span class="command-desc">{{ c.desc }}</span>
            <ArrowIcon :size="14" />
          </div>
        </div>
      </div>
    </section>

    <!-- ─── RARIDADES ─── -->
    <section class="raridades-section">
      <div class="raridades-line" />
      <div class="container">
        <div class="raridades-tags">
          <span>§ 04 / {{ $t("home.raritiesEyebrow") }}</span>
          <span>·</span>
          <span>{{ classes.length }} {{ $t("home.type") }}</span>
        </div>
        <div class="raridades-grid">
          <div>
            <h2 class="h-display raridades-title">
              {{ $t("home.raritiesTitleA") }}<br />
              <span class="raridades-title-em">{{
                $t("home.raritiesTitleB")
              }}</span>
            </h2>
          </div>
          <div>
            <p class="raridades-sub">{{ $t("home.raritiesSub") }}</p>
            <router-link to="/galos" class="btn raridades-btn">
              {{ $t("home.raritiesBtn") }}
              <ArrowIcon />
            </router-link>
          </div>
        </div>

        <div
          class="catalog-strip"
          :class="{ 'catalog-strip--hidden': !catalogVisible }"
        >
          <button
            v-for="(c, i) in catalogStrip"
            :key="c.index + '-' + i"
            class="catalog-cell"
            @click="goRooster(c.index)"
          >
            <div class="catalog-idx">
              {{ c.name.toUpperCase() }}
            </div>
            <div
              :style="catalogRingStyle(c.rarity)"
              class="catalog-rarity-ring"
            >
              <div class="catalog-img-wrap">
                <img :src="c.sprite" :alt="c.name" class="catalog-img" />
              </div>
            </div>
            <div class="catalog-row">
              <div class="catalog-name">{{ c.name }}</div>
              <div
                class="catalog-rarity"
                :style="{ color: rarityHex(c.rarity) }"
              >
                {{ rarityName(c.rarity) }}
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>

    <!-- ─── CTA ─── -->
    <section class="cta-section">
      <div class="container">
        <div class="card cta-card">
          <div class="eyebrow">{{ $t("home.ctaEyebrow") }}</div>
          <h2 class="h-display cta-title">
            {{ $t("home.ctaTitleA") }}<br />
            {{ $t("home.ctaTitleB") }}
            <span style="color: var(--primary)">{{ $t("home.ctaTitleC") }}</span
            >.
          </h2>
          <p class="cta-sub">{{ $t("home.ctaSub") }}</p>
          <div class="cta-actions">
            <a href="#" class="btn btn-primary" @click.prevent="invite">
              <DiscordIcon :size="18" />
              {{ $t("home.addToDiscord") }}
            </a>
            <router-link to="/donate" class="btn btn-ghost">
              {{ $t("home.ctaSupport") }}
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import DiscordIcon from "../components/icons/DiscordIcon.vue";
import ArrowIcon from "../components/icons/ArrowIcon.vue";
import HeroVisual from "../components/home/HeroVisual.vue";
import FeatureArt from "../components/home/FeatureArt.vue";
import asuraCardPreviewPt from "../assets/asura-card-preview.png";
import asuraCardPreviewEn from "../assets/asura-card-preview-en.png";

const ASURA_CARD_INVITE_URL =
  "https://discordapp.com/oauth2/authorize?client_id=1483228177127182416&scope=applications.commands%20bot&permissions=8";
const HERO_MS = 3500;
const CATALOG_MS = 4500;
const RARITY_HEX = [
  "#9ca3af",
  "#3b82f6",
  "#a855f7",
  "#f59e0b",
  "#ef4444",
  "#14b8a6",
  "#FF00FF",
];
const RARITY_NAMES = {
  pt: ["Comum", "Raro", "Épico", "Lendário", "Especial", "Mítico", "Deus"],
  en: ["Common", "Rare", "Epic", "Legendary", "Special", "Mythic", "God"],
};

export default {
  name: "Home",
  components: {
    DiscordIcon,
    ArrowIcon,
    HeroVisual,
    FeatureArt,
  },
  data() {
    return {
      classes: [],
      sprites: [],
      heroIdx: 0,
      catalogIndices: [],
      catalogVisible: true,
      heroTimer: null,
      catalogTimer: null,
      isMobile: false,
      asuraCardPreviewOpen: false,
      previousBodyOverflow: "",
      asuraCardInviteUrl: ASURA_CARD_INVITE_URL,
    };
  },
  computed: {
    asuraCardPreview() {
      return this.$i18n.locale === "en"
        ? asuraCardPreviewEn
        : asuraCardPreviewPt;
    },
    pairs() {
      // Build [{ name, sprite, rarity, advantages, disadvantages, index }] aligned by index
      const out = [];
      const offset =
        this.classes[0] && /404/.test(this.classes[0].name) ? 1 : 0;
      for (let i = 1; i < this.classes.length; i++) {
        const cls = this.classes[i];
        const sprite = this.sprites[i - offset];
        if (!cls || !sprite) continue;
        out.push({
          name: cls.name,
          sprite,
          rarity: cls.rarity,
          advantages: this.advantagesFor(i),
          disadvantages: cls.disadvantages || [],
          index: i - 1,
        });
      }
      return out;
    },
    heroRooster() {
      return this.pairs[this.heroIdx] || null;
    },
    catalogStrip() {
      return this.catalogIndices
        .map((i) => this.pairs[i])
        .filter(Boolean)
        .slice(0, this.isMobile ? 4 : 6);
    },
    features() {
      return [
        {
          eyebrow: this.$t("home.featStart"),
          title: this.$t("home.featStartTitle"),
          desc: this.$t("home.featStartDesc"),
          art: "rarity",
        },
        {
          eyebrow: this.$t("home.featProg"),
          title: this.$t("home.featProgTitle"),
          desc: this.$t("home.featProgDesc"),
          art: "training",
        },
        {
          eyebrow: this.$t("home.featComp"),
          title: this.$t("home.featCompTitle"),
          desc: this.$t("home.featCompDesc"),
          art: "rank",
        },
      ];
    },
    commands() {
      return [
        { cmd: "j!galo", desc: this.$t("home.cmdsDesc1") || "Veja seu galo" },
        {
          cmd: "j!train",
          desc: this.$t("home.cmdsDesc2") || "Treine seu galo",
        },
        {
          cmd: "j!mission",
          desc: this.$t("home.cmdsDesc3") || "Missões diárias",
        },
        {
          cmd: "j!raid",
          desc: this.$t("home.cmdsDesc4") || "Forme equipe para raids",
        },
        {
          cmd: "j!money",
          desc: this.$t("home.cmdsDesc5") || "Veja seu Gold e moedas",
        },
        {
          cmd: "j!upgrades",
          desc: this.$t("home.cmdsDesc6") || "Gerencie upgrades",
        },
      ];
    },
    modos() {
      const pt = this.$i18n.locale === "pt";
      const data = [
        [
          "Arena",
          pt
            ? "Lute contra outros jogadores com limite de vitórias e derrotas."
            : "Battle other players with win/loss daily limits.",
          "PVP",
          "⚔",
          false,
        ],
        [
          pt ? "Ranqueada" : "Ranked",
          pt
            ? "Suba de rank e ganhe Elo em batalhas oficiais."
            : "Climb up the ranks and earn Elo in official battles.",
          "PVP",
          "★",
          false,
        ],
        [
          "Raid",
          pt
            ? "Enfrente bosses com até 5 jogadores cooperativos."
            : "Face bosses with up to 5 cooperative players.",
          "CO-OP",
          "⚡",
          false,
        ],
        [
          pt ? "Torre" : "Tower",
          pt
            ? "Modo semanal com andares progressivos e recompensas crescentes."
            : "Weekly mode with progressive floors and growing rewards.",
          "WEEKLY",
          "▲",
          false,
        ],
        [
          pt ? "Torneio" : "Tournament",
          pt
            ? "Eventos automáticos com recompensas para o Top 3."
            : "Automatic events with rewards for the Top 3.",
          "AUTO",
          "♛",
          true,
        ],
        [
          "Portal",
          pt
            ? "Eventos em grupo com tempo limitado e drops únicos."
            : "Group events with time limit and unique drops.",
          "TIMED",
          "◎",
          false,
        ],
        [
          pt ? "História" : "Story",
          pt
            ? "Episódios com progressão e recompensas por estrelas."
            : "Episodes with progression and star-based rewards.",
          "SOLO",
          "✦",
          false,
        ],
        [
          "Challenge",
          pt
            ? "Desafios periódicos com prêmios exclusivos."
            : "Periodic challenges with exclusive prizes.",
          "DAILY",
          "◆",
          false,
        ],
        [
          "Boss",
          pt
            ? "Bosses com múltiplas formas e cooldown longo."
            : "Bosses with multiple forms and long cooldown.",
          "PVE",
          "☠",
          false,
        ],
        [
          "Survival",
          pt
            ? "Sobreviva o máximo possível com recompensas crescentes."
            : "Survive as long as you can with growing rewards.",
          "ENDLESS",
          "∞",
          false,
        ],
        [
          "Server Battle",
          pt
            ? "Evento automático entre servidores inteiros."
            : "Automatic event between entire servers.",
          "SERVER",
          "⚑",
          false,
        ],
      ];
      return data.map(([nome, desc, tag, icon, featured]) => ({
        nome,
        desc,
        tag,
        icon,
        featured,
      }));
    },
  },
  methods: {
    advantagesFor(galoIndex) {
      const out = [];
      this.classes.forEach((c, j) => {
        if (j === 0) return;
        if (c.disadvantages && c.disadvantages.includes(galoIndex)) {
          out.push(c.name);
        }
      });
      return out;
    },
    rand(max) {
      return Math.floor(Math.random() * max);
    },
    pickIndices(n) {
      const max = this.pairs.length;
      if (max === 0) return [];
      const out = [];
      const seen = new Set();
      let guard = 0;
      while (out.length < n && guard < n * 10) {
        const i = this.rand(max);
        if (!seen.has(i)) {
          seen.add(i);
          out.push(i);
        }
        guard++;
      }
      return out;
    },
    rarityHex(r) {
      return RARITY_HEX[r] || "#9ca3af";
    },
    rarityName(r) {
      const lang = this.$i18n.locale === "en" ? "en" : "pt";
      return RARITY_NAMES[lang][r] || "";
    },
    catalogRingStyle(r) {
      const color =
        r === 5 ? "rgba(184,39,252,0.7)" : RARITY_HEX[r] || "#9ca3af";
      return { boxShadow: `0 0 0 1px ${color}` };
    },
    rotateHero() {
      if (this.pairs.length === 0) return;
      this.heroIdx = this.rand(this.pairs.length);
    },
    rotateCatalog() {
      if (this.pairs.length === 0) return;
      this.catalogVisible = false;
      setTimeout(() => {
        this.catalogIndices = this.pickIndices(6);
        this.catalogVisible = true;
      }, 320);
    },
    onResize() {
      this.isMobile = window.innerWidth < 768;
    },
    invite() {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "conversion", {
          send_to: "AW-11526751589/-iaDCOaJj_4ZEOWKsfgq",
          value: 10.0,
          currency: "BRL",
        });
      }
      const route = this.$router.resolve({ name: "Invite" });
      window.open(route.href, "_blank");
    },
    scrollAsuraCard() {
      const scroll = () => {
        const el = document.getElementById("asura-card");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      };

      scroll();
      setTimeout(scroll, 700);
    },
    openAsuraCardPreview() {
      if (this.asuraCardPreviewOpen) return;
      this.asuraCardPreviewOpen = true;
      if (typeof document !== "undefined") {
        this.previousBodyOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
      }
    },
    closeAsuraCardPreview() {
      if (!this.asuraCardPreviewOpen) return;
      this.asuraCardPreviewOpen = false;
      if (typeof document !== "undefined") {
        document.body.style.overflow = this.previousBodyOverflow;
      }
    },
    goRooster(index) {
      this.$router.push({ name: "Galo", query: { galo: index } });
    },
    async loadData() {
      const locale = this.$i18n.locale || "pt";
      try {
        const [spritesRes, classesRes] = await Promise.all([
          axios.get(
            `https://info.asurabot.com.br/sprites.json?language=${locale}`,
          ),
          axios.get(
            `https://info.asurabot.com.br/class.json?language=${locale}`,
          ),
        ]);
        this.sprites = spritesRes.data[0];
        this.classes = classesRes.data;
        this.rotateHero();
        this.rotateCatalog();
      } catch (e) {
        // Network error is non-fatal — page still renders.
      } finally {
        await this.$nextTick();
        document.dispatchEvent(new Event("app-rendered"));
      }
    },
  },
  async created() {
    await this.loadData();
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize);
    this.onKeydown = (e) => {
      if (e.key === "Escape") {
        this.closeAsuraCardPreview();
      }
    };
    window.addEventListener("keydown", this.onKeydown);
    this.heroTimer = setInterval(this.rotateHero, HERO_MS);
    this.catalogTimer = setInterval(this.rotateCatalog, CATALOG_MS);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("keydown", this.onKeydown);
    this.closeAsuraCardPreview();
    if (this.heroTimer) clearInterval(this.heroTimer);
    if (this.catalogTimer) clearInterval(this.catalogTimer);
  },
  watch: {
    "$i18n.locale"() {
      this.loadData();
    },
  },
};
</script>

<style scoped>
/* ─── Hero ─── */

.hero-section {
  padding-top: 60px;
  padding-bottom: 80px;
}

@media (min-width: 1024px) {
  .hero-section {
    padding-top: 28px;
  }
}
.hero-grid {
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: 60px;
  align-items: center;
}
.hero-pill {
  margin-bottom: 28px;
}
.hero-pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: var(--primary);
  box-shadow: 0 0 0 4px rgba(105, 56, 239, 0.18);
}
.hero-title {
  font-size: 72px;
  margin: 0 0 20px;
}
.hero-sub {
  font-size: 18px;
  line-height: 1.55;
  color: var(--ink-2);
  max-width: 520px;
  margin: 0 0 28px;
}
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 28px;
}
.hero-actions .btn {
  padding: 14px 22px;
  font-size: 15px;
}
.hero-secondary-actions {
  flex-basis: 100%;
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 4px;
}
.hero-text-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  position: relative;
  color: var(--primary);
  font-size: 15px;
  font-weight: 800;
  line-height: 1.2;
  padding: 8px 2px;
}
.hero-text-link::after {
  content: "";
  position: absolute;
  left: 2px;
  right: 2px;
  bottom: 3px;
  height: 2px;
  background: currentColor;
  border-radius: 999px;
  opacity: 0.24;
  transform: scaleX(0.55);
  transform-origin: left;
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.hero-text-link svg {
  color: var(--primary);
  transition: transform 0.18s ease;
}
.hero-text-link:hover {
  color: var(--primary-deep);
}
.hero-text-link:hover::after {
  opacity: 0.65;
  transform: scaleX(1);
}
.hero-text-link:hover svg {
  transform: translate(2px, -2px);
}
.hero-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  color: var(--ink-3);
  font-size: 12px;
  flex-wrap: wrap;
  font-family: var(--font-mono);
  letter-spacing: 0.06em;
}
.hero-meta-pill {
  display: flex;
  align-items: center;
  gap: 8px;
}
.hero-meta-dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: var(--emerald);
}

@media (max-width: 768px) {
  .hero-section {
    padding: 32px 0 48px;
  }
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .hero-title {
    font-size: 40px;
  }
  .hero-sub {
    font-size: 16px;
  }
  .hero-actions {
    flex-direction: column;
  }
  .hero-actions .btn {
    justify-content: center;
  }
  .hero-secondary-actions {
    justify-content: center;
    gap: 14px;
    margin-top: 0;
  }
  .hero-text-link {
    font-size: 14px;
    min-height: 36px;
  }
}

/* ─── Features ─── */
.features-head {
  text-align: center;
  margin-bottom: 20px;
}
.features-title {
  font-size: 56px;
  margin: 12px 0 16px;
}
.features-sub {
  font-size: 17px;
  color: var(--ink-2);
  max-width: 900px;
  margin: 0 auto;
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.feature-card {
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.feature-head-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.feature-num {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: var(--primary-soft);
  color: var(--primary);
  display: grid;
  place-items: center;
  font-family: var(--font-display);
  font-weight: 700;
}
.feature-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 24px;
  margin: 0;
  line-height: 1.15;
}
.feature-desc {
  color: var(--ink-2);
  font-size: 14px;
  line-height: 1.55;
  margin: 0;
}

@media (max-width: 768px) {
  .features-head {
    margin-bottom: 40px;
  }
  .features-title {
    font-size: 32px;
  }
  .features-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  .feature-card {
    padding: 22px;
  }
  .feature-title {
    font-size: 22px;
  }
}

/* ─── Asura Card ─── */
.asura-card-section {
  padding: 86px 0;
  background: #14101f;
  color: #fff;
  overflow: hidden;
  scroll-margin-top: 80px;
}
.asura-card-grid {
  display: grid;
  grid-template-columns: 0.82fr 1.18fr;
  gap: 56px;
  align-items: center;
}
.asura-card-copy .eyebrow {
  color: var(--amber);
}
.asura-card-title {
  color: #fff;
  font-size: 52px;
  margin: 12px 0 18px;
}
.asura-card-title span {
  color: var(--amber);
  font-style: italic;
  font-weight: 500;
}
.asura-card-sub {
  max-width: 480px;
  margin: 0 0 24px;
  color: rgba(255, 255, 255, 0.72);
  font-size: 16px;
  line-height: 1.6;
}
.asura-card-points {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 26px;
}
.asura-card-points span {
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 999px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 12px;
  font-weight: 600;
  padding: 7px 11px;
}
.asura-card-btn {
  padding: 14px 22px;
  font-size: 15px;
}
.asura-card-visual {
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.04);
  box-shadow: 0 30px 70px -35px rgba(0, 0, 0, 0.72);
  overflow: hidden;
  padding: 0;
  position: relative;
  width: 100%;
  cursor: zoom-in;
  transition: border-color 0.18s ease, transform 0.18s ease;
}
.asura-card-visual:hover {
  border-color: rgba(240, 165, 0, 0.62);
  transform: translateY(-2px);
}
.asura-card-image {
  display: block;
  width: 100%;
  aspect-ratio: 970 / 715;
  object-fit: cover;
}
.asura-card-zoom-label {
  position: absolute;
  right: 14px;
  bottom: 14px;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(20, 16, 31, 0.86);
  color: #fff;
  font-size: 12px;
  font-weight: 800;
  line-height: 1;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.asura-card-visual:hover .asura-card-zoom-label,
.asura-card-visual:focus-visible .asura-card-zoom-label {
  opacity: 1;
  transform: translateY(0);
}
.asura-card-modal {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: 72px 24px 28px;
  background: rgba(8, 6, 14, 0.88);
  backdrop-filter: blur(10px);
}
.asura-card-modal-image {
  display: block;
  max-width: min(1180px, 96vw);
  max-height: 86vh;
  width: auto;
  height: auto;
  border-radius: 14px;
  box-shadow: 0 28px 90px -28px rgba(0, 0, 0, 0.9);
}
.asura-card-modal-close {
  position: fixed;
  top: 22px;
  right: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 14px;
  font-weight: 800;
  padding: 10px 16px;
}
.asura-card-modal-close:hover {
  background: rgba(255, 255, 255, 0.18);
}

@media (max-width: 768px) {
  .asura-card-section {
    padding: 56px 0;
  }
  .asura-card-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .asura-card-title {
    font-size: 34px;
  }
  .asura-card-sub {
    font-size: 15px;
  }
  .asura-card-btn {
    width: 100%;
  }
  .asura-card-visual {
    border-radius: 12px;
  }
  .asura-card-zoom-label {
    opacity: 1;
    transform: none;
    right: 10px;
    bottom: 10px;
    padding: 7px 10px;
  }
  .asura-card-modal {
    padding: 70px 10px 18px;
  }
  .asura-card-modal-image {
    max-width: 100%;
    max-height: 82vh;
    border-radius: 10px;
  }
  .asura-card-modal-close {
    top: 16px;
    right: 14px;
  }
}

/* ─── Commands ─── */
.commands-section {
  background: var(--bg-2);
}
.commands-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}
.commands-title {
  font-size: 48px;
  margin: 12px 0 20px;
}
.commands-sub {
  color: var(--ink-2);
  font-size: 16px;
  line-height: 1.55;
  margin-bottom: 24px;
  max-width: 440px;
}
.commands-list {
  display: grid;
  gap: 10px;
}
.command-card {
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: transform 0.15s;
}
.command-card:hover {
  transform: translateX(4px);
}
.command-pill {
  min-width: 90px;
  text-align: center;
  flex-shrink: 0;
}
.command-desc {
  font-size: 14px;
  color: var(--ink-2);
  flex: 1;
}

@media (max-width: 768px) {
  .commands-section {
    padding: 56px 0;
  }
  .commands-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .commands-title {
    font-size: 32px;
  }
  .commands-sub {
    font-size: 15px;
  }
  .command-card {
    padding: 14px 16px;
    gap: 12px;
  }
  .command-pill {
    min-width: 80px;
  }
  .command-desc {
    font-size: 13px;
  }
}

/* ─── Modos ─── */
.modos-head {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 60px;
  align-items: end;
  margin-bottom: 40px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--line);
}
.modos-tag {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.18em;
  color: var(--ink-3);
  text-transform: uppercase;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.modos-tag-line {
  width: 16px;
  height: 1px;
  background: var(--ink-3);
}
.modos-title {
  font-size: 56px;
  margin: 0;
  line-height: 1;
}
.modos-title-em {
  font-style: italic;
  font-weight: 500;
  color: var(--ink-3);
}
.modos-sub {
  font-size: 16px;
  color: var(--ink-2);
  line-height: 1.55;
  margin: 0;
  max-width: 420px;
}

.modes-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}
.mode-card {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  transition: transform 0.15s;
  cursor: default;
}
.mode-card:hover {
  transform: translateY(-2px);
}
.mode-featured {
  grid-column: span 2;
  background: var(--ink);
  color: #fff;
  border-color: transparent;
}
.mode-card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
}
.mode-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: var(--primary-soft);
  color: var(--primary);
  display: grid;
  place-items: center;
  font-size: 16px;
  flex-shrink: 0;
}
.mode-icon-featured {
  background: rgba(251, 191, 36, 0.2);
  color: #fbbf24;
}
.mode-featured-badge {
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--amber);
  color: #1a0a3a;
  font-size: 10px;
  font-family: var(--font-mono);
  font-weight: 700;
  letter-spacing: 0.06em;
}
.mode-card-name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 20px;
  line-height: 1.1;
}
.mode-featured .mode-card-name {
  font-size: 28px;
}
.mode-card-desc {
  font-size: 13px;
  color: var(--ink-2);
  line-height: 1.5;
  margin: 0;
}
.mode-featured .mode-card-desc {
  color: rgba(255, 255, 255, 0.6);
}

@media (max-width: 1024px) {
  .modes-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .mode-featured {
    grid-column: span 3;
  }
}
@media (max-width: 768px) {
  .modos-head {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-bottom: 28px;
  }
  .modos-title {
    font-size: 36px;
  }
  .modos-sub {
    font-size: 15px;
  }
  .modes-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  .mode-featured {
    grid-column: span 2;
  }
  .mode-card {
    padding: 16px;
    gap: 8px;
  }
  .mode-card-name {
    font-size: 17px;
  }
  .mode-featured .mode-card-name {
    font-size: 22px;
  }
  .mode-card-desc {
    font-size: 12px;
  }
}

/* ─── Raridades ─── */
.raridades-section {
  padding: 100px 0;
  background: var(--ink);
  color: #fff;
  position: relative;
  overflow: hidden;
}
.raridades-line {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 1px;
  background: rgba(255, 255, 255, 0.06);
}
.raridades-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  font-family: var(--font-mono);
  font-size: 14px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 28px;
}
.raridades-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 80px;
  align-items: start;
  margin-bottom: 56px;
}
.raridades-title {
  font-size: 80px;
  margin: 0 0 20px;
  color: #fff;
  line-height: 0.98;
  letter-spacing: -0.03em;
}
.raridades-title-em {
  font-style: italic;
  font-weight: 500;
  color: var(--amber);
}
.raridades-sub {
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
  line-height: 1.6;
  margin: 0 0 22px;
  max-width: 440px;
}
.raridades-btn {
  background: var(--amber);
  color: #1a0a3a;
  padding: 14px 22px;
  font-weight: 700;
}
.raridades-btn:hover {
  color: #1a0a3a;
  filter: brightness(1.06);
}

.catalog-strip {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 14px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  transition: opacity 0.28s ease, transform 0.28s ease;
}
.catalog-strip--hidden {
  opacity: 0;
  transform: translateY(10px);
}
.catalog-cell {
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: inherit;
}
.catalog-idx {
  font-family: var(--font-mono);
  font-size: 10px;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 0.12em;
}
.catalog-rarity-ring {
  width: 100%;
  border-radius: 14px;
}
.catalog-img-wrap {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.06);
  display: grid;
  place-items: center;
  overflow: hidden;
}
.catalog-img {
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
}
.catalog-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-top: 2px;
}
.catalog-name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 18px;
  color: #fff;
}
.catalog-rarity {
  font-size: 10px;
  font-family: var(--font-mono);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.home-section {
  padding: 3rem 1.5rem;
}

@media (max-width: 768px) {
  .raridades-section {
    padding: 60px 0;
  }
  .raridades-grid {
    grid-template-columns: 1fr;
    gap: 36px;
    margin-bottom: 36px;
  }
  .raridades-title {
    font-size: 44px;
  }
  .raridades-sub {
    font-size: 15px;
  }
  .catalog-strip {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  .catalog-name {
    font-size: 16px;
  }
  .home-section {
    padding: 0px 0 30px;
  }
}

/* ─── CTA ─── */
.cta-section {
  padding: 40px 0 0px;
}
.cta-card {
  padding: 56px;
  text-align: center;
}
.cta-title {
  font-size: 56px;
  margin: 12px 0 16px;
}
.cta-sub {
  font-size: 16px;
  color: var(--ink-2);
  max-width: 500px;
  margin: 0 auto 28px;
}
.cta-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}
.cta-actions .btn {
  padding: 14px 24px;
  font-size: 15px;
}

@media (max-width: 768px) {
  .cta-card {
    padding: 40px 24px;
  }
  .cta-title {
    font-size: 32px;
  }
  .cta-sub {
    font-size: 15px;
  }
  .cta-actions {
    flex-direction: column;
  }
}
</style>
