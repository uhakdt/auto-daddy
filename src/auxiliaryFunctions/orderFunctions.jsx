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

const CalculateTaxDaysLeft = (d) => {
  // Convert string into a Date object
  d = new Date(d);

  if (!(d instanceof Date)) {
    throw new Error("The argument must be a Date object.");
  }

  // Calculate the number of days between the current date and the date passed in
  const daysLeft = Math.floor(
    (d.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return daysLeft;
};

const CalculateTaxSingle12MonthPayment = (
  vehicleClass,
  co2Emissions,
  isElectric,
  fuelType
) => {
  if (isElectric || vehicleClass !== "Car") {
    return "£0";
  }

  // Lookup table for CO2 emissions and corresponding tax rates
  const rates = [
    { limit: 50, diesel: "£30", petrol: "£10", alternative: "£20" },
    { limit: 75, diesel: "£130", petrol: "£30", alternative: "£120" },
    { limit: 90, diesel: "£165", petrol: "£130", alternative: "£155" },
    { limit: 100, diesel: "£185", petrol: "£165", alternative: "£175" },
    { limit: 110, diesel: "£210", petrol: "£185", alternative: "£200" },
    { limit: 130, diesel: "£255", petrol: "£210", alternative: "£245" },
    { limit: 150, diesel: "£645", petrol: "£255", alternative: "£635" },
    { limit: 170, diesel: "£1,040", petrol: "£645", alternative: "£1,030" },
    { limit: 190, diesel: "£1,565", petrol: "£1,040", alternative: "£1,555" },
    { limit: 225, diesel: "£2,220", petrol: "£1,565", alternative: "£2,210" },
    { limit: 255, diesel: "£2,605", petrol: "£2,220", alternative: "£2,595" },
    {
      limit: Infinity,
      diesel: "£2,605",
      petrol: "£2,605",
      alternative: "£2,595",
    },
  ];

  // Select rate based on CO2 emissions
  let rate = rates.find((r) => co2Emissions <= r.limit);

  // Apply fuel type adjustment
  switch (fuelType) {
    case "DIESEL":
      return rate.diesel;
    case "PETROL":
      return rate.petrol;
    default:
      return rate.alternative;
  }
};

const CalcAvgMileAYear = (mileageRecordList) => {
  if (mileageRecordList.length > 0) {
    // Sort array in descending order by DateOfInformation
    let sortedRecordList = [...mileageRecordList].sort(
      (a, b) => new Date(b.DateOfInformation) - new Date(a.DateOfInformation)
    );

    let firstElement = sortedRecordList[0];
    let firstElementDate = new Date(firstElement.DateOfInformation);
    let firstElementMileage = firstElement.Mileage;

    if (sortedRecordList.length > 1) {
      let lastElement = sortedRecordList[sortedRecordList.length - 1];
      let lastElementDate = new Date(lastElement.DateOfInformation);

      // Calculate difference in years
      let diffInYears =
        firstElementDate.getFullYear() - lastElementDate.getFullYear();

      // Calculate average mileage per year
      return firstElementMileage / diffInYears;
    } else {
      return firstElementMileage;
    }
  }

  return 0;
};

const CalcLastYearMile = (mileageRecordList) => {
  if (mileageRecordList.length > 0) {
    // Sort array in descending order by DateOfInformation
    let sortedRecordList = [...mileageRecordList].sort(
      (a, b) => new Date(b.DateOfInformation) - new Date(a.DateOfInformation)
    );

    let firstElement = sortedRecordList[0];
    let firstElementDate = new Date(firstElement.DateOfInformation);
    let firstElementMileage = firstElement.Mileage;

    if (sortedRecordList.length > 1) {
      let lastYearDate = new Date(
        firstElementDate.getFullYear() - 1,
        firstElementDate.getMonth(),
        firstElementDate.getDate()
      );

      let lastYearElement = sortedRecordList.reduce((closest, current) => {
        return Math.abs(new Date(current.DateOfInformation) - lastYearDate) <
          Math.abs(new Date(closest.DateOfInformation) - lastYearDate)
          ? current
          : closest;
      });

      return firstElementMileage - lastYearElement.Mileage;
    } else {
      return firstElementMileage;
    }
  }

  return 0;
};

export {
  CheckOrderCriteria,
  CalculateMOTPassRate,
  CalculateMOTFailedTests,
  CalculateTotalAdviceItems,
  CalculateTotalAdviceItemsFailed,
  CalculateTaxDaysLeft,
  CalculateTaxSingle12MonthPayment,
  CalcAvgMileAYear,
  CalcLastYearMile,
};
