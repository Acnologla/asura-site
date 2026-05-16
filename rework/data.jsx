// Shared data for the prototype
// Rarity is fixed per type (a Pedra is always Comum, a Holograma is always Divino, etc.)
const TIPOS = [
  { nome: "Normal",     raridade: "Comum",     gradFrom: "#d9d4c9", gradTo: "#a89e8a", textColor: "#3a3326",
    desc: "Galo equilibrado, sem fraquezas marcantes. A base de todo treinador.",
    forte: [], fraco: ["Cortante"] },
  { nome: "Papel",      raridade: "Comum",     gradFrom: "#f8d3d3", gradTo: "#c83b3b", textColor: "#3a0c0c",
    desc: "Movimentos rasgantes, leves e cortantes como uma lâmina dobrada.",
    forte: ["Pedra"], fraco: ["Cortante", "Fogo"] },
  { nome: "Pedra",      raridade: "Comum",     gradFrom: "#cfcfd3", gradTo: "#6a6a73", textColor: "#1f1f25",
    desc: "Defesa maciça. Golpes contundentes que esmagam armaduras leves.",
    forte: ["Cortante"], fraco: ["Papel", "Madeira"] },
  { nome: "Cortante",   raridade: "Raro",      gradFrom: "#e6e7eb", gradTo: "#3b3f47", textColor: "#0e1015",
    desc: "Lâminas afiadas que rasgam tecido, papel e carne.",
    forte: ["Papel", "Normal"], fraco: ["Pedra", "Metal"] },
  { nome: "Fogo",       raridade: "Lendário",  gradFrom: "#ffd28a", gradTo: "#e23d1a", textColor: "#3a0c00",
    desc: "Chamas eternas. Queima inimigos turno após turno.",
    forte: ["Madeira", "Gelo", "Papel"], fraco: ["Acido", "Pedra"] },
  { nome: "Gelo",       raridade: "Épico",     gradFrom: "#d6ecff", gradTo: "#3b82f6", textColor: "#0b2540",
    desc: "Congela o oponente, reduzindo velocidade e contra-ataques.",
    forte: ["Madeira", "Eletrico"], fraco: ["Fogo", "Metal"] },
  { nome: "Metal",      raridade: "Épico",     gradFrom: "#dfe2e8", gradTo: "#7a8090", textColor: "#1a1d22",
    desc: "Armadura pesada. Reduz dano físico mas vulnerável a corrosão.",
    forte: ["Cortante", "Gelo"], fraco: ["Acido", "Eletrico"] },
  { nome: "Acido",      raridade: "Épico",     gradFrom: "#e3ffb1", gradTo: "#4faa1a", textColor: "#0f2a05",
    desc: "Corrosão devastadora. Derrete metal e ignora defesas.",
    forte: ["Metal", "Fogo"], fraco: ["Madeira", "Pedra"] },
  { nome: "Madeira",    raridade: "Raro",      gradFrom: "#e7c79a", gradTo: "#7a4a1f", textColor: "#2a1505",
    desc: "Resistente e regenerativo. Cura passiva entre rodadas.",
    forte: ["Pedra", "Acido"], fraco: ["Fogo", "Cortante"] },
  { nome: "Borracha",   raridade: "Raro",      gradFrom: "#cfcfd0", gradTo: "#1a1a1d", textColor: "#fafafa",
    desc: "Imune a choques elétricos. Absorve impacto e devolve.",
    forte: ["Eletrico"], fraco: ["Acido", "Cortante"] },
  { nome: "Plasma",     raridade: "Sagrado",   gradFrom: "#ffd1f4", gradTo: "#c026d3", textColor: "#2a0a30",
    desc: "Energia pura. Atravessa qualquer defesa por uma janela curta.",
    forte: ["Holograma", "Metal"], fraco: ["Escuridao"] },
  { nome: "Escuridao",  raridade: "Mítico",    gradFrom: "#3a2a55", gradTo: "#0a0418", textColor: "#e9d8ff",
    desc: "Ataques noturnos. Maior crítico no escuro.",
    forte: ["Plasma", "Holograma"], fraco: ["Luz", "Radioativo"] },
  { nome: "Eletrico",   raridade: "Lendário",  gradFrom: "#fff4a8", gradTo: "#eab308", textColor: "#3a2e00",
    desc: "Cadeias de raios entre múltiplos alvos.",
    forte: ["Metal", "Holograma"], fraco: ["Borracha", "Gelo"] },
  { nome: "Explosão",   raridade: "Sagrado",   gradFrom: "#ffc2a8", gradTo: "#b91c1c", textColor: "#3a0a00",
    desc: "Dano em área massivo. Sacrifica defesa por impacto.",
    forte: ["Pedra", "Holograma"], fraco: ["Escuridao", "Acido"] },
  { nome: "Radioativo", raridade: "Mítico",    gradFrom: "#dfffb1", gradTo: "#65a30d", textColor: "#1a2a05",
    desc: "Envenena ao toque. Dano contínuo crescente.",
    forte: ["Escuridao", "Madeira"], fraco: ["Borracha"] },
  { nome: "Holograma",  raridade: "Divino",    gradFrom: "#cdf0ff", gradTo: "#0ea5e9", textColor: "#062a40",
    desc: "Projeção luminosa. Esquiva alta, defesa baixa.",
    forte: [], fraco: ["Plasma", "Escuridao", "Eletrico", "Explosão", "Radioativo"] },
];

