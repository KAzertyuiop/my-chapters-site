export type Chapter = {
  id: string;
  label: string;   // wat in de link staat
  index: number;   // frame index
  holdMs?: number; // pause op autoplay
  title: string;   // banner titel
  body: string;    // banner tekst
  href: string;    // anchor link
};

export const CHAPTERS: Chapter[] = [
  {
    id: "meevoeren",
    label: "Meevoeren",
    index: 0,
    holdMs: 3000,
    title: "Meevoeren",
    body: "Demonteer tot een plat pakket, IKEA style. Past in elk autokoffer.",
    href: "#transport"
  },
  {
    id: "opbergen",
    label: "Opbergen",
    index: 39,
    holdMs: 3000,
    title: "Opbergen",
    body: "Liggend overwinteren met kleine voetafdruk. Nog steeds verplaatsbaar.",
    href: "#opslag"
  },
  {
    id: "openen",
    label: "Openen",
    index: 46,
    holdMs: 3000,
    title: "Openen",
    body: "Autovrij laten drogen. Of gebruik je tent zonder auto. In de tuin of op reis?",
    href: "#gebruik"
  },
  {
    id: "ophijsen",
    label: "Ophijsen",
    index: 53,
    holdMs: 3000,
    title: "Ophijsen",
    body: "Voorzichtig hijsen als een kraan. 75 kg voelt als 25 of zelfs 15.",
    href: "#kraan"
  },
  {
    id: "verplaatsen",
    label: "Verplaatsen",
    index: 87,
    holdMs: 3000,
    title: "Verplaatsen",
    body: "Rol voorbij smalle punten: poortjes, gangen, deuren, stoep, steeg...",
    href: "#kar"
  },
];
