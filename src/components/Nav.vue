<template>
  <b-navbar
    centered
    :type="dark ? 'is-dark' : ''"
    class="nav"
    style="box-shadow: 0px 0px 20px rgba(0,0,0,0.1);max-width: 100vw;"
    fixed-top
  >
    <template #brand>
      <b-navbar-item
        style="margin-left: 30px"
        tag="router-link"
        :to="{ name: 'Home' }"
      >
        <span class="navTitle">Asura Bot</span>
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item href="#about" @click="about" class="navItem">
        Sobre
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'Galos' }" class="navItem">
        Galos
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'Pets' }" class="navItem">
        Pombos
      </b-navbar-item>
      <b-navbar-item
        tag="router-link"
        :to="{ name: 'Backgrounds' }"
        class="navItem"
      >
        Backgrounds
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'Donate' }" class="navItem">
        Doaçoes
      </b-navbar-item>
      <b-navbar-item
        tag="router-link"
        :to="{ name: 'Commands' }"
        class="navItem"
      >
        Comandos
      </b-navbar-item>
    </template>
    <template #end>
      <b-navbar-item class="navItem" @click="changeTheme">
        <font-awesome-icon v-if="dark" icon="sun" />
        <font-awesome-icon v-else icon="moon" />
      </b-navbar-item>
      <b-navbar-item tag="div" id="add" style="margin-right: 30px">
        <div>
          <a target="_blank" @click="btn" href="#" class="button is-primary">
            <span style="font-weight: 500"> Me adicione</span>
          </a>
        </div>
      </b-navbar-item>
    </template>
    <template slot-scope="{ toggleActive }" slot="burger">
      <a
        style="margin-top:5px;margin-right: 30px"
        role="button"
        @click="toggleActive"
        aria-label="menu"
        class="navbar-burger burger"
        ><span aria-hidden="true"></span><span aria-hidden="true"></span
        ><span aria-hidden="true"></span
      ></a>
    </template>
  </b-navbar>
</template>

<style>
@media screen and (max-width: 1024px) {
  #add {
    margin-right: 0px !important;
  }
}
.navTitle {
  font-weight: 600;
  color: rgb(76, 86, 106);
  font-family: Rubik;
  font-size: 30px;
}
.navItem {
  font-weight: 400;
  font-family: Rubik;
  font-size: 20px;
}
[data-theme="dark"] .navTitle {
  color: #eceff4;
}
[data-theme="dark"] .navItem {
  color: #eceff4;
}
[data-theme="dark"] .navItem:hover {
  color: grey;
  background-color: #1d1f21;
}
[data-theme="dark"] .nav,
[data-theme="dark"] .navbar-menu {
  background-color: #2a2d32 !important;
}
</style>
<script>
export default {
  name: "Nav",
  data() {
    return {
      dark: document.body.hasAttribute("theme"),
    };
  },
  mounted() {
    if (localStorage.getItem("theme") === "dark") {
      this.dark = true;
    }
    this.applyTheme();
  },
  methods: {
    about() {
      if (this.$route.name !== "Home") {
        this.$router.push({ name: "Home" });
        document.getElementById("about").scrollIntoView();
      }
    },
    btn() {
      gtag("event", "conversion", {
        send_to: "AW-11526751589/-iaDCOaJj_4ZEOWKsfgq",
        value: 10.0,
        currency: "BRL",
      });
      window.open(
        "https://discordapp.com/oauth2/authorize?client_id=470684281102925844&scope=applications.commands%20bot&permissions=8",
        "_blank"
      );
    },
    changeTheme() {
      this.dark
        ? localStorage.removeItem("theme")
        : localStorage.setItem("theme", "dark");
      this.dark = !this.dark;
      this.applyTheme();
    },
    applyTheme() {
      this.dark
        ? document.body.setAttribute("data-theme", "dark")
        : document.body.removeAttribute("data-theme");
    },
  },
};
</script>
