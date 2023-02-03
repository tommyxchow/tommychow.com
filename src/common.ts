export function formatDateString(date: string): string {
  const projectDate = new Date(date);

  const formattedDate = `${projectDate.toLocaleString('default', {
    month: 'long',
  })} ${projectDate.getFullYear()}`;

  return formattedDate;
}
