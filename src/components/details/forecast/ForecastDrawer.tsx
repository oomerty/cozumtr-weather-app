import type WeatherType from "../../../types/WeatherType";

import { Box, Typography } from "@mui/material";
import WeatherDetailDrawer from "../../general/WeatherDetailDrawer";

interface ForecastDrawerProps {
  details: WeatherType;
  open: boolean;
  onClose: () => void;
}

function ForecastDrawer({ details, open, onClose }: ForecastDrawerProps) {
  const data: { windSpeed: number; gust: number; time: string }[] = [];

  const dailyForecast = details?.forecast.forecastday.at(0)?.hour;
  dailyForecast?.forEach((hourlyForecast) => {
    data.push({
      windSpeed: hourlyForecast.wind_kph,
      gust: hourlyForecast.gust_kph,
      time: hourlyForecast.time.split(" ").at(1) || "",
    });
  });

  return (
    <WeatherDetailDrawer open={open} onClose={onClose} title="Forecast">
      <Box>
        <Box sx={{ textAlign: "center", paddingBottom: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: "500" }}>
            {details?.current.temp_c}°
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: "400" }}>
            (as of {details?.location.localtime.split(" ").at(1)})
          </Typography>
        </Box>
      </Box>
    </WeatherDetailDrawer>
  );
}

export default ForecastDrawer;
