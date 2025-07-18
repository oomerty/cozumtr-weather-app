function getTime(timeString: string | undefined, type: "hh:mm" | "hh") {
  if (!timeString) return;

  const formattedTime = timeString.split(" ").at(1);

  if (type === "hh") return Number(formattedTime?.split(":").at(0));

  return formattedTime;
}

export default getTime;
