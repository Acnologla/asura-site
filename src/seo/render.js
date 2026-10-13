export function markAppRendered() {
  if (typeof document !== "undefined") {
    document.dispatchEvent(new Event("app-rendered"));
  }
}
