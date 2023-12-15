export function formatDateString(date: string): string {
  const parsedDate = new Date(date);

  const formattedDate = `${parsedDate.toLocaleString('default', {
    month: 'long',
  })} ${parsedDate.getFullYear()}`;

  return formattedDate;
}
