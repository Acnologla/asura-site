import axios from "axios";
import i18n from "../i18n";
import { cachedFetch } from "./cache";

const locale = () => i18n.locale || "pt";

const get = (url) =>
  axios.get(url).then((r) => r.data);

// ─── Individual cached fetchers ───────────────────────────────────────────────

export const GetClasses = () =>
  cachedFetch(
    `cache:class:${locale()}`,
    () => get(`https://info.asurabot.com.br/class.json?language=${locale()}`)
  );

export const GetSprites = () =>
  cachedFetch(
    `cache:sprites:${locale()}`,
    () => get(`https://info.asurabot.com.br/sprites.json?language=${locale()}`)
  );

export const GetEffects = () =>
  cachedFetch(
    `cache:effects:${locale()}`,
    () => get(`https://info.asurabot.com.br/effects.json?language=${locale()}`)
  );

export const GetItems = () =>
  cachedFetch(
    `cache:items:${locale()}`,
    () => get(`https://info.asurabot.com.br/items.json?language=${locale()}`)
  );

export const GetCosmeticInfo = () =>
  cachedFetch(
    `cache:cosmetics:${locale()}`,
    () => get(`https://info.asurabot.com.br/cosmetics.json?language=${locale()}`)
  );

/**
 * Returns all pets in a single request using the allpets endpoint.
 * Previously made 21 individual requests.
 */
export const GetAllPets = () =>
  cachedFetch(
    `cache:allpets:${locale()}`,
    () => get(`https://info.asurabot.com.br/allpets.json?language=${locale()}`)
  );

// Kept for backward-compatibility with Trade page (getInfo)
export const getInfo = async (info) =>
  Promise.all([
    GetSprites().then((data) => { info.sprites = data[0]; }),
    GetClasses().then((data) => { info.classes = data; }),
    GetItems().then((data) => { info.items = data; }),
    GetCosmeticInfo().then((data) => { info.cosmetics = data; }),
    GetAllPets().then((pets) => {
      pets.forEach((p, i) => { info.pets[i] = p; });
    }),
  ]);
