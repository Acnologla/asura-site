<template>
  <section v-if="classes.length">
    <div class="filter">
      <b-field>
        <b-select
          rounded
          placeholder="Raridade"
          v-model="filterRarity"
          icon="account"
          size="is-medium"
        >
          <option :value="i" :key="i" v-for="(rarity, i) in rarities">
            {{ rarity.name }}
          </option>
          <option :value="null" key="all">
            Todas
          </option>
        </b-select>
      </b-field>
      <b-field style="min-width: 85%;">
        <b-input
          rounded
          placeholder="Procurar..."
          type="search"
          size="is-medium"
          icon="search"
          v-model="text"
        >
        </b-input>
      </b-field>
    </div>
    <div
      class="columns is-centered is-multiline"
      style="margin: 10px;display: flex"
    >
      <div
        v-for="(galo, i) in sorted"
        :key="i"
        class="column is-three-quarters-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-fullhd rooster"
        style="position: relative"
        @click="open(galo)"
      >
        <img :style="getStyle(galo)" :src="getImage(galo)" />
        <h3 class="r-title">{{ galo.name }}</h3>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "AllGalos",
  data() {
    return {
      classes: [],
      sprites: [],
      text: "",
      filterRarity: null,
      rarities: [
        {
          name: "Comum",
          color: "#CDE3FF",
        },
        {
          name: "Raro",
          color: "#0000FF",
        },
        {
          name: "Epico",
          color: "#9400D3",
        },
        {
          name: "Lendario",
          color: "#FF9000",
        },
        {
          name: "Especial",
          color: "#FF4040",
        },
        {
          name: "Mitico",
          color: "GRADIENT",
        },
        {
          name: "Deus",
          color: "#FF00FF",
        },
      ],
    };
  },
  methods: {
    open(galo) {
      const index = this.classes.findIndex((g) => g.name === galo.name);
      window.open(`/galo?galo=${index - 1}`);
    },
    getImage(galo) {
      const index = this.classes.findIndex((g) => g.name === galo.name);
      const sprite = this.sprites[index - 1];
      return sprite;
    },
    getStyle(galo) {
      const color = this.rarities[galo.rarity].color;
      if (color === "GRADIENT")
        return `border-radius: 4px;border-style:solid;border-image: linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%);  border-image-slice: 1;`;

      return `border: 4px solid ${color}`;
    },
  },
  computed: {
    sorted() {
      return [...this.classes]
        .filter((c) => c.rarity != -1)
        .filter((c) =>
          this.text
            ? c.name.toLowerCase().includes(this.text.toLowerCase())
            : true
        )
        .filter(
          (c) => this.filterRarity === null || c.rarity === this.filterRarity
        )
        .sort((a, b) => a.rarity - b.rarity);
    },
  },
  async created() {
    axios
      .get(
        "https://raw.githubusercontent.com/Acnologla/asura/master/resources/galo/sprites.json"
      )
      .then((result) => {
        this.sprites = result.data[0];
      });
    await axios
      .get(
        "https://raw.githubusercontent.com/Acnologla/asura/master/resources/galo/class.json"
      )
      .then((classes) => {
        this.classes = classes.data;
      });
  },
};
</script>

<style scoped>
.filter {
  display: flex;
  margin: 20px;
  gap: 20px;
  max-width: 520px;
}

.r-title {
  font-weight: 600;
  font-size: 32px;
}

.rooster {
  cursor: pointer;
}

.rooster:hover {
  opacity: 0.8;
}
@media (max-width: 768px) {
  .filter {
    flex-direction: column;
    align-items: center;
    gap: 0px;
    margin: 0px;
    max-width: 100vw;
  }
}
</style>
