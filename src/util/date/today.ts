export function getTodayDate(): any {
  const newDate = new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth();
  const date = newDate.getDate();
  const today = new Date(year, month, date);
  return today;
}
