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
        v-for="(character, i) in sorted"
        :key="i"
        class="column is-12-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-fullhd rooster"
        style="position: relative"
        @click="open(character)"
      >
        <div class="item-wrapper">
          <img
            :src="getImage(character)"
            class="character-image"
            :style="[
              getStyle(character),
              itemWidth
                ? { width: `${itemWidth}px`, height: `${itemHeight}px` }
                : {},
            ]"
          />
          <h3 class="r-title">{{ character.name }}</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "CharacterGrid",
  props: {
    classesData: {
      type: Array,
      required: true,
      default: () => [],
    },
    spritesData: {
      type: Array,
      required: true,
      default: () => [],
    },
    detailUrlTemplate: {
      type: String,
      default: "/galo?galo={index}",
    },
    itemWidth: {
      type: Number,
    },
    itemHeight: {
      type: Number,
    },
  },
  data() {
    return {
      text: "",
      filterRarity: null,
      raritiesData: [
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
  computed: {
    classes() {
      return this.classesData;
    },
    sprites() {
      return this.spritesData;
    },
    rarities() {
      return this.raritiesData;
    },
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
  methods: {
    open(character) {
      const index = this.classes.findIndex((g) => g.name === character.name);
      const url = this.detailUrlTemplate.replace("{index}", index - 1);
      window.open(url);
    },
    getImage(character) {
      const index = this.classes.findIndex((g) => g.name === character.name);
      const r = this.classes[0].name.includes("404") ? 1 : 0;
      return this.sprites[index - r];
    },
    getStyle(character) {
      const color = this.rarities[character.rarity].color;
      if (color === "GRADIENT")
        return {
          borderRadius: "4px",
          borderStyle: "solid",
          borderImage:
            "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)",
          borderImageSlice: 1,
          borderWidth: "4px",
          objectFit: "cover",
        };

      return {
        border: `4px solid ${color}`,
        borderRadius: "4px",
        objectFit: "cover",
      };
    },
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

.item-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.character-image {
  width: 100%;
  object-fit: cover;
  display: block;
  margin: 0 auto;
}

.r-title {
  font-weight: 600;
  font-size: 32px;
  text-align: center;
  margin-top: 10px;
}

.rooster {
  cursor: pointer;
  display: flex;
  justify-content: center;
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

  .character-image {
    max-width: 100% !important; /* Override any inline styles on mobile */
    height: auto !important;
  }

  .r-title {
    font-size: 24px;
  }
}
</style>
