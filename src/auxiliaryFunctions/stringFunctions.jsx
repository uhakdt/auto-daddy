const CapitalizeEachWord = (s) => {
  return s
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const GetOrdinalSuffix = (i) => {
  switch (i) {
    case 0:
      return "1st";
    case 1:
      return "2nd";
    default:
      return i + 1 + "th";
  }
};

export { CapitalizeEachWord, GetOrdinalSuffix };
