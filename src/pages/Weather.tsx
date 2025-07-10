import { useEffect, useCallback } from "react";

import { useWeather } from "../hooks/useWeather";

import { Grid } from "@mui/material";

import WeatherHero from "../components/WeatherHero";
import WeatherDetails from "../components/WeatherDetails";
import type WeatherType from "../types/WeatherType";

function Weather() {
  const { fetchWeather, weather, loading, error } = useWeather();

  const handleSearch = useCallback(
    (city: string) => {
      if (city.trim()) {
        fetchWeather(city);
      }
    },
    [fetchWeather]
  );

  useEffect(() => {
    handleSearch("Eskisehir");
  }, [handleSearch]);

  return (
    <Grid
      container
      spacing={4}
      margin={0}
      direction="row"
      justifyContent="center"
      width="auto"
      height={{ sm: "fit", md: "100vh" }}
      overflow="hidden"
      paddingY={2}
    >
      <Grid size={{ sm: 12, md: 5 }}>
        {loading && <p>Yükleniyor...</p>}
        {error && <p>{error}</p>}
        <WeatherHero
          details={weather as WeatherType}
          handleSearch={handleSearch}
        />
      </Grid>
      <Grid size={{ sm: 12, md: 7 }} height="100%">
        <WeatherDetails details={weather as WeatherType} />
      </Grid>
    </Grid>
  );
}

export default Weather;
