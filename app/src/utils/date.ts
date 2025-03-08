export const getDaysDifference = (date1: Date, date2: Date) => {
  const timeDifference = date1.getTime() - date2.getTime();
  return Math.ceil(timeDifference / (1000 * 3600 * 24));
};
