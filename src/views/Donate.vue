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
            Atualmente é preciso gastar 20 dolares mensalmente (cerca de 110
            reais) para hospedar o asura.
            <br />
            Doar ajuda o bot a se manter online, faz a qualidade do bot
            aumentar, fique mais divertido, e ajuda o dono do bot.
            <br />
            <br />
            Caso não tenha dinheiro para doar pro asura voce ainda pode ajudar
            votando no
            <a target="_blank" href="https://top.gg/bot/470684281102925844"
              >top.gg</a
            >. Ao votar voce pode usar seu comando de daily denovo,
            exemplificando: voce pode pegar 3 dailys ao dia caso vote a cada 12
            horas.
          </p>
        </div>
      </div>
    </section>
    <br /><br />
    <hr
      style="margin-left: 20vw; margin-right: 20vw; background-color: #552fbc"
    />
    <center>
      <div style="text-align: center">
        <h2 class="donateTitle">Premio por doar</h2>
      </div>
      <br />
      <div
        id="donateCards"
        style="max-width: 750px"
        class="columns is-centered is-multiline"
      >
        <div class="column is-three-quarters-mobile is-one-third">
          <DonateCard
            price="R$ 10 a cada 800 moedas"
            description="Comprar dinheiro avulsamente na sua conta."
            title="Compra de dinheiro"
          />
        </div>
        <div class="column is-three-quarters-mobile is-one-third">
          <DonateCard
            price="R$ 10 a cada 2500 Xp"
            description="Comprar Xp avulsamente na sua conta."
            title="Compra de Xp"
          />
        </div>
        <div class="column is-three-quarters-mobile is-one-third">
          <DonateCard
            price="R$ 18 a cada 1 Asura Coin"
            description="Comprar Asura coins avulsamente na sua conta."
            title="Compra de Asura coins"
          />
        </div>
        <div
          class="column is-three-quarters-mobile is-half"
          style="margin-top: 20px"
        >
          <DonateCard
            price="R$ 32 mensalmente"
            description="Ouro extra por partida.  <br>Xp extra por partida. <br>Trocar nome do galo gratuitamente.<br>Xp extra no passe de batalha.<br>Conteudo exclusivo no passe de batalha.<br>Bonus adicional no comando daily"
            title="Vip"
          />
        </div>
      </div>
    </center>
  </article>
</template>
<style>
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
export default {
  name: "Donate",
  components: { DonateCard },
};
</script>
