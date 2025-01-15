function formatDate(inputDate: string) {
  const [year, month, day] = inputDate.split("-");
  return `${month}/${day}/${year}`;
}

function formatMinutesToHours(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h${remainingMinutes}m`;
}

function formatRating(rating: number) {
  return (rating * 10).toFixed();
}

export { formatDate, formatMinutesToHours, formatRating };