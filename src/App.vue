<template>
  <div id="app">
    <Nav />
    <router-view style="margin-top: 70px" />
    <Footer />
  </div>
</template>

<style>
#app {
  font-family: Rubik, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

hr {
  height: 2px !important;
  margin: 1rem 0 !important;
}

a {
  color: #7957d5;
}

body {
  min-height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

.title {
  color: #4c566a !important;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
[data-theme="dark"] {
  background-color: #2a2d32;
  color: #eceff4;
}
[data-theme="dark"] #app {
  color: #eceff4;
}
[data-theme="dark"] .card {
  background-color: #1d1f21;
  color: #eceff4;
}
[data-theme="dark"] .card-footer {
  border-top-color: #2a2d32;
}
</style>

<script>
import Nav from "./components/Nav";
import Footer from "./components/Footer";
window.gtag("event", "conversion", {
  send_to: "AW-11526751589/R_svCOOJj_4ZEOWKsfgq",
  value: 1.0,
  currency: "BRL",
});

export default {
  components: { Nav, Footer },
};
</script>
