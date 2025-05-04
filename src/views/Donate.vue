<template>
  <article>
    <DonatePage style="margin-top: -60px !important" />
    <hr />
    <section
      style="justify-content: center; margin-left: 20px; margin-right: 20px"
    >
      <div class="columns is-vcentered is-centered">
        <div class="column is-full-mobile is-full-tablet is-two-fifths">
          <img
            src="https://cdn.discordapp.com/avatars/470684281102925844/e1dfb36e69e5b83f081f8ee3ba1adbd3.webp?size=512"
            alt="Asura image"
            style="border-radius: 20px"
            id="asuraImage"
          />
        </div>
        <div
          style="text-align: left"
          class="column is-full-mobile is-full-tablet is-half whyDonate"
        >
          <h1 class="title">Por que doar para o asura?</h1>
          <p class="aboutDescription">
            Atualmente é preciso gastar 100 dolares mensalmente (cerca de 600
            reais) para hospedar o asura.
            <br />
            Doar ajuda o bot a se manter online, faz a qualidade do bot
            aumentar, fique mais divertido, e ajuda o dono do bot.
            <br />
            Caso não tenha dinheiro para doar pro asura voce ainda pode ajudar
            votando no
            <a target="_blank" href="https://top.gg/bot/470684281102925844"
              >top.gg</a
            >.
          </p>
        </div>
      </div>
    </section>
  </article>
</template>
<style>
#donateCards {
  max-width: min(1280px, 90%);
}
@media screen and (max-width: 499px) {
  #donateCards {
    max-width: 100% !important;
  }
  #asuraImage {
    width: 150px;
  }
  article {
    margin-top: 40px !important;
  }
  h1 {
    font-size: 25px !important;
    margin-bottom: 10px !important;
    margin-top: -10px !important;
  }
  .aboutDescription {
    font-size: 18px;
  }
}
.donateTitle {
  font-family: Rubik;
  font-weight: 500;
  font-size: 40px;
  color: #4c566a;
}
[data-theme="dark"] .donateTitle {
  color: #eceff4;
}
</style>
<script>
import "../assets/main.css";
import DonatePage from "../components/donate/DonatePage.vue";
import DonateCard from "../components/DonateCard";
import VipCard from "../components/VipCard.vue";
export default {
  name: "Donate",
  components: { DonateCard, VipCard, DonatePage },
};
</script>
