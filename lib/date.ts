export function getISTDate() {
  return new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Kolkata",
  }); // format: YYYY-MM-DD
}
