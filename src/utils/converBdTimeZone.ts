export function convertToBDTime(time: string) {
  // time = "16:40"
  const [hours, minutes] = time.split(":").map(Number);

  // আজকের তারিখ + backend time
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);

  return date.toLocaleTimeString("en-BD", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Dhaka",
  });
}