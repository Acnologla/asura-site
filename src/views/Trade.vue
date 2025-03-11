<template>
  <main v-if="loaded">
    <div class="columns  is-centered is-multiline is-mobile">
      <div class="column is-10-mobile is-6-tablet is-5-desktop">
        <UserTrade
          :info="info"
          :items="trade[user.id]"
          :getItemImage="getItemImage"
          :confirmed="user.confirm"
          title="Sua oferta"
          :removeItem="removeItem"
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
        class="column is-10-mobile is-6-tablet is-5-desktop is-offset-0-tablet is-offset-2-desktop"
      >
        <UserTrade
          :items="getReverseTrade()"
          :getItemImage="getItemImage"
          :info="info"
          :confirmed="true"
          title="Oferta dele"
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
            id: 1,
            type: 5,
          },
          {
            id: 2,
            type: 18,
          },
          {
            id: 3,
            type: 25,
          },
          {
            id: 4,
            type: 44,
          },
          {
            id: 43,
            type: 52,
          },
          {
            id: 45,
            type: 32,
          },
        ],
        items: [
          {
            id: 5,

            type: 2,
            itemID: 1,
            quantity: 19,
          },
          {
            id: 6,

            type: 2,
            itemID: 5,
            quantity: 1,
          },
          {
            id: 7,

            type: 3,
            itemID: 12,
            quantity: 4,
          },
          {
            id: 8,

            type: 3,
            itemID: 33,
            quantity: 2,
          },
          {
            id: 9,

            type: 5,
            itemID: 0,
            quantity: 1,
          },
          {
            id: 12,

            type: 5,
            itemID: 3,
            quantity: 3,
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
          return this.info.sprites[item.type - 1];
        case "item":
          if (item.type === 3) {
            return this.info.cosmetics[item.itemID].value;
          }
          return "https://static.thenounproject.com/png/4241034-200.png";
      }
    },
    removeItem(item) {
      const trade = this.trade[this.user.id];
      const index = trade.findIndex((i) => i.id === item.id);
      if (index === -1) return;
      if (item.quantity > 1) {
        item.quantity--;
        return;
      }
      trade.splice(index, 1);
    },
    addItemToTrade(item) {
      const trade = this.trade[this.user.id];
      const has = trade.find((i) => i.id === item.id);
      if (has) {
        if (has.quantity === item.quantity) return;
        has.quantity++;
        return;
      }
      trade.push({ ...item, quantity: 1 });
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
