export const convertTimeFormat = (time: string) => {
  let [hours, minutes] = time.split(":");
  const meridiem = +hours >= 12 ? "PM" : "AM";
  hours = (+hours % 12).toString() || "12";
  return `${hours}:${minutes} PM`;
};
