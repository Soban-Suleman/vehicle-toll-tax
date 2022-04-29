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

export interface Interchange {
  entryPoint: string;
  distance: number;
  key: number;
}

export function ensure<T>(
  argument: T | undefined | null,
  message: string = "This value was promised to be there."
): T {
  if (argument === undefined || argument === null) {
    throw new Error(message);
  }

  return argument;
}

export const getEntryExitDetails = (key: number | undefined) =>
  ensure(
    data.find((points) => points.key === key),
    "Entry Or Exit Point Provided was not in the records"
  );
