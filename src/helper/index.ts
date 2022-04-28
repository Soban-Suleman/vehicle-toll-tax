const discountObj = {
  special: {
    applicableOn: ["Mar 23", "Dec 25", "Aug 14"],
    discount: 50,
  },
  odd: {
    discount: 10,
    applicableOn: ["Tue", "Thu"],
  },
  even: {
    discount: 10,
    applicableOn: ["Mon", "Wed"],
  },
};

export const vehicleNumberCheck = (vehicleNumber: string) =>
  /[A-Z]{3}[-\s\.]?[0-9]{4}$/im.test(vehicleNumber);

export const discountCalculator = (
  date: string,
  numberPlateInfo: "odd" | "even"
) => {
  const entryDate = new Date(date).toDateString().slice(4, 10);
  const entryDay = new Date(date).toDateString().split(" ")[0];

  if (discountObj.special.applicableOn.includes(entryDate))
    return discountObj.special.discount;
  else if (discountObj[numberPlateInfo].applicableOn.includes(entryDay))
    return discountObj[numberPlateInfo].discount;
  else return 0;
};
