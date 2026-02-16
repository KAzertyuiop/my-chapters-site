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
    id: "meevoeren",
    label: "Meevoeren",
    index: 0,
    holdMs: 1200,
    title: "Meevoeren",
    body: "Demonteer tot een plat pakket (IKEA style) dat in elk* koffer past",
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
    body: "Autovrij laten drogen, of je tent ook gebruiken zonder auto",
  },
  {
    id: "ophijsen",
    label: "Ophijsen",
    index: 53,
    holdMs: 900,
    title: "Ophijsen",
    body: "Voorzichtig tot op ooghoogte, met een heftboom van 4-op-1",
  },
  {
    id: "verplaatsen",
    label: "Verplaatsen",
    index: 87,
    holdMs: 1800,
    title: "Verplaatsen",
    body: "Rol zonder moeite door smalle punten zoals deuren en gangen"
  },
];
