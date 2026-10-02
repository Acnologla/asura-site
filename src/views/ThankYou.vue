<template>
  <main class="thank-you-page">
    <div class="container">
      <div class="card thank-you-card">
        <div class="success-icon">✓</div>
        <h1 class="h-display">
          {{ completed ? "Tudo pronto!" : "Autorização não concluída" }}
        </h1>
        <p>
          {{
            completed
              ? "O Asura foi adicionado ao seu servidor. Volte ao Discord para começar a jogar."
              : "Não recebemos a confirmação do Discord. Você pode tentar adicionar o Asura novamente."
          }}
        </p>
        <router-link :to="{ name: 'Home' }" class="btn btn-primary">
          Voltar para o site
        </router-link>
      </div>
    </div>
  </main>
</template>

<script>
import { trackMetaEvent } from "../analytics/metaPixel";

export default {
  name: "ThankYou",
  computed: {
    completed() {
      return Boolean(this.$route.query.code);
    },
  },
  mounted() {
    if (!this.completed) return;

    const storageKey = `meta-complete-registration:${this.$route.query.code}`;

    try {
      if (sessionStorage.getItem(storageKey)) return;
      sessionStorage.setItem(storageKey, "1");
    } catch (_) {
      // Track the conversion even when session storage is unavailable.
    }

    trackMetaEvent("CompleteRegistration");
  },
};
</script>

<style scoped>
.thank-you-page {
  padding: 120px 0;
}

.thank-you-card {
  max-width: 560px;
  margin: 0 auto;
  padding: 56px 40px;
  text-align: center;
}

.success-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 20px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #e8f8ee;
  color: #218c4b;
  font-size: 36px;
  font-weight: 700;
}

h1 {
  margin: 0 0 14px;
  font-size: 32px;
}

p {
  max-width: 420px;
  margin: 0 auto 28px;
  color: var(--ink-2);
  line-height: 1.6;
}
</style>
