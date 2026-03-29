export type Chapter = {
  id: string;
  label: string;   // wat in de link staat
  index: number;   // frame index
  holdMs?: number; // pause op autoplay
  playOffsetY?: number; // verticale nudge voor play overlay
  title: string;   // banner titel
  body: string;    // banner tekst
  href: string;    // anchor link
};

export const CHAPTERS: Chapter[] = [
  {
    id: "meevoeren",
    label: "Meevoeren",
    index: 0,
    holdMs: 3500,
    playOffsetY: 0,
    title: "Meevoeren",
    body: "Demonteer tot een plat pakket. IKEA style. Past in elk autokoffer.",
    href: "#meevoeren"
  },
  {
    id: "opbergen",
    label: "Opbergen",
    index: 39,
    holdMs: 3500,
    playOffsetY: 0,
    title: "Opbergen",
    body: "Liggend overwinteren met kleine voetafdruk. Nog steeds verplaatsbaar.",
    href: "#opbergen"
  },
  {
    id: "openen",
    label: "Openen",
    index: 46,
    holdMs: 3500,
    playOffsetY: 40,
    title: "Openen",
    body: "Autovrij laten drogen. Of gebruik je tent zonder auto. In de tuin of op reis.",
    href: "#openen"
  },
  {
    id: "ophijsen",
    label: "Ophijsen",
    index: 53,
    holdMs: 3500,
    playOffsetY: 0,
    title: "Ophijsen",
    body: "Voorzichtig hijsen, met hefboom. 75 kg voelt 3 tot 4 keer lichter.",
    href: "#ophijsen"
  },
  {
    id: "verplaatsen",
    label: "Verplaatsen",
    index: 87,
    holdMs: 3500,
    playOffsetY: 0,
    title: "Verplaatsen",
    body: "Rol voorbij smalle punten: poortjes, gangen, deuren, stoep, steeg...",
    href: "#verplaatsen"
  },
];
