export function formatDate(
  date: string | Date,
  showDays = false,
  showTime = false,
): string {
  const parsedDate = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    year: 'numeric',
    day: showDays ? 'numeric' : undefined,
    hour: showTime ? 'numeric' : undefined,
    minute: showTime ? '2-digit' : undefined,
  };

  return parsedDate.toLocaleDateString(undefined, options);
}
