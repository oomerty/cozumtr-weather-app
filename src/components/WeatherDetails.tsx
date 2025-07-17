import type WeatherType from "../types/WeatherType";

import { Grid, Paper, Typography } from "@mui/material";

import WeatherDetailCard from "./general/WeatherDetailCard";
import UV from "./details/uv/UV";
import Forecast from "./details/forecast/Forecast";
import Humidity from "./details/humidity/Humidity";
import Wind from "./details/wind/Wind";
import FeelsLike from "./details/feelsLike/FeelsLike";

interface WeatherDetailsProps {
  details: WeatherType;
  heroOffScreen: boolean;
}

function WeatherDetails({ details, heroOffScreen }: WeatherDetailsProps) {
  const timeEpoch = Date.parse(details?.location.localtime);
  const time = new Date(timeEpoch);

  const forecastArr = details?.forecast.forecastday[0].hour;
  const forecastFromNow = forecastArr?.slice(time.getHours());

  if (forecastFromNow?.length < 5) {
    const forecastArrTomorrow = details?.forecast.forecastday[1].hour;
    Object.values(forecastArrTomorrow).forEach((element) => {
      forecastFromNow.push(element);
    });
  }

  return (
    <Paper
      sx={{
        flexDirection: "column",
        height: "max-content",
        overflow: "auto",
        p: { xs: 2, md: 3 },
        marginTop: { xs: 0, md: 4 },
        marginX: { xs: 0, md: 12 },
        boxSizing: "border-box",
        transition: "700ms",

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
          marginTop: "32px",
          marginBottom: "16px",
        },

        ...(heroOffScreen && {
          position: "sticky",
          top: "72px",
          height: { xs: "max-content", md: "calc(100vh - 96px)" },
          marginTop: 0,
          marginX: 0,
          overflowY: { xs: "auto", md: "scroll" },
        }),
      }}
      elevation={0}
    >
      <Grid container spacing={2}>
        <Forecast details={details} forecastFromNow={forecastFromNow} />

        <Wind details={details} />
        <FeelsLike details={details} />
        <Humidity details={details} />
        <UV details={details} />
        <Precipitation precipitation={details?.current.precip_mm} />
        <Visibility visibility={details?.current.vis_km} />
      </Grid>
    </Paper>
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
