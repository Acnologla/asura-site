<template>
  <div>
    <main>
      <div class="rooster rooster-left"></div>
      <div class="rooster rooster-right"></div>

      <div class="text">
        <h1 class="title">Se divirta no seu Servidor de Discord com o Asura</h1>
        <h2 class="subtitle">
          Batalhe com outros galos, veja avatares antigos, jogue uno e muito
          mais
        </h2>
        <div>
          <b-button
            class="invite"
            type="is-primary"
            style="margin-right: 30px; width: 180px; color: #eceff4"
            href="#"
            target="_blank"
            tag="a"
            @click="btn"
          >
            <span style="font-weight: 500"> Me adicione </span>
          </b-button>
          <b-button
            tag="a"
            href="https://discord.gg/CfkBZyVsd7"
            target="_blank"
            type="is-primary is-light"
            style="width: 180px"
          >
            <span style="font-weight: 500"> Servidor de suporte </span>
          </b-button>
        </div>
      </div>
      <a class="arrow object" href="#about">
        <font-awesome-icon icon="chevron-down" />
      </a>
    </main>
    <section>
      <div id="about">
        <AboutCard
          v-for="(card, i) in cards"
          :key="i"
          :title="card.title"
          :image="card.image"
          :reverse="i % 2 !== 0"
          :description="card.description"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.rooster {
  position: absolute;
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0.7;
  z-index: 0;
  width: 30vw;
  height: 30vh;
}

.rooster-left {
  background-image: url("https://i.imgur.com/m3wnR88.png");
  left: 1%;
  top: 10%;
}

.rooster-right {
  background-image: url("https://i.imgur.com/EvXuFeh.png");
  right: 1%;
  bottom: 10%;
  transform: scaleX(-1);
}

@media screen and (max-width: 768px) {
  .rooster {
    width: 60vw;
    opacity: 0.65;
    height: 20vh;
  }
  .rooster-left {
    left: 0;
  }

  .rooster-right {
    right: 0;
    bottom: 5%;
  }
}

.object {
  animation: MoveUpDown 2.5s infinite;
  position: absolute;
  left: 0;
  bottom: 0;
}

@keyframes MoveUpDown {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(15px);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

#about {
  margin-top: 100vh;
  width: 100%;
}
.arrow {
  position: absolute;
  top: 87vh;
  margin: 0;
  font-size: 50px;
  color: rgb(76, 86, 106);
  left: calc(50% - 25px);
}
.text {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index: 2;
  text-align: center;
}
[data-theme="dark"] .arrow {
  color: #eceff4;
}
[data-theme="dark"] .arrow:hover {
  color: grey;
}
@media screen and (max-width: 490px) {
  .invite {
    margin-right: 0px !important;
  }
  .title {
    margin-bottom: 30px !important;
  }

  .text {
    margin-top: 20px;
  }
  .arrow {
    top: 82vh;
  }
}
</style>
<script>
import AboutCard from "../components/AboutCard";
import "../assets/main.css";
export default {
  name: "Home",
  components: { AboutCard },
  methods: {
    btn() {
      gtag("event", "conversion", {
        send_to: "AW-11526751589/-iaDCOaJj_4ZEOWKsfgq",
        value: 10.0,
        currency: "BRL",
      });
      const route = this.$router.resolve({ name: "Invite" });
      window.open(route.href, "_blank");
    },
  },
  data() {
    return {
      cards: [
        {
          title: "Rinha de galo",
          description:
            "Voce pode batalhar com seu galo, upar de nivel, desbloquear novos galos, enfrentar uma terrivel dungeon e matar inumeros chefes.   <a href='/tutorial'>Clique aqui para ver o tutorial</a>",
          image: "https://i.imgur.com/KRBafek.png",
        },
        {
          title: "Avatares antigos",
          description:
            "Com o asura em seu servidor voce podera ver os antigos avatares dos seus membros.",
          image: "https://i.imgur.com/h8k09QR.png",
        },
        {
          title: "Minijogos",
          description: "Voce pode jogar uno, 2048, jogo da velha e connect4.",
          image: "https://i.imgur.com/bIj7xSH.png",
        },
        {
          title: "Manipulação de imagens",
          description:
            'Voce pode manipular imagens, colocando elas em uma lixeira, ou até mesmo no "morre praga". ',
          image: "https://i.imgur.com/09HR1Er.png",
        },
      ],
    };
  },
};
</script>
