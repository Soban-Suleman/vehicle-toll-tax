const data: Interchange[] = [
  {
    entryPoint: "Zero Point",
    distance: 0,
    key: 1,
  },
  {
    entryPoint: "NS Interchange",
    distance: 5,
    key: 2,
  },
  {
    entryPoint: "Ph4 Interchange",
    distance: 10,
    key: 3,
  },
  {
    entryPoint: "Ferozpur Interchange",
    distance: 17,
    key: 4,
  },
  {
    entryPoint: "Lake City Interchange",
    distance: 24,
    key: 5,
  },
  {
    entryPoint: "Raiwand Interchange",
    distance: 29,
    key: 6,
  },
  {
    entryPoint: "Bahria Interchange",
    distance: 34,
    key: 7,
  },
];

interface Interchange {
  entryPoint: string;
  distance: number;
  key: number;
}

export default data;

export const getEntryExitDetails = (key: number) =>
  data.find((points) => points.key === key);
