import axios from "axios";
export const getInfo = async (info) =>
  Promise.all([
    axios.get("/resources/sprites.json").then((result) => {
      info.sprites = result.data[0];
    }),
    axios.get("/resources/class.json").then((classes) => {
      info.classes = classes.data;
    }),

    axios.get("/resources/items.json").then((classes) => {
      info.items = classes.data;
    }),

    axios.get("/resources/cosmetics.json").then(async (cosmetics) => {
      const skins = await axios.get("/resources/skins.json");
      const newCosmetics = await axios.get("/resources/newCosmetics.json");
      info.cosmetics = cosmetics.data.concat(skins.data, newCosmetics.data);
    }),
  ]);
