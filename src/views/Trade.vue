<template>
  <main v-if="loaded">
    <div v-if="countdown > 0" class="confirmButton">
      <button class="button is-primary" :disabled="true">
        {{ countdown }}
      </button>
    </div>
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
        <button class="button is-primary" @click="confirm">
          {{ user.confirm ? "Cancelar troca" : "Confirmar troca" }}
        </button>
        <SelectTradeItems
          :class="user.confirm ? 'is-blocked' : ''"
          style="margin-top: 25px"
          :user="user"
          :getItemImage="getItemImage"
          :addItemToTrade="addItemToTrade"
          :info="info"
          :map="map"
        />
      </div>
      <div
        class="column is-10-mobile is-6-tablet is-5-desktop is-offset-0-tablet is-offset-2-desktop"
      >
        <UserTrade
          :items="getReverseTrade"
          :getItemImage="getItemImage"
          :confirmed="other.confirm"
          title="Oferta dele"
        />
      </div>
    </div>
  </main>
</template>

<script>
import UserTrade from "../components/UserTrade.vue";
import SelectTradeItems from "../components/SelectTradeItems.vue";
import { client } from "../trade/api";
import { getInfo } from "../trade/info";
import { connect } from "../trade/websocket";

export default {
  data() {
    return {
      loaded: false,
      token: "",
      tradeID: null,
      countdown: 0,
      other: {
        id: "",
        confirm: false,
      },
      wsConnection: null,
      user: {
        id: "teste",
        confirm: false,
        roosters: [],
        items: [],
        pets: [],
      },
      trade: {},
      info: {
        sprites: [],
        classes: [],
        items: [],
        cosmetics: [],
        pets: [],
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
  async created() {
    const token = this.$route.query.token;
    const r = await client.get(`/user/${token}`);
    await getInfo(this.info);
    this.trade = {
      [this.user.id]: [],
      [this.other.id]: [],
    };
    this.wsConnection = connect(token, this.tradeCallback);
    this.user.id = r.data.id;
    this.other.id = r.data.other_id;
    this.user.roosters = r.data.roosters;
    this.user.items = r.data.items;
    this.user.pets = r.data.pets;
    this.loaded = true;
  },

  computed: {
    getReverseTrade() {
      return this.trade[this.other.id];
    },
  },
  methods: {
    confirm() {
      this.user.confirm = !this.user.confirm;
      this.wsConnection.ws.send(
        JSON.stringify({
          type: 2,
          trade_id: this.tradeID,
          user_id: this.user.id,
          data: {
            confirmed: this.user.confirm,
          },
        })
      );
    },
    mapItems(items) {
      const result = items.map((item) => ({
        tradeType: item.type,
        ...item.data,
      }));
      const roosters = result.filter((i) => i.tradeType === "rooster");
      const itemsNew = result.filter((i) => i.tradeType === "item");
      const petsNew = result.filter((i) => i.tradeType === "pet");
      const r = this.map(roosters, itemsNew, petsNew);
      return r;
    },
    tradeCallback(message) {
      if (!this.tradeID) {
        this.tradeID = message.id;
      }

      switch (message.type) {
        case "trade_update":
          const user = message.users[this.user.id];
          const other = message.users[this.other.id];
          this.user.confirm = user.confirmed;
          this.other.confirm = other.confirmed;
          this.$set(this.trade, this.user.id, this.mapItems(user.items));
          this.$set(this.trade, this.other.id, this.mapItems(other.items));
          this.countdown = 0;
          break;
        case "start_countdown":
          this.countdown = message.countdown;
          const int = setInterval(() => {
            if (this.countdown === 0) {
              clearInterval(int);
              return;
            }
            this.countdown--;
          }, 1000);
          break;
        case "trade_confirmed":
          alert("Trade confirmada");
          this.$router.push("/");
          break;
        case "trade_error":
          alert(`Erro troca, desconfirme e tente denovo: ${message.error}`);

          break;
      }
    },
    getItemImage(item) {
      // 0 rooster, 1 item, 2 cosmetic
      switch (item.tradeType) {
        case "rooster":
          return this.info.sprites[item.type - 1];
        case "pet":
          return this.info.pets[item.type].sprite;
        case "item":
          if (item.type === 3) {
            return this.info.cosmetics[item.item_id].value;
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
      } else trade.splice(index, 1);
      this.addItemToWs(item, true);
    },
    itemTypeToInt(type) {
      switch (type) {
        case "rooster":
          return 1;
        case "item":
          return 0;
        case "pet":
          return 2;
      }
    },
    addItemToWs(item, remove) {
      this.wsConnection.ws.send(
        JSON.stringify({
          type: 1,
          trade_id: this.tradeID,
          user_id: this.user.id,
          data: {
            item_id: item.id,
            remove,
            type: this.itemTypeToInt(item.tradeType),
          },
        })
      );
    },
    addItemToTrade(item) {
      const trade = this.trade[this.user.id];
      const has = trade.find((i) => i.id === item.id);
      if (has) {
        if (!has.quantity || has.quantity === item.quantity) return;
        has.quantity++;
      } else trade.push({ ...item, quantity: item.quantity ? 1 : undefined });
      this.addItemToWs(item, false);
    },

    map(roosters, items, pets) {
      const r = roosters.map((r) => ({
        ...r,
        name: this.info.classes[r.type].name,
        tradeType: "rooster",
        rarity: this.info.classes[r.type].rarity,
      }));

      const r2 = pets.map((r) => ({
        ...r,
        name: this.info.pets[r.type].name,
        tradeType: "pet",
        rarity: this.info.pets[r.type].rarity,
      }));

      const mapItems = (items, type, infoGetter, rarityGetter) => {
        return items
          .filter((item) => item.type === type)
          .map((item) => ({
            ...item,
            name: infoGetter(item.item_id),
            tradeType: "item",
            rarity: rarityGetter(item.item_id),
            quantity: item.quantity || 1,
          }));
      };

      const itemsNew = [
        ...mapItems(
          items,
          2,
          (itemId) => this.info.items[itemId].name,
          (itemId) => this.info.items[itemId].level
        ),
        ...mapItems(
          items,
          3,
          (itemId) => this.info.cosmetics[itemId].name,
          (itemId) => this.info.cosmetics[itemId].rarity
        ),
        ...mapItems(
          items,
          5,
          (itemId) => "Shard " + this.info.rarities[itemId],
          (itemId) => itemId
        ),
      ];
      return r.concat(itemsNew).concat(r2);
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

.is-blocked {
  pointer-events: none;
  cursor: not-allowed;
  opacity: 0.5; /* Optional: Makes it visually look disabled */
}

@media screen and (max-width: 768px) {
  main {
    margin-top: 0;
    padding-right: 5px;
    padding-left: 5px;
  }
}
</style>
