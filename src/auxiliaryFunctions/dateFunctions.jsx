const FormatDate = (d) => {
  let date;

  // Check if the date is in "DD/MM/YYYY" format
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(d)) {
    const parts = d.split("/");
    date = new Date(parts[2], parts[1] - 1, parts[0]);
  } else {
    date = new Date(d);
  }

  const day = date.getDate();
  let suffix = "";
  switch (day) {
    case 1:
    case 21:
    case 31:
      suffix = "st";
      break;
    case 2:
    case 22:
      suffix = "nd";
      break;
    case 3:
    case 23:
      suffix = "rd";
      break;
    default:
      suffix = "th";
  }

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day}${suffix} of ${month} ${year}`;
};

export default FormatDate;
