<template>
  <div class="event-page">
    <section class="event-hero">
      <div class="container event-hero-grid">
        <div class="event-hero-copy">
          <div class="event-kicker"><span class="event-kicker-dot" /> EVENTO ESPECIAL · ELEIÇÕES DO BRASIL</div>
          <h1 class="h-display event-title">Escolha um lado.<br />Leve a eleição para <span>seu servidor.</span></h1>
          <p class="event-subtitle">Adicione o AsuraBot, escolha o candidato que você quer apoiar e acompanhe a disputa com a sua comunidade.</p>
          <div class="event-actions">
            <a href="#" class="btn btn-primary" @click.prevent="invite('event-hero')"><DiscordIcon :size="18" />Adicionar ao Discord</a>
            <a href="https://discord.gg/CfkBZyVsd7" class="btn btn-ghost" target="_blank" rel="noopener" @click="trackDiscordJoin('event-hero')"><DiscordIcon :size="18" />Entrar no suporte</a>
          </div>
        </div>

        <div class="event-showcase">
          <div class="showcase-topline"><span>PAINEL ELEITORAL</span><span class="showcase-live"><i /> EVENTO AO VIVO</span></div>
          <div class="showcase-candidates">
            <div
              v-for="(candidate, index) in showcaseCandidates"
              :key="candidate.id"
              :class="['showcase-candidate', `showcase-candidate--${candidate.id}`]"
            >
              <div class="showcase-candidate-meta"><span>0{{ index + 1 }}</span><span>{{ candidate.id === 77 ? "NA DISPUTA" : "LIDERANÇA" }}</span></div>
              <div class="showcase-image-wrap"><img v-if="candidate.sprite" :src="candidate.sprite" :alt="candidate.name" /></div>
              <div class="showcase-candidate-name">{{ candidate.shortName }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="candidatos" class="event-candidates">
      <div class="container">
        <div class="candidates-heading">
          <div><div class="eyebrow">§ 02 / CANDIDATOS</div><h2 class="h-display candidates-title">Quem recebe seu <span>apoio?</span></h2></div>
          <p>Estes são os sete galos que fazem parte do evento eleitoral.</p>
        </div>
        <div class="candidate-grid">
          <article v-for="candidate in candidates" :key="candidate.id" class="candidate-card card">
            <div class="candidate-number">CANDIDATO {{ candidate.number }}</div>
            <div class="candidate-image-wrap"><img v-if="candidate.sprite" :src="candidate.sprite" :alt="candidate.name" /><div v-else class="candidate-placeholder" /></div>
            <h3 class="h-display">{{ candidate.name }}</h3>
            <button class="candidate-button" type="button" @click="support(candidate)">Apoiar</button>
          </article>
        </div>
      </div>
    </section>

    <section class="how-section">
      <div class="container">
        <div class="section-heading section-heading--center">
          <div class="eyebrow">§ 03 / COMO PARTICIPAR</div>
          <h2 class="h-display">A eleição começa no <span>seu servidor.</span></h2>
          <p>Entre no evento em poucos passos e acompanhe cada nova atualização.</p>
        </div>
        <div class="how-flow">
          <article class="how-step">
            <div class="how-number">01 / ENTRAR</div>
            <h3>Adicione o AsuraBot</h3>
            <p>Convide o bot para levar o evento à sua comunidade.</p>
            <a href="#" @click.prevent="invite('event-how-to-join')">Adicionar o bot <ArrowIcon :size="15" /></a>
          </article>
          <article class="how-step">
            <div class="how-number">02 / APOIAR</div>
            <h3>Escolha seu candidato</h3>
            <p>Veja os sete galos da eleição e decida quem você representa.</p>
            <a href="#candidatos">Ver candidatos <ArrowIcon :size="15" /></a>
          </article>
          <article class="how-step">
            <div class="how-number">03 / ACOMPANHAR</div>
            <h3>Fique por dentro</h3>
            <p>Entre no suporte para acompanhar as novidades da disputa.</p>
            <a href="https://discord.gg/CfkBZyVsd7" target="_blank" rel="noopener" @click="trackDiscordJoin('event-how-to-follow')">Entrar no suporte <ArrowIcon :size="15" /></a>
          </article>
        </div>
      </div>
    </section>

    <section class="event-cta-section">
      <div class="container"><div class="event-cta-card card">
        <div class="eyebrow">EVENTO ELEIÇÕES DO BRASIL</div>
        <h2 class="h-display">Pronto para entrar <span>na disputa?</span></h2>
        <p>Convide o AsuraBot ou entre no servidor de suporte para não perder nenhuma novidade.</p>
        <div class="event-actions event-actions--center">
          <a href="#" class="btn btn-primary" @click.prevent="invite('event-footer')"><DiscordIcon :size="18" />Adicionar ao Discord</a>
          <a href="https://discord.gg/CfkBZyVsd7" class="btn btn-ghost" target="_blank" rel="noopener" @click="trackDiscordJoin('event-footer')">Entrar no suporte<ArrowIcon :size="16" /></a>
        </div>
      </div></div>
    </section>
  </div>
</template>

<script>
import posthog from "posthog-js";
import { GetClasses, GetSprites } from "../trade/info";
import { trackMetaEvent } from "../analytics/metaPixel";
import DiscordIcon from "../components/icons/DiscordIcon.vue";
import ArrowIcon from "../components/icons/ArrowIcon.vue";

const EVENT_CANDIDATE_IDS = [76, 77, 78, 79, 80, 81, 82];
const CANDIDATE_NUMBERS = {
  76: 14,
  77: 13,
  78: 22,
  79: 60,
  80: 70,
  81: 28,
  82: 30,
};

export default {
  name: "Event",
  components: { DiscordIcon, ArrowIcon },
  data() {
    return { classes: [], sprites: [] };
  },
  computed: {
    candidates() {
      return EVENT_CANDIDATE_IDS.map((id) => {
        const rooster = this.classes[id] || {};
        return {
          id,
          number: CANDIDATE_NUMBERS[id],
          name: rooster.name || `Candidato ${id}`,
          shortName: (rooster.name || "").split(" ")[0] || `#${id}`,
          sprite: this.sprites[id - 1] || "",
        };
      });
    },
    showcaseCandidates() {
      return [76, 78, 77]
        .map((id) => this.candidates.find((candidate) => candidate.id === id))
        .filter(Boolean);
    },
  },
  methods: {
    async load() {
      try {
        const [classes, sprites] = await Promise.all([GetClasses(), GetSprites()]);
        this.classes = classes;
        this.sprites = sprites[0];
      } catch (e) {
        // The event page remains usable if the catalog is temporarily unavailable.
      } finally {
        await this.$nextTick();
        document.dispatchEvent(new Event("app-rendered"));
      }
    },
    invite(location) {
      if (typeof window !== "undefined" && window.gtag) window.gtag("event", "conversion", { send_to: "AW-11526751589/-iaDCOaJj_4ZEOWKsfgq", value: 10.0, currency: "BRL" });
      posthog.capture("bot_invite_clicked", { location });
      window.open(this.$router.resolve({ name: "Invite" }).href, "_blank");
    },
    trackDiscordJoin(location) {
      posthog.capture("discord_join_clicked", { location });
      trackMetaEvent("InitiateCheckout");
    },
    support(candidate) {
      posthog.capture("election_candidate_supported", { candidate_id: candidate.id, candidate_name: candidate.name });
      this.invite(`event-candidate-${candidate.id}`);
    },
  },
  created() { this.load(); },
  watch: { "$i18n.locale"() { this.load(); } },
};
</script>

<style scoped>
.event-hero { padding: 72px 0 88px; background: radial-gradient(circle at 88% 15%, rgba(105, 56, 239, 0.18), transparent 30%), linear-gradient(135deg, #fbfaff, #eeebf8); }
.event-hero-grid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 70px; align-items: center; }
.event-kicker { display: flex; align-items: center; gap: 9px; color: var(--ink-3); font-family: var(--font-mono); font-size: 11px; font-weight: 700; letter-spacing: 0.12em; }.event-kicker-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--emerald); }
.event-title { margin: 16px 0 20px; font-size: 64px; line-height: 0.99; }.event-title span, .section-heading h2 span, .candidates-title span, .event-cta-card h2 span { color: var(--primary); font-style: italic; font-weight: 500; }.event-subtitle { max-width: 560px; margin: 0 0 26px; color: var(--ink-2); font-size: 18px; line-height: 1.55; }
.event-actions { display: flex; flex-wrap: wrap; gap: 10px; }.event-actions .btn { padding: 14px 20px; }
.event-showcase { padding: 18px; background: var(--ink); box-shadow: var(--shadow-lg); color: #fff; }.showcase-topline { display: flex; justify-content: space-between; align-items: center; color: rgba(255, 255, 255, 0.55); font-family: var(--font-mono); font-size: 10px; font-weight: 700; letter-spacing: 0.12em; }.showcase-live { display: inline-flex; align-items: center; gap: 7px; color: #fff; }.showcase-live i { width: 6px; height: 6px; border-radius: 50%; background: #42d392; box-shadow: 0 0 0 4px rgba(66, 211, 146, 0.15); }
.showcase-candidates { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 16px; }.showcase-candidate { min-width: 0; overflow: hidden; background: #25145f; }.showcase-candidate--78 { background: #684109; }.showcase-candidate--77 { background: #17624c; }.showcase-candidate-meta { display: flex; justify-content: space-between; align-items: center; padding: 10px 10px 8px; color: rgba(255, 255, 255, 0.72); font-family: var(--font-mono); font-size: 8px; font-weight: 700; letter-spacing: 0.09em; }.showcase-candidate--76 .showcase-candidate-meta, .showcase-candidate--78 .showcase-candidate-meta { color: var(--amber); }.showcase-image-wrap { height: 172px; overflow: hidden; background: rgba(0, 0, 0, 0.14); }.showcase-image-wrap img { display: block; width: 100%; height: 100%; object-fit: contain; }.showcase-candidate-name { padding: 12px 10px 13px; color: #fff; font-family: var(--font-display); font-size: 21px; font-weight: 700; letter-spacing: -0.02em; }
.how-section { padding: 84px 0; background: var(--bg-2); }.section-heading { margin-bottom: 32px; }.section-heading--center { max-width: 760px; margin-right: auto; margin-left: auto; text-align: center; }.section-heading h2 { margin: 10px 0 14px; font-size: 52px; line-height: 1; }.section-heading p { margin: 0; color: var(--ink-2); font-size: 16px; line-height: 1.55; }.how-flow { display: grid; grid-template-columns: repeat(3, 1fr); overflow: hidden; background: var(--ink); border-radius: var(--radius-lg); box-shadow: var(--shadow); }.how-step { min-height: 260px; padding: 32px; color: #fff; display: flex; flex-direction: column; align-items: flex-start; border-right: 1px solid rgba(255, 255, 255, 0.13); }.how-step:last-child { border-right: 0; }.how-number { margin-bottom: 42px; color: var(--amber); font-family: var(--font-mono); font-size: 11px; font-weight: 700; letter-spacing: 0.12em; }.how-step h3 { margin: 0 0 9px; font-family: var(--font-display); font-size: 26px; line-height: 1.08; }.how-step p { max-width: 260px; margin: 0 0 22px; color: rgba(255, 255, 255, 0.65); font-size: 14px; line-height: 1.55; }.how-step a { display: inline-flex; align-items: center; gap: 8px; margin-top: auto; color: #fff; font-size: 13px; font-weight: 700; }.how-step a:hover { color: var(--amber); }
.event-candidates { padding: 84px 0; }.candidates-heading { display: flex; justify-content: space-between; gap: 40px; align-items: flex-end; padding-bottom: 26px; border-bottom: 1px solid var(--line); margin-bottom: 30px; }.candidates-title { margin: 8px 0 0; font-size: 52px; }.candidates-heading p { max-width: 365px; margin: 0; color: var(--ink-2); line-height: 1.55; }.candidate-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }.candidate-card { padding: 16px; display: flex; flex-direction: column; align-items: flex-start; transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease; }.candidate-card:hover { transform: translateY(-4px); box-shadow: var(--shadow); }.candidate-number { margin-bottom: 10px; color: var(--ink-3); font-family: var(--font-mono); font-size: 10px; font-weight: 700; letter-spacing: 0.1em; }.candidate-image-wrap { width: 100%; aspect-ratio: 1; display: grid; place-items: center; overflow: hidden; border-radius: 12px; background: linear-gradient(135deg, #efeaf7, #ddd2f3); }.candidate-image-wrap img { width: 88%; height: 88%; object-fit: contain; }.candidate-placeholder { width: 44%; height: 44%; border-radius: 12px; background: rgba(255,255,255,0.5); }.candidate-card h3 { font-size: 23px; margin: 16px 0 14px; line-height: 1.05; }.candidate-button { width: 100%; display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: 1px solid var(--primary); border-radius: 9px; padding: 10px 12px; background: var(--primary); color: #fff; cursor: pointer; font: inherit; font-size: 13px; font-weight: 700; }.candidate-button:hover { background: var(--primary-deep); border-color: var(--primary-deep); }
.event-cta-section { padding: 0 0 4px; }.event-cta-card { padding: 58px; text-align: center; }.event-cta-card h2 { margin: 12px 0 16px; font-size: 54px; }.event-cta-card p { max-width: 530px; margin: 0 auto 28px; color: var(--ink-2); line-height: 1.55; }.event-actions--center { justify-content: center; }
@media (max-width: 900px) { .event-hero-grid { grid-template-columns: 1fr; gap: 42px; }.candidate-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 768px) { .event-hero { padding: 48px 0 60px; }.event-title { font-size: 44px; }.event-subtitle { font-size: 16px; }.event-actions { flex-direction: column; }.event-actions .btn { justify-content: center; }.event-showcase { padding: 14px; }.showcase-candidates { grid-template-columns: repeat(2, 1fr); }.showcase-image-wrap { height: 142px; }.showcase-candidate-meta { padding: 8px 8px 6px; font-size: 7px; }.showcase-candidate-name { padding: 9px 8px 10px; font-size: 17px; }.showcase-candidate--77 { grid-column: span 2; display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: auto 1fr; }.showcase-candidate--77 .showcase-candidate-meta { grid-column: 2; grid-row: 1; padding-bottom: 0; }.showcase-candidate--77 .showcase-image-wrap { grid-column: 1; grid-row: 1 / span 2; height: 116px; }.showcase-candidate--77 .showcase-candidate-name { align-self: end; grid-column: 2; grid-row: 2; padding-top: 4px; }.how-section, .event-candidates { padding: 56px 0; }.section-heading h2, .candidates-title, .event-cta-card h2 { font-size: 38px; }.how-flow { grid-template-columns: 1fr; }.how-step { min-height: 0; padding: 24px; border-right: 0; border-bottom: 1px solid rgba(255, 255, 255, 0.13); }.how-step:last-child { border-bottom: 0; }.how-number { margin-bottom: 20px; }.how-step p { margin-bottom: 16px; }.how-step a { margin-top: 0; }.candidates-heading { align-items: flex-start; flex-direction: column; gap: 14px; }.candidate-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }.candidate-card { padding: 11px; }.candidate-card h3 { font-size: 18px; }.candidate-button { padding: 9px 6px; font-size: 11px; }.event-cta-card { padding: 42px 22px; } }
</style>
