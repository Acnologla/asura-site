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
          <h1 class="title">{{ $t("donate.title") }}</h1>
          <p
            class="aboutDescription"
            v-html="
              $t('donate.description') +
                ' <a target=\'_blank\' href=\'https://top.gg/bot/470684281102925844\'>' +
                $t('donate.topgg') +
                '</a>.'
            "
          ></p>
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
export default {
  name: "Donate",
  components: { DonateCard, DonatePage },
};
</script>