const RARIDADES = ["Comum", "Raro", "Épico", "Lendário", "Mítico", "Sagrado", "Divino"];

const COMANDOS = [
  { cmd: "j!galo",     desc: "Veja seu galo atual, tipo e raridade" },
  { cmd: "j!train",    desc: "Treine seu galo e ganhe XP + Gold" },
  { cmd: "j!mission",  desc: "Veja suas missões ativas do dia" },
  { cmd: "j!raid",     desc: "Forme equipe e enfrente bosses cooperativos" },
  { cmd: "j!money",    desc: "Veja seu Gold, AsuraCoins, UserXP e treinos" },
  { cmd: "j!upgrades", desc: "Veja e gerencie os upgrades do seu galo" },
];

const MODOS = [
  { nome: "Arena",         desc: "Lute contra outros jogadores com limite de vitórias e derrotas.",   icon: "⚔" },
  { nome: "Ranqueada",     desc: "Suba de rank e ganhe Elo em batalhas oficiais.",                    icon: "★" },
  { nome: "Raid",          desc: "Enfrente bosses com até 5 jogadores cooperativos.",                 icon: "☄" },
  { nome: "Torre",         desc: "Modo semanal com andares progressivos e recompensas crescentes.",    icon: "▲" },
  { nome: "Torneio",       desc: "Eventos automáticos com recompensas para o Top 3.",                  icon: "♛" },
  { nome: "Portal",        desc: "Eventos em grupo com tempo limitado e drops únicos.",                icon: "◎" },
  { nome: "História",      desc: "Episódios com progressão e recompensas por estrelas.",               icon: "✦" },
  { nome: "Challenge",     desc: "Desafios periódicos com prêmios exclusivos.",                        icon: "◆" },
  { nome: "Boss",          desc: "Bosses com múltiplas formas e cooldown longo.",                      icon: "☼" },
  { nome: "Survival",      desc: "Sobreviva o máximo possível com recompensas crescentes.",            icon: "♾" },
  { nome: "Server Battle", desc: "Evento automático entre servidores inteiros.",                       icon: "⚐" },
];

