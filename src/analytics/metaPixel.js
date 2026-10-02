const pixelId = process.env.VUE_APP_META_PIXEL_ID;
let initialized = false;

function getPixel() {
  if (!pixelId || typeof window === "undefined") return null;

  if (!window.fbq) {
    const fbq = function () {
      fbq.callMethod
        ? fbq.callMethod.apply(fbq, arguments)
        : fbq.queue.push(arguments);
    };
    const script = document.createElement("script");

    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    window.fbq = fbq;

    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);

  }

  if (!initialized) {
    window.fbq("init", pixelId);
    initialized = true;
  }

  return window.fbq;
}

export function trackMetaEvent(eventName) {
  const fbq = getPixel();
  if (fbq) fbq("track", eventName);
}

export function initializeMetaPixel() {
  getPixel();
}
