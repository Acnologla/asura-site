<template>
  <main v-if="loaded">
    <div class="columns is-mobile">
      <div class="column is-6-mobile is-5-tablet">
        <UserTrade
          :info="info"
          :trade="trade[user.id]"
          :getItemImage="getItemImage"
          :confirmed="user.confirm"
        />
        <br />
        <button class="button is-primary" @click="user.confirm = !user.confirm">
          {{ user.confirm ? "Cancelar troca" : "Confirmar troca" }}
        </button>
        <SelectTradeItems
          style="margin-top: 25px"
          :user="user"
          :getItemImage="getItemImage"
          :addItemToTrade="addItemToTrade"
          :info="info"
        />
      </div>
      <div
        class="column is-6-mobile is-5-tablet is-offset-0-mobile is-offset-2-tablet"
      >
        <UserTrade
          :trade="getReverseTrade()"
          :getItemImage="getItemImage"
          :info="info"
          :confirmed="true"
        />
      </div>
    </div>
  </main>
</template>

<script>
import UserTrade from "../components/UserTrade.vue";
import axios from "axios";
import SelectTradeItems from "../components/SelectTradeItems.vue";
export default {
  data() {
    return {
      loaded: false,
      token: "",
      user: {
        id: "teste",
        confirm: false,
        roosters: [
          {
            type: 5,
          },
          {
            type: 18,
          },
          {
            type: 25,
          },
          {
            type: 44,
          },
        ],
        items: [
          {
            type: 2,
            itemID: 1,
          },
          {
            type: 2,
            itemID: 5,
          },
          {
            type: 3,
            itemID: 12,
          },
          {
            type: 3,
            itemID: 33,
          },
          {
            type: 5,
            itemID: 0,
          },
          {
            type: 5,
            itemID: 3,
          },
        ],
      },
      trade: {},
      info: {
        sprites: [],
        classes: [],
        items: [],
        cosmetics: [],
        rarities: [
          "Comum",
          "Raro",
          "Epico",
          "Lendario",
          "Especial",
          "Mitico",
          "Deus",
        ],
      },
    };
  },
  created() {
    Promise.all([
      axios.get("/resources/sprites.json").then((result) => {
        this.info.sprites = result.data[0];
      }),
      axios.get("/resources/class.json").then((classes) => {
        this.info.classes = classes.data;
      }),

      axios.get("/resources/items.json").then((classes) => {
        this.info.items = classes.data;
      }),

      axios.get("/resources/cosmetics.json").then(async (cosmetics) => {
        const skins = await axios.get("/resources/skins.json");
        const newCosmetics = await axios.get("/resources/newCosmetics.json");
        this.info.cosmetics = cosmetics.data.concat(
          skins.data,
          newCosmetics.data
        );
      }),
    ]).then(() => {
      this.loaded = true;
    });

    this.trade = {
      [this.user.id]: [],
      test3: [],
    };
  },

  methods: {
    getReverseTrade() {
      return this.trade[
        Object.keys(this.trade).find((key) => key !== this.user.id)
      ];
    },
    getItemImage(item) {
      // 0 rooster, 1 item, 2 cosmetic
      switch (item.tradeType) {
        case "rooster":
          return this.info.sprites[item.type];
        case "item":
          if (item.type === 3) {
            return this.info.cosmetics[item.itemID].value;
          }
          return "https://static.thenounproject.com/png/4241034-200.png";
      }
    },
    addItemToTrade(item) {
      this.trade[this.user.id].push(item);
    },
  },
  components: {
    UserTrade,
    SelectTradeItems,
  },
};
</script>

<style scoped>
main {
  margin-top: -30px;
  padding-left: 20px;
  padding-right: 20px;
}

.confirmButton {
  display: flex;
  justify-content: center;
}

@media screen and (max-width: 768px) {
  main {
    margin-top: 0;
    padding-right: 5px;
    padding-left: 5px;
  }
}
</style>