// Skills mock for galo detail page
const SKILLS_BY_TIPO = {
  Holograma: [
    { nome: "Pulso Luminoso",     min: 16, max: 20, efeito: "Aplica BRILHO no alvo por 2 turnos." },
    { nome: "Garras Holográficas", min: 10, max: 15, efeito: "Atravessa 30% da defesa do oponente." },
    { nome: "Investida Fantasma",  min: 21, max: 26, efeito: "Não pode ser contra-atacado." },
    { nome: "Eco Vibrante",        min: 24, max: 32, efeito: "Causa dano duplicado em alvos com BRILHO." },
  ],
  default: [
    { nome: "Bicada Rápida",   min: 8,  max: 12, efeito: "Ataque rápido com chance de crítico." },
    { nome: "Esporão Afiado",  min: 14, max: 22, efeito: "Causa SANGRAMENTO por 2 turnos." },
    { nome: "Voo do Galo",     min: 18, max: 25, efeito: "Aumenta esquiva no próximo turno." },
    { nome: "Berro de Guerra", min: 22, max: 30, efeito: "Reduz ataque inimigo em 20%." },
  ],
};

// Donation plans
const PLANOS = [
  {
    nome: "Prime",
    tagline: "Benefícios essenciais",
    cor: "emerald",
    preco: 16,
    trimestral: { preco: 43, off: "10% OFF" },
    icone: "✋",
    beneficios: [
      "Ouro extra e XP extra por treino",
      "Trocar o nome do galo de graça",
      "Bônus adicional no comando daily",
      "Chance extra para conseguir chaves",
      "XP e money extra no galinheiro",
      "Bônus de xp no egg",
      "Consumíveis duram 30% a mais",
      "35 treinos extras por dia",
    ],
  },
  {
    nome: "VIP",
    tagline: "Todos os benefícios",
    cor: "primary",
    preco: 35,
    trimestral: { preco: 84, off: "20% OFF" },
    icone: "♛",
    destaque: true,
    beneficios: [
      "Todas as vantagens do Prime",
      "85 treinos extras por dia",
      "XP extra no passe de batalha",
      "Conteúdo exclusivo no passe",
      "Mais Asura Coins ao vender galos",
      "Bônus na torre e nas raids",
      "XP extra para seu pet (pombo)",
      "Bônus de XP e gold na survival",
    ],
  },
  {
    nome: "Royal VIP",
    tagline: "Experiência premium definitiva",
    cor: "royal",
    preco: 65,
    trimestral: { preco: 156, off: "20% OFF" },
    icone: "♚",
    beneficios: [
      "Todas as vantagens do VIP",
      "145 treinos extras por dia",
      "Usar qualquer imagem como background",
      "Utilizar background gifs",
      "Limite de givemoney 6× maior",
      "50% de XP e money extra nos contratos",
      "Badge exclusiva",
      "Prioridade no suporte",
    ],
  },
];

const RECURSOS_AVULSOS = [
  { nome: "Dinheiro",   icone: "$",  qtd: "20.000 Moedas",   preco: 10, gradient: ["#7c4dff", "#5025c9"] },
  { nome: "XP",         icone: "✦",  qtd: "12.000 XP",        preco: 10, gradient: ["#8b5cf6", "#6d28d9"] },
  { nome: "Asura Coins", icone: "◈", qtd: "1 Asura Coin",     preco: 10, gradient: ["#a855f7", "#7e22ce"] },
  { nome: "UserXP",     icone: "★",  qtd: "2.000 UserXP",     preco: 10, gradient: ["#7c3aed", "#5b21b6"] },
  { nome: "Resets",     icone: "↻",  qtd: "1 Reset de Galo",  preco: 15, gradient: ["#9333ea", "#6b21a8"] },
  { nome: "Chaves",     icone: "⚿",  qtd: "10 Chaves Raras",  preco: 12, gradient: ["#8e63f5", "#552bcf"] },
];

window.TIPOS = TIPOS;
window.RARIDADES = RARIDADES;
window.COMANDOS = COMANDOS;
window.MODOS = MODOS;
window.SKILLS_BY_TIPO = SKILLS_BY_TIPO;
window.PLANOS = PLANOS;
window.RECURSOS_AVULSOS = RECURSOS_AVULSOS;
