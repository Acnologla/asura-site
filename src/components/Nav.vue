<template>
  <nav :class="['site-nav', { 'nav-scrolled': scrolled }]">
    <div class="nav-inner">
      <router-link :to="{ name: 'Home' }" class="logo-btn">
        <div class="logo-square">
          <img
            src="https://cdn.asurabot.com.br/cdn/etc/bot_image.png"
            alt="AsuraBot"
            class="logo-img"
          />
        </div>
        <div class="logo-text">
          Asura<span style="color: var(--primary)">Bot</span>
        </div>
      </router-link>

      <div class="nav-links" v-if="!isMobile">
        <router-link
          v-for="item in navItems"
          :key="item.id"
          :to="item.to"
          custom
          v-slot="{ href, navigate, isActive }"
        >
          <a
            :href="href"
            :class="['nav-link', { active: isActive }]"
            @click="navigate"
            >{{ item.label }}</a
          >
        </router-link>
        <a href="/#asura-card" class="nav-link" @click.prevent="goAsuraCards">
          {{ $t("nav.asuraCards") }}
        </a>
      </div>

      <div class="nav-actions" v-if="!isMobile">
        <div class="lang-toggle">
          <button
            v-for="l in ['pt', 'en']"
            :key="l"
            :class="['lang-btn', { active: $i18n.locale === l }]"
            @click="setLang(l)"
          >
            {{ l }}
          </button>
        </div>
        <a
          class="btn btn-ghost"
          href="https://discord.gg/CfkBZyVsd7"
          target="_blank"
          rel="noopener"
          @click="trackDiscordJoin('nav')"
        >
          <DiscordIcon :size="16" />
          {{ $t("nav.supportServer") || "Support Server" }}
        </a>
        <a class="btn btn-primary" href="#" @click.prevent="invite('nav')">
          <DiscordIcon :size="16" />
          {{ $t("nav.addMe") }}
        </a>
      </div>

      <div class="nav-actions" v-else>
        <div class="lang-toggle">
          <button
            v-for="l in ['pt', 'en']"
            :key="l"
            :class="['lang-btn', 'compact', { active: $i18n.locale === l }]"
            @click="setLang(l)"
          >
            {{ l }}
          </button>
        </div>
        <button class="burger" @click="menuOpen = !menuOpen" aria-label="Menu">
          <svg
            v-if="!menuOpen"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
            />
          </svg>
          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>
    </div>

    <div class="mobile-sheet" v-if="isMobile && menuOpen">
      <router-link
        v-for="item in navItems"
        :key="item.id"
        :to="item.to"
        custom
        v-slot="{ href, navigate, isActive }"
      >
        <a
          :href="href"
          :class="['mobile-link', { active: isActive }]"
          @click="
            (e) => {
              navigate(e);
              menuOpen = false;
            }
          "
          >{{ item.label }}</a
        >
      </router-link>
      <a href="/#asura-card" class="mobile-link" @click.prevent="goAsuraCards">
        {{ $t("nav.asuraCards") }}
      </a>
      <a
        class="btn btn-primary mobile-cta"
        href="#"
        @click.prevent="invite('nav-mobile')"
      >
        <DiscordIcon :size="16" />
        {{ $t("nav.addMe") }}
      </a>
      <a
        class="btn btn-ghost mobile-cta"
        href="https://discord.gg/CfkBZyVsd7"
        target="_blank"
        rel="noopener"
        @click="trackDiscordJoin('nav-mobile')"
      >
        <DiscordIcon :size="16" />
        {{ $t("nav.supportServer") || "Support Server" }}
      </a>
    </div>
  </nav>
</template>

<script>
import posthog from "posthog-js";
import DiscordIcon from "./icons/DiscordIcon.vue";

