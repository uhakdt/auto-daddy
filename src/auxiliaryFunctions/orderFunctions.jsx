const CheckOrderCriteria = (o) => {
  if (!o) return false;
  return Math.random() >= 0.5;
};

const CalculateMOTPassRate = (l) => {
  if (!l || !Array.isArray(l) || l.length === 0) {
    return "0.00%";
  }

  const passCount = l.reduce((count, item) => {
    return count + (item.TestResult === "Pass" ? 1 : 0);
  }, 0);

  const passRate = ((passCount / l.length) * 100).toFixed(2);
  return `${passRate}%`;
};

const CalculateMOTFailedTests = (motTests) => {
  if (!motTests || !Array.isArray(motTests) || motTests.length === 0) {
    return 0;
  }

  const failCount = motTests.reduce((count, test) => {
    return count + (test.testResult === "Fail" ? 1 : 0);
  }, 0);

  return failCount;
};

const CalculateTotalAdviceItems = (l) => {
  if (!Array.isArray(l) || l.length === 0) {
    return 0;
  }

  const totalAdviceItems = l.reduce((count, item) => {
    if (Array.isArray(item.AnnotationDetailsList)) {
      return count + item.AnnotationDetailsList.length;
    } else {
      return count;
    }
  }, 0);

  return totalAdviceItems;
};

const CalculateTotalAdviceItemsFailed = (l) => {
  if (!Array.isArray(l) || l.length === 0) {
    return 0;
  }

  const totalAdviceItemsFailed = l.reduce((count, item) => {
    if (typeof item.MajorFailureCount === "number") {
      return count + item.MajorFailureCount;
    } else {
      return count;
    }
  }, 0);

  return totalAdviceItemsFailed;
};

const CalculateTaxDaysLeft = (d) => {
  if (!d) {
    return "Invalid Date";
  }

  d = new Date(d);

  if (!(d instanceof Date)) {
    return "Invalid Date";
  }

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
  if (
    !vehicleClass ||
    co2Emissions === undefined ||
    isElectric === undefined ||
    !fuelType
  ) {
    return "Missing Parameters";
  }

  if (isElectric || vehicleClass !== "Car") {
    return "£0";
  }

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

  let rate = rates.find((r) => co2Emissions <= r.limit);

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
  if (!mileageRecordList || mileageRecordList.length === 0) {
    return 0;
  }

  let sortedRecordList = [...mileageRecordList].sort(
    (a, b) => new Date(b.DateOfInformation) - new Date(a.DateOfInformation)
  );

  let firstElement = sortedRecordList[0];
  let firstElementDate = new Date(firstElement.DateOfInformation);
  let firstElementMileage = firstElement.Mileage;

  if (sortedRecordList.length > 1) {
    let lastElement = sortedRecordList[sortedRecordList.length - 1];
    let lastElementDate = new Date(lastElement.DateOfInformation);

    let diffInYears =
      firstElementDate.getFullYear() - lastElementDate.getFullYear();

    return firstElementMileage / diffInYears;
  } else {
    return firstElementMileage;
  }
};

const CalcLastYearMile = (mileageRecordList) => {
  if (!mileageRecordList || mileageRecordList.length === 0) {
    return 0;
  }

  let sortedRecordList = [...mileageRecordList].sort(
    (a, b) => new Date(b.DateOfInformation) - new Date(a.DateOfInformation)
  );

  let firstElement = sortedRecordList[0];
  let firstElementDate = new Date(firstElement.DateOfInformation);
  let firstElementMileage = firstElement.Mileage;

  if (sortedRecordList.length > 1) {
    let lastElement;
    for (let i = 1; i < sortedRecordList.length; i++) {
      let recordDate = new Date(sortedRecordList[i].DateOfInformation);
      if (firstElementDate.getFullYear() - recordDate.getFullYear() === 1) {
        lastElement = sortedRecordList[i];
        break;
      }
    }

    if (lastElement) {
      return firstElementMileage - lastElement.Mileage;
    }
  }

  return 0;
};

function IsULEZCompliant(fuelType, euroScore, vehicleClass) {
  if (!fuelType || !vehicleClass || euroScore === null || euroScore === "") {
    return false;
  }

  fuelType = fuelType.toLowerCase();
  vehicleClass = vehicleClass.toLowerCase();

  if (vehicleClass === "motorcycle") {
    return euroScore >= 3;
  }

  if (vehicleClass === "car") {
    if (fuelType === "petrol") {
      return euroScore >= 4;
    } else if (fuelType === "diesel") {
      return euroScore >= 6;
    } else {
      return false;
    }
  }

  return false;
}

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
  IsULEZCompliant,
};
