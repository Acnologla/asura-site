const SITE_URL = "https://asurabot.com.br";
const SITE_NAME = "Asura Bot";
const DEFAULT_IMAGE =
  "https://cdn.discordapp.com/avatars/470684281102925844/e1dfb36e69e5b83f081f8ee3ba1adbd3.png?size=512";

const staticPages = {
  Home: {
    title: "Asura Bot — Bot de Discord para Rinha de Galos",
    description:
      "Asura Bot é um bot gratuito para Discord com galos, batalhas, raids, torneios e progressão por comandos.",
    jsonLd: () => [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: "pt-BR",
      },
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: SITE_NAME,
        url: SITE_URL,
        applicationCategory: "GameApplication",
        operatingSystem: "Discord",
        inLanguage: "pt-BR",
        description:
          "Bot para Discord com galos, batalhas, raids, torneios e progressão por comandos.",
      },
    ],
  },
  Galos: {
    title: "Catálogo de Galos | Asura Bot",
    description:
      "Explore o catálogo de galos do Asura Bot: raridades, tipos, habilidades e detalhes para as batalhas no Discord.",
  },
  RinhaInfo: {
    title: "Upgrades e Itens da Rinha | Asura Bot",
    description:
      "Consulte os upgrades e itens disponíveis para usar nas batalhas de galos do Asura Bot no Discord.",
  },
  Backgrounds: {
    title: "Backgrounds para Galos | Asura Bot",
    description:
      "Veja os backgrounds disponíveis para personalizar o cartão do seu galo no Asura Bot.",
  },
  Pets: {
    title: "Catálogo de Pets | Asura Bot",
    description:
      "Conheça os pets disponíveis no Asura Bot e os recursos que eles trazem para seu galo.",
  },
  Extras: {
    title: "Armaduras e Skins Globais | Asura Bot",
    description:
      "Explore armaduras e skins globais disponíveis no Asura Bot.",
  },
  Donate: {
    title: "Apoie o Asura Bot",
    description:
      "Apoie o desenvolvimento do Asura Bot e conheça os benefícios disponíveis para a comunidade.",
    jsonLd: () => [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Como o pagamento funciona?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Aceitamos PIX e PayPal. A ativação dos benefícios é automática e instantânea após confirmação.",
            },
          },
          {
            "@type": "Question",
            name: "Posso cancelar a qualquer momento?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sim. Você pode cancelar a renovação automática a qualquer momento direto no painel — os benefícios continuam até o fim do período já pago.",
            },
          },
          {
            "@type": "Question",
            name: "Os benefícios são acumulativos?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Royal VIP inclui tudo do VIP, que inclui tudo do Prime. Você sempre tem todos os benefícios do plano superior.",
            },
          },
          {
            "@type": "Question",
            name: "Como recebo os itens avulsos?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Após o pagamento, os recursos são entregues automaticamente na sua conta dentro de poucos segundos.",
            },
          },
        ],
      },
    ],
  },
  Terms: {
    title: "Termos de Uso | Asura Bot",
    description: "Leia os termos de uso do Asura Bot.",
    robots: "noindex,follow",
  },
  Privacy: {
    title: "Política de Privacidade | Asura Bot",
    description: "Leia a política de privacidade do Asura Bot.",
    robots: "noindex,follow",
  },
};

function absoluteUrl(path) {
  return new URL(path || "/", SITE_URL).toString();
}

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(
    `meta[${attribute}="${key}"]`,
  );
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setCanonical(url) {
  let element = document.head.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }
  element.setAttribute("href", url);
}

function setJsonLd(items) {
  const existing = document.getElementById("seo-json-ld");
  if (existing) existing.remove();
  if (!items || items.length === 0) return;

  const script = document.createElement("script");
  script.id = "seo-json-ld";
  script.type = "application/ld+json";
  script.text = JSON.stringify(items.length === 1 ? items[0] : items).replace(
    /[<>&\u2028\u2029]/g,
    (character) =>
      ({
        "<": "\\u003c",
        ">": "\\u003e",
        "&": "\\u0026",
        "\u2028": "\\u2028",
        "\u2029": "\\u2029",
      })[character],
  );
  document.head.appendChild(script);
}

export function applyPageMeta({
  title,
  description,
  path,
  robots = "index,follow",
  type = "website",
  jsonLd = [],
}) {
  const canonical = absoluteUrl(path);
  document.documentElement.lang = "pt-BR";
  document.title = title;
  setMeta("name", "description", description);
  setMeta("name", "robots", robots);
  setMeta("property", "og:title", title);
  setMeta("property", "og:description", description);
  setMeta("property", "og:url", canonical);
  setMeta("property", "og:type", type);
  setMeta("property", "og:image", DEFAULT_IMAGE);
  setMeta("property", "og:site_name", SITE_NAME);
  setMeta("name", "twitter:card", "summary");
  setMeta("name", "twitter:title", title);
  setMeta("name", "twitter:description", description);
  setMeta("name", "twitter:image", DEFAULT_IMAGE);
  setCanonical(canonical);
  setJsonLd(jsonLd);
}

export function applyRouteMeta(route) {
  const page = staticPages[route.name];
  if (page) {
    applyPageMeta({
      ...page,
      path: route.path,
      jsonLd: page.jsonLd ? page.jsonLd() : [],
    });
    return;
  }

  applyPageMeta({
    title: SITE_NAME,
    description: "Bot para Discord com galos, batalhas e progressão por comandos.",
    path: route.path,
    robots: "noindex,nofollow",
  });
}

export function roosterJsonLd(name, path) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Sobre",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Galos",
          item: absoluteUrl("/galos"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name,
          item: absoluteUrl(path),
        },
      ],
    },
  ];
}

export { SITE_URL };
