export const vehicleNumberCheck = (vehicleNumber: string) =>
  /[A-Z]{3}[-\s\.]?[0-9]{4}$/im.test(vehicleNumber);

export const discountCalculator = (date: string, numberPlateInfo: string) => {
  let discount = 0;
  const entryDay = new Date(date).toDateString().split(" ")[0];
  if (
    entryDay === "Mon" ||
    (entryDay === "Wed" && numberPlateInfo === "even")
  ) {
    discount = discount + 10;
    console.log("even");
  } else if (
    entryDay === "Mon" ||
    (entryDay === "Wed" && numberPlateInfo === "even")
  ) {
    discount = discount + 10;
  }
  return 1;
};