export default {
  name: "Nav",
  components: { DiscordIcon },
  data() {
    return {
      scrolled: false,
      menuOpen: false,
      isMobile: false,
    };
  },
  computed: {
    navItems() {
      return [
        { id: "home", to: { name: "Home" }, label: this.$t("nav.about") },
        { id: "galos", to: { name: "Galos" }, label: this.$t("nav.roosters") },
        { id: "pets", to: { name: "Pets" }, label: this.$t("nav.pigeons") },
        {
          id: "bg",
          to: { name: "Backgrounds" },
          label: this.$t("nav.backgrounds"),
        },
        {
          id: "extras",
          to: { name: "Extras" },
          label: this.$t("nav.extras"),
        },
        {
          id: "donate",
          to: { name: "Donate" },
          label: this.$t("nav.donations"),
        },
      ];
    },
  },
  watch: {
    $route() {
      this.menuOpen = false;
    },
  },
  mounted() {
    this.onScroll = () => {
      this.scrolled = window.scrollY > 8;
    };
    this.onResize = () => {
      this.isMobile = window.innerWidth < 1024;
    };
    this.onResize();
    window.addEventListener("scroll", this.onScroll, { passive: true });
    window.addEventListener("resize", this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    setLang(l) {
      this.$i18n.locale = l;
      try {
        localStorage.setItem("locale", l);
      } catch (e) {
        /* ignore */
      }
    },
    invite(location) {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "conversion", {
          send_to: "AW-11526751589/-iaDCOaJj_4ZEOWKsfgq",
          value: 10.0,
          currency: "BRL",
        });
      }
      posthog.capture("bot_invite_clicked", { location });
      const route = this.$router.resolve({ name: "Invite" });
      window.open(route.href, "_blank");
    },
    trackDiscordJoin(location) {
      posthog.capture("discord_join_clicked", { location });
    },
    goAsuraCards() {
      this.menuOpen = false;
      const scroll = () => {
        const el = document.getElementById("asura-card");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      };
      const scrollAfterLayout = () => {
        scroll();
        setTimeout(scroll, 700);
      };

      if (this.$route.name === "Home") {
        scrollAfterLayout();
        return;
      }

      this.$router
        .push({ name: "Home" })
        .catch(() => {})
        .finally(() => {
          this.$nextTick(scrollAfterLayout);
        });
    },
  },
};
</script>

<style scoped>
.site-nav {
  position: sticky;
  top: 0;
  z-index: 50;
  transition: background 0.2s ease;
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  padding: 0 28px;
}

@media (min-width: 1024px) {
  .nav-inner {
    height: 56px;
    max-width: 1420px;
    margin: 0 auto;
  }
}

.logo-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  color: var(--ink);
}

.logo-square {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 4px 12px -2px rgba(74, 31, 209, 0.5);
}
.logo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.logo-text {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 18px;
  letter-spacing: -0.01em;
  color: var(--ink);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 28px;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.lang-toggle {
  display: inline-flex;
  padding: 3px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid var(--line);
  box-shadow: var(--shadow-sm);
}
.lang-btn {
  padding: 5px 11px;
  border-radius: 999px;
  border: 0;
  background: transparent;
  color: var(--ink-2);
  font-weight: 700;
  font-size: 11px;
  font-family: var(--font-mono);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
}
.lang-btn.compact {
  padding: 4px 9px;
}
.lang-btn.active {
  background: var(--ink);
  color: #fff;
}

.burger {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: #fff;
  color: var(--ink);
  border: 1px solid var(--line);
  cursor: pointer;
  display: grid;
  place-items: center;
}

.mobile-sheet {
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  background: #fff;
  border-bottom: 1px solid var(--line);
  box-shadow: var(--shadow);
  padding: 18px 18px 22px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  animation: slideDown 0.2s ease;
}
.mobile-link {
  background: transparent;
  color: var(--ink);
  border: 0;
  padding: 12px 14px;
  border-radius: 10px;
  text-align: left;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
}
.mobile-link.active {
  background: var(--primary-soft);
  color: var(--primary-ink);
}
.mobile-cta {
  margin-top: 12px;
  padding: 14px 18px;
}

@media (max-width: 1023px) {
  .nav-inner {
    height: 60px;
  }
}

@media (max-width: 768px) {
  .nav-inner {
    padding: 0 18px;
  }
}

@media (max-width: 450px) {
  .nav-inner {
    padding: 0 12px;
  }
}
</style>
