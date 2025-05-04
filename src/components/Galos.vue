<template>
  <center>
    <b-carousel
      @change="change($event)"
      class="galos"
      arrow
      v-model="selected"
      :arrowHover="false"
      :indicator="false"
      :pause-info="false"
      :repeat="false"
      :autoplay="false"
      :indicator-inside="false"
    >
      <b-carousel-item v-for="(sprite, i) in sprites" :key="i">
        <span class="image">
          <img :src="sprite" :style="getStyle()" />
        </span>
      </b-carousel-item>
    </b-carousel>
  </center>
</template>
<script>
import axios from "axios";

export default {
  name: "galos",
  data() {
    return {
      sprites: [],
      selected: 0,
      colors: [
        "#CDE3FF",
        "#0000FF",
        "#9400D3",
        "#FF9000",
        "#FF4040",
        "GRADIENT",
        "#FF00FF",
      ],
    };
  },
  props: {
    classes: Array,
  },
  methods: {
    change(val) {
      this.$emit("change", val);
    },
    getStyle() {
      const color = this.colors[this.classes[this.selected + 1].rarity];
      if (color === "GRADIENT") {
        return `height: 200px;border-width: 4px;border-radius: 4px;border-style:solid; border-image: linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%);  border-image-slice: 1;`;
      }
      return `height: 200px;border: 4px solid ${color}`;
    },
  },
  created() {
    if (this.$route.query.galo) {
      this.selected = parseInt(this.$route.query.galo);
    }
    axios.get("/resources/sprites.json").then((result) => {
      this.sprites = result.data[0];
    });
  },
};
</script>
<style>
.galos {
  width: 300px;
  height: 300px;
}

@media screen and (max-width: 768px) {
  .galos {
    height: 230px;
  }
}
</style>
