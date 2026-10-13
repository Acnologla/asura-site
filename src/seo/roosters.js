export function roosterSlug(name, index) {
  const base = String(name || "galo")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${base || "galo"}-${index}`;
}

export function roosterPath(rooster, index) {
  return `/galos/${roosterSlug(rooster && rooster.name, index)}`;
}
