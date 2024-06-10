export function formatDate(date: Date) {
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDateParts = date
    .toLocaleDateString("en-IN", dateOptions)
    .split(",");
  const formattedDate =
    formattedDateParts.slice(0, 2).join(",") +
    formattedDateParts.slice(2).join(" ");

  const formattedTime = date
    .toLocaleTimeString("en-IN", timeOptions)
    .toUpperCase();

  return `${formattedDate} ${formattedTime}`;
}
