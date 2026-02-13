export type Chapter = {
  id: string;
  label: string;   // wat in de link staat
  index: number;   // frame index
  holdMs?: number; // pause op autoplay
  title: string;   // banner titel
  body: string;    // banner tekst
};

export const CHAPTERS: Chapter[] = [
  {
    id: "meenemen",
    label: "Meepakken",
    index: 0,
    holdMs: 1200,
    title: "Meepakken",
    body: "Korte uitleg over meenemen…",
  },
  {
    id: "opbergen",
    label: "Opbergen",
    index: 39,
    holdMs: 800,
    title: "Opbergen",
    body: "Horizontale opslag met kleine voetafdruk en nog steeds verplaatsbaar",
  },
  {
    id: "openen",
    label: "Openen",
    index: 46,
    holdMs: 1500,
    title: "Openen",
    body: "Uitleg over openen…",
  },
  {
    id: "ophijsen",
    label: "Ophijsen",
    index: 53,
    holdMs: 900,
    title: "Ophijsen",
    body: "Uitleg over ophijsen…",
  },
  {
    id: "verplaatsen",
    label: "Verplaatsen",
    index: 87,
    holdMs: 1800,
    title: "Verplaatsen",
    body: "Uitleg over verplaatsen…",
  },
];
