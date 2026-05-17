<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="brand-row">
            <div class="brand-square">A</div>
            <div class="brand-name">AsuraBot</div>
          </div>
          <p class="brand-desc">{{ $t("footer.description") }}</p>
        </div>

        <div class="footer-col">
          <div class="col-title">{{ $t("footer.asura") }}</div>
          <router-link :to="{ name: 'Home' }" class="footer-link">{{
            $t("footer.about")
          }}</router-link>
          <router-link :to="{ name: 'Galos' }" class="footer-link">{{
            $t("footer.roosterList")
          }}</router-link>
          <router-link :to="{ name: 'Donate' }" class="footer-link">{{
            $t("footer.donate")
          }}</router-link>
        </div>

        <div class="footer-col">
          <div class="col-title">{{ $t("footer.rinha") }}</div>
          <a
            href="https://docs.asurabot.com.br/"
            target="_blank"
            rel="noopener"
            class="footer-link"
            >{{ $t("footer.rinhaT") }}</a
          >
          <router-link :to="{ name: 'RinhaInfo' }" class="footer-link">{{
            $t("footer.rinhaInfo")
          }}</router-link>
          <a
            href="https://discord.gg/bn8yYNNNF3"
            target="_blank"
            rel="noopener"
            class="footer-link"
            >{{ $t("footer.supportServer") }}</a
          >
          <a
            href="https://top.gg/bot/470684281102925844"
            target="_blank"
            rel="noopener"
            class="footer-link"
            >{{ $t("footer.vote") }}</a
          >
        </div>

        <div class="footer-col">
          <div class="col-title">Legal</div>
          <router-link :to="{ name: 'Terms' }" class="footer-link"
            >Terms</router-link
          >
          <router-link :to="{ name: 'Privacy' }" class="footer-link"
            >Privacy</router-link
          >
        </div>
      </div>

      <div class="footer-bottom">
        <div>© {{ year }} Asura Bot. {{ $t("footer.allRights") }}</div>
        <div>{{ $t("footer.madeWith") }}</div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return { year: new Date().getFullYear() };
  },
};
</script>

<style scoped>
.site-footer {
  background: var(--ink);
  color: #cfc6df;
  padding: 80px 0 40px;
  margin-top: 80px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
}

.footer-brand .brand-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}
.brand-square {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: linear-gradient(135deg, #7c4dff 0%, #4a1fd1 100%);
  display: grid;
  place-items: center;
  color: #fff;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 18px;
}
.brand-name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 20px;
  color: #fff;
}
.brand-desc {
  font-size: 14px;
  line-height: 1.6;
  color: #9b91b0;
  max-width: 320px;
  margin: 0;
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.col-title {
  font-weight: 700;
  color: #fff;
  margin-bottom: 6px;
  font-size: 13px;
}
.footer-link {
  font-size: 13px;
  color: #cfc6df;
  background: none;
  border: 0;
  padding: 0;
  text-align: left;
  cursor: pointer;
  font-family: inherit;
}
.footer-link:hover {
  color: #fff;
}

.footer-bottom {
  margin-top: 56px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: #7e7497;
}

@media (max-width: 768px) {
  .site-footer {
    padding: 48px 0 28px;
    margin-top: 40px;
  }
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
  .footer-brand {
    grid-column: 1 / -1;
  }
  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
