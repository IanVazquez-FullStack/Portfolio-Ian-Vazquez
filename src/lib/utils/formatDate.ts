export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date: ${dateString}`);
  }
  return new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
