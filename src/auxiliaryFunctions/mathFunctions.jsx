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

export { CalcAvgMileAYear, CalcLastYearMile };
