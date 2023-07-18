export function dateStrFormatter(dateString) {
  const date = new Date(dateString);

  const year = date.getUTCFullYear();
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  const formattedDate = `${year}-${day}-${month} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
}

export function dateStrFormatter_YYYYMMDD(dateString) {
  const date = new Date(dateString);

  const year = date.getUTCFullYear();
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export function calculateDateDifference(date1, date2) {
  const diffInMilliseconds = date1.getTime() - date2.getTime();
  const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
  const diffInDays = Math.floor(diffInMilliseconds / millisecondsPerDay);
  return diffInDays;
}
