<template>
  <div id="app">
    <Nav />
    <main class="app-main">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Nav from "./components/Nav";
import Footer from "./components/Footer";

if (typeof window !== "undefined" && window.gtag) {
  window.gtag("event", "conversion", {
    send_to: "AW-11526751589/R_svCOOJj_4ZEOWKsfgq",
    value: 1.0,
    currency: "BRL",
  });
}

export default {
  components: { Nav, Footer },
};
</script>

<style>
#app {
  font-family: var(--font-body);
  color: var(--ink);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.app-main {
  flex: 1;
}
</style>
