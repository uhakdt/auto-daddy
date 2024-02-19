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

const InsertSpaces = (inputStr) => {
  const noSpacesStr = inputStr.replace(/\s/g, "");

  if (noSpacesStr.length <= 5) {
    return inputStr;
  }

  let result = "";

  for (let i = 0; i < noSpacesStr.length; i++) {
    result += noSpacesStr[i];

    if ((i + 1) % 5 === 0) {
      result += " ";
    }
  }

  return result;
};

export { CapitalizeEachWord, GetOrdinalSuffix, InsertSpaces };
