export function formatDateString(date: string): string {
  const parsedDate = new Date(date);

  return parsedDate.getFullYear().toString();
}
