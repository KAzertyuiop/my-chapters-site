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
    holdMs: 3000,
    title: "Meevoeren",
    body: "Demonteer tot een plat pakket, IKEA style. Past in elk autokoffer.",
  },
  {
    id: "opbergen",
    label: "Opbergen",
    index: 39,
    holdMs: 3000,
    title: "Opbergen",
    body: "Horizontale opslag met een minimale voetafdruk. Nog steeds verplaatsbaar.",
  },
  {
    id: "openen",
    label: "Openen",
    index: 46,
    holdMs: 3000,
    title: "Openen",
    body: "Autovrij laten drogen. Of benut je tent zonder auto, in de tuin of op reis.",
  },
  {
    id: "ophijsen",
    label: "Ophijsen",
    index: 53,
    holdMs: 3000,
    title: "Ophijsen",
    body: "Rustig hijsen tot ooghoogte, als een kraan. 75 kg voelt als 25.",
  },
  {
    id: "verplaatsen",
    label: "Verplaatsen",
    index: 87,
    holdMs: 3000,
    title: "Verplaatsen",
    body: "Rol door smalle punten, zoals deuren, gangen, stoep of steeg."
  },
];
