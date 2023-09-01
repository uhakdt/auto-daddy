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
  // Remove all whitespaces from the string
  const noSpacesStr = inputStr.replace(/\s/g, "");

  // Check if the length is greater than 5
  if (noSpacesStr.length <= 5) {
    return inputStr;
  }

  // Initialize an empty string to hold the result
  let result = "";

  // Loop through the string and insert a space after every 5th character
  for (let i = 0; i < noSpacesStr.length; i++) {
    result += noSpacesStr[i];

    // Insert a space after every 5th character
    if ((i + 1) % 5 === 0) {
      result += " ";
    }
  }

  return result;
};

export { CapitalizeEachWord, GetOrdinalSuffix, InsertSpaces };
