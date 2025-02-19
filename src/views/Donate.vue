<template>
  <article>
    <section
      style="justify-content: center; margin-left: 20px; margin-right: 20px"
    >
      <div class="columns is-vcentered is-centered">
        <div class="column is-full-mobile is-full-tablet is-two-fifths">
          <img
            src="https://cdn.discordapp.com/avatars/470684281102925844/e1dfb36e69e5b83f081f8ee3ba1adbd3.webp?size=512"
            alt="Asura image"
            style="border-radius: 20px"
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

    <hr
      style="margin-left: 17.5vw; margin-right: 17.5vw; background-color: #552fbc"
    />
    <center>
      <div id="donateCards" class="columns is-centered is-multiline">
        <div
          class="column is-three-quarters-mobile is-half-tablet is-one-third-desktop is-half-tablet is-one-third-desktop is-one-fifth-fullhd"
        >
          <DonateCard
            price="R$ 10 a cada 5000 moedas"
            description="Comprar dinheiro avulsamente na sua conta."
            title="Compra de dinheiro"
          />
        </div>
        <div
          class="column is-three-quarters-mobile is-half-tablet is-one-third-desktop is-one-fifth-fullhd"
        >
          <DonateCard
            price="R$ 10 a cada 4000 Xp"
            description="Comprar Xp avulsamente na sua conta."
            title="Compra de Xp"
          />
        </div>
        <div
          class="column is-three-quarters-mobile is-half-tablet is-one-third-desktop is-one-fifth-fullhd"
        >
          <DonateCard
            price="R$ 15 a cada 1 Asura Coin"
            description="Comprar Asura coins avulsamente na sua conta."
            title="Compra de Asura coins"
          />
        </div>
        <div
          class="column is-three-quarters-mobile is-half-tablet is-one-third-desktop is-one-fifth-fullhd"
        >
          <DonateCard
            price="R$ 10 a 1000 UserXp"
            description="Comprar UserXp avulsamente na sua conta."
            title="Compra de UserXp"
          />
        </div>
        <div
          class="column is-three-quarters-mobile is-half-tablet is-one-third-desktop is-one-fifth-fullhd"
        >
          <DonateCard
            price="R$ 50 a cada 1 Reset"
            description="Comprar Um reset de galo avulsamente na sua conta."
            title="Compra de Resets"
          />
        </div>
        <div
          class="column is-three-quarters-mobile is-three-quarters-tablet is-three-quarters-tablet is-half-desktop is-half-fullhd"
          style="margin-top: 20px"
        >
          <VipCard />
        </div>
      </div>
    </center>
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
import DonateCard from "../components/DonateCard";
import VipCard from "../components/VipCard.vue";
export default {
  name: "Donate",
  components: { DonateCard, VipCard },
};
</script>
