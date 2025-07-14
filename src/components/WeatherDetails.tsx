import { useEffect } from "react";

import { useThemeMode } from "../contexts/useThemeMode";
import type WeatherType from "../types/WeatherType";

import { Grid, Paper, Typography } from "@mui/material";

import WeatherDetailCard from "./general/WeatherDetailCard";
import UV from "./details/uv/UV";
import Forecast from "./details/forecast/Forecast";
import Humidity from "./details/humidity/Humidity";
import Wind from "./details/wind/Wind";

interface WeatherDetailsProps {
  details: WeatherType;
}

function WeatherDetails({ details }: WeatherDetailsProps) {
  const { setMode } = useThemeMode();

  const timeEpoch = Date.parse(details?.location.localtime);
  const time = new Date(timeEpoch);

  const currentTemp = details?.current.temp_c;
  const feelsLikeTemp = details?.current.feelslike_c;

  const forecastArr = details?.forecast.forecastday[0].hour;
  const forecastFromNow = forecastArr?.slice(time.getHours());

  if (forecastFromNow?.length < 5) {
    const forecastArrTomorrow = details?.forecast.forecastday[1].hour;
    Object.values(forecastArrTomorrow).forEach((element) => {
      forecastFromNow.push(element);
    });
  }

  useEffect(() => {
    if (details?.current) {
      let backgroundStyle = "";

      const dayGradient = "linear-gradient(180deg, #4c90d9 30%, #95c5fcff 90%)";
      const nightGradient = "linear-gradient(180deg, #00060f 30%, #10357a 90%)";
      const baseGradient = details.current.is_day ? dayGradient : nightGradient;
      setMode(details.current.is_day ? "day" : "night");

      let weatherOverlay = "";
      const condition = details.current.condition.text.toLowerCase();

      if (condition.includes("rain") || condition.includes("drizzle")) {
        weatherOverlay = "url('/img/heavy-rain.gif')";
      } else if (condition.includes("snow")) {
        weatherOverlay = "url('/weather-gifs/snow.gif')";
      } else if (condition.includes("thunder") || condition.includes("storm")) {
        weatherOverlay = "url('/weather-gifs/thunder.gif')";
      } else if (condition.includes("fog") || condition.includes("mist")) {
        weatherOverlay = "url('/weather-gifs/fog.gif')";
      } else if (condition.includes("cloud")) {
        weatherOverlay = "url('/img/cloud.gif')";
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
    }
  }, [details, setMode]);

  return (
    <Paper
      sx={{
        flexDirection: "column",
        height: "100%",
        maxHeight: { sm: "100%", md: "100vh" },
        overflow: "auto",
        p: { xs: 2, md: 3 },
        boxSizing: "border-box",
        "&::-webkit-scrollbar": {
          width: "8px",
          color: "red",
          backgroundColor: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          borderRadius: "32px",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          },
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          borderRadius: "32px",
          marginY: "32px",
        },
      }}
      elevation={0}
    >
      <Grid container spacing={2}>
        <Forecast details={details} forecastFromNow={forecastFromNow} />

        <Wind details={details} />
        <FeelsLike feelsLikeTemp={feelsLikeTemp} currentTemp={currentTemp} />
        <Humidity details={details} />
        <UV details={details} />
        <Precipitation precipitation={details?.current.precip_mm} />
        <Visibility visibility={details?.current.vis_km} />
      </Grid>
    </Paper>
  );
}

function FeelsLike({
  feelsLikeTemp,
  currentTemp,
}: {
  feelsLikeTemp: number;
  currentTemp: number;
}) {
  return (
    <WeatherDetailCard title="Feels Like">
      <Typography variant="h4" sx={{ fontWeight: "500" }}>
        {feelsLikeTemp}°
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary" }}>
        It feels{" "}
        {currentTemp > feelsLikeTemp
          ? "cooler than"
          : currentTemp < feelsLikeTemp
          ? "warmer than"
          : "almost same as"}{" "}
        the actual temperature
      </Typography>
    </WeatherDetailCard>
  );
}

function Precipitation({ precipitation }: { precipitation: number }) {
  return (
    <WeatherDetailCard title="Precipitation">
      <Typography variant="h4" sx={{ fontWeight: "500" }}>
        {precipitation}mm
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary" }}>
        Rainfall {precipitation > 0 ? "expected" : "not expected"}
      </Typography>
    </WeatherDetailCard>
  );
}

function Visibility({ visibility }: { visibility: number }) {
  return (
    <WeatherDetailCard title="Visibility">
      <Typography variant="h4" sx={{ fontWeight: "500" }}>
        {visibility} KM
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary" }}>
        {visibility < 5 ? "Low visibility, be careful" : "Clear vision"}
      </Typography>
    </WeatherDetailCard>
  );
}

export default WeatherDetails;
