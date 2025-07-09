import { useEffect } from "react";

import { useWeather } from "../hooks/useWeather";

import { Grid } from "@mui/material";

import WeatherHero from "../components/WeatherHero";
import WeatherDetails from "../components/WeatherDetails";

function Weather() {
  const { fetchWeather, weather, loading, error } = useWeather();

  const handleSearch = (city: string) => {
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  useEffect(() => {
    handleSearch("Eskisehir");
  }, []);

  return (
    <Grid
      container
      spacing={{ sm: 2, md: 4 }}
      margin={0}
      direction="row"
      justifyContent="center"
      width="100%"
      height={{ sm: "fit", md: "100vh" }}
      overflow="hidden"
    >
      <Grid size={{ sm: 12, md: 5 }} marginY={2}>
        {loading && <p>Yükleniyor...</p>}
        {error && <p>{error}</p>}
        <WeatherHero details={weather} handleSearch={handleSearch} />
      </Grid>
      <Grid size={{ sm: 12, md: 7 }} marginY={2}>
        <WeatherDetails details={weather} />
      </Grid>
    </Grid>
  );
}

export default Weather;
