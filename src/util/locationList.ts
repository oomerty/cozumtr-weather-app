import { City } from "country-state-city";

function getCityList() {
  const cityList = City.getAllCities();

  const cityNameArr = cityList.map((el) => {
    return el.name;
  });

  return [...new Set(cityNameArr)];
}

export { getCityList };
