<template>
  <div>
    <svg
      style="width: 100%"
      v-if="!reverse"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
    >
        <path fill="#f3f4f5" fill-opacity="1" d="M0,192L48,181.3C96,171,192,149,288,128C384,107,480,85,576,106.7C672,128,768,192,864,202.7C960,213,1056,171,1152,154.7C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    </svg>
    <div class="bg" :style="(reverse ? '' : 'background-color: #f3f4f5;') + 'width: 100%'">
      <div class="cardContent">
        <div class="columns is-vcentered">
          <div class="column is-full-mobile is-full-tablet is-half">
            <div  v-if="reverse || width <= 768">
              <img class="aboutImage" :src="image" />
            </div>
            <div v-else class="aboutCardText">
              <h2 class="aboutTitle">
                {{ title }}
              </h2>
              <br />
              <p v-html="description" class="aboutDescription">
              </p>
            </div>
          </div>
          <div class="column is-full-mobile is-full-tablet is-half">
            <div  v-if="!reverse && width > 768">
              <img class="aboutImage" :src="image" />
            </div>
            <div class="aboutCardText" v-else>
              <h2 class="aboutTitle">
                {{ title }}
              </h2>
              <br />
                <p v-html="description" class="aboutDescription">
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
      <svg
      class="rotate"
      style="width: 100%"
      v-if="!reverse"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
    >
      <path fill="#f3f4f5" fill-opacity="1" d="M0,192L48,181.3C96,171,192,149,288,128C384,107,480,85,576,106.7C672,128,768,192,864,202.7C960,213,1056,171,1152,154.7C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    </svg>
  </div>
</template>
<style>
.aboutImage{
    border-radius: 20px;
}
.rotate{
      transform: rotate(180deg);
}
.aboutCardText {
  text-align: left;
}
.aboutTitle {
  font-family: Rubik;
  font-weight: 500px;
  width: 80vw;
  font-size: 35px;
  color: #552fbc;
}
.cardContent {
  margin-left: 10vw;
  margin-right: 10vw;
  width: 80vw;
}
@media screen and (max-width: 768px) {
  .aboutCardText {
    text-align: center !important;
  }
}
</style>
<script>
import "../assets/main.css"
export default {
  name: "AboutCard",
  data() {
    return {
      width: window.innerWidth,
    };
  },
  props: {
    title: String,
    description: String,
    image: String,
    reverse: Boolean,
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
    });
  },
};
</script>
