<template>
  <footer class="footer" style="margin-top: 50px">
    <div
      style="
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: center;
      "
    >
      <img
        width="50"
        height="50"
        style="border-radius: 50%"
        src="https://cdn.discordapp.com/avatars/470684281102925844/e1dfb36e69e5b83f081f8ee3ba1adbd3.webp?size=512"
      />
      <h3 style="margin-left: 10px; font-size: 28px; font-weight: 600">
        Asura Bot
      </h3>
    </div>
    <hr
      style="
        background-color: #552fbc;
        width: 80vw;
        margin-top: 10px;
        margin-bottom: 0px;
      "
    />
    <div style="display: flex; font-size: 20px">
      <ul>
        <li>
          <a @click="about" href="#about">Sobre</a>
        </li>
        <li>
          <a
          target="_blank"
            href="https://discordapp.com/oauth2/authorize?client_id=470684281102925844&scope=bot&permissions=8Discord"
            >Convite</a
          >
        </li>
        <li>
          <a target="_blank" href="https://discord.gg/tdVWQGV">Servidor de suporte</a>
        </li>
        <li>
          <router-link :to="{ name: 'Commands' }"> Comandos </router-link>
        </li>
        <li>
          <a target="_blank" href="https://github.com/Acnologla/asura"> Github </a>
        </li>
      </ul>
    </div>
  </footer>
</template>
<style scoped>
.footer {
  width: 100%;
  background-color: #f3f4f5;
  display: flex;
  align-items: center;
  text-align: center;
  flex-flow: wrap;
  padding: 1.5rem 0.75rem 1rem;
  justify-content: center;
}
li a {
  color: #2c3e50;
}
li {
  margin-top: 10px;
  float: left;
  margin-left: 10px;
}
[data-theme="dark"] .footer {
  background-color: #1d1f21;
}
[data-theme="dark"] h3 {
  font-weight: 400 !important;
}
[data-theme="dark"] li a {
  color: #eceff4;
}
li a:hover {
  color: #552fbc;
}
</style>
<script>
export default {
  name: "Footer",
  methods: {
    about() {
      if (this.$route.name !== "Home") {
        this.$router.push({ name: "Home" });
        document.getElementById("about").scrollIntoView();
      }
    },
  },
};
</script>   