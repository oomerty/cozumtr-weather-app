import { useEffect, useCallback, useState, useRef } from "react";

import type WeatherType from "../types/WeatherType";
import { useThemeMode } from "../contexts/useThemeMode";
import { useWeather } from "../hooks/useWeather";

import { Grid, Typography } from "@mui/material";
import MouseIcon from "@mui/icons-material/Mouse";

import NavBar from "../components/general/NavBar";
import WeatherHero from "../components/WeatherHero";
import WeatherDetails from "../components/WeatherDetails";

function Weather() {
  const { fetchWeather, weather, loading, error } = useWeather();
  const { setMode } = useThemeMode();

  const heroRef = useRef<HTMLDivElement | null>(null);
  const [heroOffScreen, setHeroOffScreen] = useState(false);

  const handleSearch = useCallback(
    (city: string) => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      if (city.trim()) {
        fetchWeather(city);
      }
    },
    [fetchWeather]
  );

  useEffect(() => {
    handleSearch("Eskisehir");
  }, [handleSearch]);

  useEffect(() => {
    if (weather?.current) {
      let backgroundStyle = "";

      const dayGradient =
        "linear-gradient(180deg, #60acfdff 30%, #95c5fcff 90%)";
      const nightGradient = "linear-gradient(180deg, #00060f 30%, #10357a 90%)";
      const baseGradient = weather.current.is_day ? dayGradient : nightGradient;
      setMode(weather.current.is_day ? "day" : "night");

      let weatherOverlay = "";
      const condition = weather.current.condition.text.toLowerCase();

      if (condition.includes("rain") || condition.includes("drizzle")) {
        weatherOverlay = "url('/img/heavy-rain.gif')";
      } else if (condition.includes("snow")) {
        weatherOverlay = "url('/weather-gifs/snow.gif')";
      } else if (condition.includes("thunder") || condition.includes("storm")) {
        weatherOverlay = "url('/weather-gifs/thunder.gif')";
      } else if (condition.includes("fog") || condition.includes("mist")) {
        weatherOverlay = "url('/weather-gifs/fog.gif')";
      } else if (condition.includes("cloud")) {
        weatherOverlay = "url('/img/cloudeneme.webp')";
      }

      if (weatherOverlay) {
        backgroundStyle = `${baseGradient}, ${weatherOverlay}`;
      } else {
        backgroundStyle = baseGradient;
      }

      document.body.style.background = backgroundStyle;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundBlendMode = "overlay";
      document.body.style.backgroundAttachment = "fixed";
    }
  }, [weather, setMode]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setHeroOffScreen(!entry.isIntersecting),
      { threshold: 0 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Grid
      container
      spacing={{ xs: 3, md: 10 }}
      margin={0}
      direction="row"
      justifyContent="center"
      width="auto"
      height="fit"
      paddingX={{ xs: 2, md: 0 }}
      paddingBottom={2}
    >
      <Grid
        size={12}
        order={{ xs: 1, md: 0 }}
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          paddingTop: { xs: 2, md: 0 },
        }}
      >
        <NavBar
          details={weather as WeatherType}
          handleSearch={handleSearch}
          loading={loading}
          error={error}
          heroOffScreen={heroOffScreen}
        />
      </Grid>

      <Grid order={{ xs: 0, md: 1 }} size={{ xs: 12, md: 12 }}>
        <WeatherHero
          details={weather as WeatherType}
          loading={loading}
          error={error}
          ref={heroRef}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 12 }} order={{ xs: 2, md: 2 }}>
        <Typography
          variant="body1"
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            transition: "300ms",
            opacity: "100%",
            color: "text.secondary",
            ...(heroOffScreen && { display: "none", opacity: "0%" }),
          }}
        >
          <MouseIcon fontSize="inherit" /> Scroll for details
        </Typography>
        <WeatherDetails
          details={weather as WeatherType}
          heroOffScreen={heroOffScreen}
        />
      </Grid>
    </Grid>
  );
}

export default Weather;
