<template>
  <div>
    <SelectMultiple
      :classes-data="classes"
      :sprites-data="sprites"
      detail-url-template="/galo?galo={index}"
    />
  </div>
</template>

<script>
import axios from "axios";
import SelectMultiple from "../components/SelectMultiple.vue";
export default {
  name: "AllGalos",
  components: {
    SelectMultiple,
  },
  data() {
    return {
      classes: [],
      sprites: [],
    };
  },
  async created() {
    axios.get("/resources/sprites.json").then((result) => {
      this.sprites = result.data[0];
    });
    await axios.get("/resources/class.json").then((classes) => {
      this.classes = classes.data;
    });
  },
};
</script>
