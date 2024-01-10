export function formatDate(date: string | Date, showDays = false): string {
  const parsedDate = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    year: 'numeric',
    day: showDays ? 'numeric' : undefined,
  };

  return parsedDate.toLocaleDateString('default', options);
}
