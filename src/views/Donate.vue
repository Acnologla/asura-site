<template>
  <article>
    <section style="justify-content: center; margin-left: 20px; margin-right: 20px">
      <div class="columns is-vcentered is-centered">
        <div class="column is-full-mobile is-full-tablet is-two-fifths">
          <img
            src="https://cdn.discordapp.com/avatars/470684281102925844/e1dfb36e69e5b83f081f8ee3ba1adbd3.webp?size=512"
            alt="Asura image"
          />
        </div>
        <div
          style="text-align: left"
          class="column is-full-mobile is-full-tablet is-half"
        >
          <h1 class="title">Por que doar para o asura?</h1>
          <p class="aboutDescription">
            Atualmente é preciso gastar 20 dolares mensalmente (cerca de 110 reais) para
            hospedar o asura.
            <br />
            Doar ajuda o bot a se manter online, faz a qualidade do bot aumenta, fique
            mais divertido, e ajuda o dono do bot.
          </p>
        </div>
      </div>
    </section>
    <br><br>
    <hr style="margin-left:20vw;margin-right:20vw;background-color: #552fbc">
    <center>
      <div style="text-align: center">
        <h2 class="donateTitle">Premio por doar</h2>
      </div>
       <div style="width:500px" class="columns is-centered">
            <div class = "column is-three-quarters-mobile is-half">
                <DonateCard price="R$ 15 a cada 400 moedas" description="Comprar dinheiro avulsamente na sua conta" title="Compra de dinheiro"/>
            </div>
            <div class = "column is-three-quarters-mobile is-half">
                <DonateCard price = "R$ X reais mensalmente" description="Beneficios: <br>  -Galo exclusivo  <br> -Xp extra por partida" title="Vip"/>

            </div>
       </div>
    </center>
  </article>
</template>
<style>
.donateTitle {
  font-family: Rubik;
  font-weight: 500px;
   font-size: 40px
}
</style>
<script>
import "../assets/main.css";
import DonateCard from "../components/DonateCard"
export default {
  name: "Donate",
  components: {DonateCard}
};
</script>
