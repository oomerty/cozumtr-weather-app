import getTime from "./getTime";
import type WeatherType from "../types/WeatherType";

function conditionCheck(
  details: WeatherType,
  condition: string
): {
  conditionArr: object;
  conditionStreakStartTime: number;
  conditionStreakEndTime: number;
} {
  const forecastArr = details?.forecast.forecastday[0].hour;

  const conditionArr = forecastArr?.filter(
    (el) =>
      el.condition.text.includes(condition) &&
      Number(getTime(el.time, "hh")) >=
        Number(getTime(details?.location.localtime, "hh"))
  );

  const conditionStreakStartTime = Number(
    getTime(conditionArr.at(0)?.time, "hh")
  );
  let conditionStreakEndTime = Number(getTime(conditionArr.at(0)?.time, "hh"));

  conditionArr.forEach((el) => {
    const currTime = getTime(el.time, "hh");
    if (conditionStreakEndTime && conditionStreakEndTime + 1 === currTime)
      conditionStreakEndTime = currTime;
  });

  return { conditionArr, conditionStreakStartTime, conditionStreakEndTime };
}

export default conditionCheck;
