<template>
  <footer class="footer" style="margin-top: 50px">
    <div
      class="columns is-centered is-variable"
      style="width: 100%; margin-left: 15px; margin-right: 15px"
    >
      <div class="column is-one-third" style="text-align: left">
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
          style="margin-top:10px;margin-bottom:10px; background-color: #552fbc"
        />
        <div class="footerText">
          <p>
            Batalhe com outros galos, veja avatares antigos, jogue uno e muito
            mais
          </p>
          <div style="font-size: 28px; margin-top: 20px">
            <a target="_blank" href="https://github.com/Acnologla/asura">
              <font-awesome-icon :icon="['fab', 'github']" />
            </a>
            <a target="_blank" href="https://discord.gg/CfkBZyVsd7">
              <font-awesome-icon
                style="margin-left: 20px"
                :icon="['fab', 'discord']"
              />
            </a>
          </div>
        </div>
      </div>
      <div class="column is-one-third">
        <div class="center">
          <ul>
            <li class="footerTitle">
              Asura
              <hr
                style="
                  margin-top: 5px;
                  margin-bottom: 5px;
                  background-color: #552fbc;
                "
              />
            </li>
            <li>
              <a @click="about" href="#about">Sobre</a>
            </li>
            <li>
              <a
                target="_blank"
                href=" https://discordapp.com/oauth2/authorize?client_id=470684281102925844&scope=applications.commands%20bot&permissions=8"
                >Convite</a
              >
            </li>
            <li>
              <a target="_blank" href="https://discord.gg/CfkBZyVsd7"
                >Servidor de suporte</a
              >
            </li>
            <li>
              <router-link :to="{ name: 'Commands' }"> Comandos </router-link>
            </li>
            <li>
              <a target="_blank" href="https://top.gg/bot/470684281102925844">
                Votar
              </a>
            </li>
            <li>
              <router-link :to="{ name: 'Donate' }"> Doar </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="column is-one-third">
        <div class="center">
          <ul>
            <li class="footerTitle">
              Rinha
              <hr
                style="
                  margin-top: 5px;
                  margin-bottom: 5px;
                  background-color: #552fbc;
                "
              />
            </li>
            <li>
              <router-link :to="{ name: 'RinhaTutorial' }">
                Tutorial rinha
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'RinhaInfo' }">
                Informaçoes da rinha
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'Galos' }">
                Lista de galos
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'Donate' }">
                Comprar items
              </router-link>
            </li>
          </ul>
        </div>
      </div>
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
ul {
  text-align: left;
}
.center {
  display: flex;
  justify-content: center;
}
li a {
  color: #2c3e50;
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
.footerTitle {
  text-align: center;
  font-weight: 600;
  font-size: 20px;
}
li a:hover {
  color: #552fbc;
}
@media screen and (max-width: 768px) {
  ul {
    text-align: center;
  }
  .footerText {
    text-align: center;
  }
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
