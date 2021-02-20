<template>
  <div>
    <main>
      <div class="text">
        <h1 class="title">Se divirta no seu Servidor de Discord com o Asura</h1>
        <h2 class="subtitle">
          Batalhe com outros galos, veja avatares antigos, jogue uno e muito mais
        </h2>
        <div>
          <b-button
            class="invite"
            type="is-primary"
            style="margin-right: 30px; width: 180px;color: #ECEFF4"
            href=" https://discordapp.com/oauth2/authorize?client_id=470684281102925844&scope=bot&permissions=8"
            target="_blank"
            tag="a"
          >
            Me adicione
          </b-button>
          <b-button tag="a" href="https://discord.gg/tdVWQGV" target="_blank" type="is-primary is-light" style="width: 180px">
            Servidor de suporte
          </b-button>
        </div>
      </div>
      <a class="arrow" href="#about">
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

<style>
@media screen and (max-width: 490px) {
  .invite {
    margin-right: 0px !important;
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
}
[data-theme="dark"] .arrow{
  color: #ECEFF4;
}
[data-theme="dark"] .arrow:hover{
  color: grey;
}
</style>
<script>
import AboutCard from "../components/AboutCard";
import "../assets/main.css"
export default {
  name: "Home",
  components: { AboutCard },
  data() {
    return {
      cards: [
        {
          title: "Rinha de galo",
          description:
            "Voce pode batalhar com seu galo, upar de nivel, desbloquear novos galos, enfrentar uma terrivel dungeon e matar inumeros chefes.   <a href='/asura-site/tutorial'>Clique aqui para ver o tutorial</a>",
          image:
            "https://cdn.discordapp.com/attachments/397528821307539486/805554148912398346/unknown.png",
        },
        {
          title: "Avatares antigos",
          description:
            "Com o asura em seu servidor voce podera ver os antigos avatares dos seus membros.",
          image:
            "https://cdn.discordapp.com/attachments/736504238565359637/805566514521964574/unknown.png",
        },
        {
          title: "Minijogos",
          description: "Voce pode jogar uno, 2048, jogo da velha, connect4 e xadrez.",
          image:
            "https://cdn.discordapp.com/attachments/736504238565359637/805567136365543465/unknown.png",
        },
        {
          title: "Manipulação de imagens",
          description:
            'Voce pode manipular imagens, colocando elas em uma lixeira, ou até mesmo no "morre praga". ',
          image:
            "https://cdn.discordapp.com/attachments/736504238565359637/805565135255109662/unknown.png",
        },
      ],
    };
  },
};
</script>
