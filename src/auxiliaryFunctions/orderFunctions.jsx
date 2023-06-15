const CheckOrderCriteria = (o) => {
  // TODO: "Check order criteria";

  return Math.random() >= 0.5;
};

const CalculateMOTPassRate = (l) => {
  if (!Array.isArray(l)) {
    throw new Error("The argument must be an array.");
  }

  // Ensure the array is not empty
  if (l.length === 0) {
    throw new Error("The array must not be empty.");
  }

  // Count the number of "Pass" results
  const passCount = l.reduce((count, item) => {
    return count + (item.TestResult === "Pass" ? 1 : 0);
  }, 0);

  // Calculate the percentage of "Pass" results and format it as a string
  const passRate = ((passCount / l.length) * 100).toFixed(2);
  return `${passRate}%`;
};

const CalculateMOTFailedTests = (l) => {
  if (!Array.isArray(l)) {
    throw new Error("The argument must be an array.");
  }

  // Ensure the array is not empty
  if (l.length === 0) {
    throw new Error("The array must not be empty.");
  }

  // Count the number of "Failed" results
  const failedTests = l.reduce((count, item) => {
    return count + (item.TestResult === "Fail" ? 1 : 0);
  }, 0);

  return failedTests;
};

const CalculateTotalAdviceItems = (l) => {
  if (!Array.isArray(l)) {
    throw new Error("The argument must be an array.");
  }

  // Ensure the array is not empty
  if (l.length === 0) {
    throw new Error("The array must not be empty.");
  }

  // Count the number of items in each item in the array within AnnotationDetailsList property within each item in l
  const adviceItems = l.reduce((count, item) => {
    return count + item.AnnotationDetailsList.length;
  }, 0);

  return adviceItems;
};

const CalculateTotalAdviceItemsFailed = (l) => {
  if (!Array.isArray(l)) {
    throw new Error("The argument must be an array.");
  }

  // Ensure the array is not empty
  if (l.length === 0) {
    throw new Error("The array must not be empty.");
  }

  // Add MajorFailureCount property from each item in l
  const adviceItemsFailed = l.reduce((count, item) => {
    return count + item.MajorFailureCount;
  }, 0);

  return adviceItemsFailed;
};

export {
  CheckOrderCriteria,
  CalculateMOTPassRate,
  CalculateMOTFailedTests,
  CalculateTotalAdviceItems,
  CalculateTotalAdviceItemsFailed,
};
