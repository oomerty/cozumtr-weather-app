import React, {
  useEffect,
  useCallback,
  useState,
  useRef,
  Suspense,
} from "react";

import type WeatherType from "../types/WeatherType";
import { useThemeMode } from "../contexts/useThemeMode";
import { useWeather } from "../hooks/useWeather";

import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import MouseIcon from "@mui/icons-material/Mouse";

import NavBar from "../components/general/NavBar";
import WeatherHero from "../components/WeatherHero";
const WeatherDetails = React.lazy(() => import("../components/WeatherDetails"));

const IP_URL = import.meta.env.VITE_IP_API_URL;

function Weather() {
  const { fetchWeather, weather, loading, error } = useWeather();
  const { forceMode, setMode } = useThemeMode();

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
    async function getIP() {
      try {
        const res = await fetch(IP_URL);
        const json = await res.json();

        if (json && json.ip) {
          handleSearch(json.ip);
        } else {
          handleSearch("Eskisehir");
        }
        return json;
      } catch {
        throw new Error("An error occured while gettin IP.");
      }
    }

    getIP();
  }, [handleSearch]);

  useEffect(() => {
    if (!forceMode && weather?.current) {
      let backgroundStyle = "";

      const dayGradient = "linear-gradient(180deg, #74b3e3 30%, #4b93ebff 90%)";
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
      }

      document.body.style.background = backgroundStyle;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundBlendMode = "overlay";
      document.body.style.backgroundAttachment = "fixed";
    }
  }, [weather, forceMode, setMode]);

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
        <Suspense
          fallback={
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress />
            </Box>
          }
        >
          <WeatherDetails
            details={weather as WeatherType}
            heroOffScreen={heroOffScreen}
          />
        </Suspense>
      </Grid>
    </Grid>
  );
}

export default Weather;
