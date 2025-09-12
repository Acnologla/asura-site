import axios from "axios";

export const GetCosmeticInfo = () =>
  axios
    .get("https://info.asurabot.com.br/cosmetics.json")
    .then(async (cosmetics) => {
      return cosmetics.data;
    });

const PET_NUMBER = 17;

export const GetPets = () =>
  new Array(PET_NUMBER).fill(0).map((_, i) =>
    axios
      .get(`https://info.asurabot.com.br/pets/${i}.json`)
      .then((classes) => classes.data)
      .catch(() => 1)
  );
export const getInfo = async (info) =>
  Promise.all([
    axios.get("https://info.asurabot.com.br/sprites.json").then((result) => {
      info.sprites = result.data[0];
    }),
    axios.get("https://info.asurabot.com.br/class.json").then((classes) => {
      info.classes = classes.data;
    }),

    axios.get("https://info.asurabot.com.br/items.json").then((classes) => {
      info.items = classes.data;
    }),

    axios
      .get("https://info.asurabot.com.br/cosmetics.json")
      .then(async (cosmetics) => {
        info.cosmetics = cosmetics.data;
      }),
    ...new Array(PET_NUMBER).fill(0).map((_, i) =>
      axios
        .get(`https://info.asurabot.com.br/pets/${i}.json`)
        .then((classes) => {
          info.pets[i] = classes.data;
        })
        .catch(() => 1)
    ),
  ]);
