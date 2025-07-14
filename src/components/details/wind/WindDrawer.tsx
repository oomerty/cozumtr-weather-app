import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

import type WeatherType from "../../../types/WeatherType";

import { Box, Typography } from "@mui/material";
import WeatherDetailDrawer from "../../general/WeatherDetailDrawer";
import ChartTooltip from "../../general/ChartTooltip";

interface WindDrawerProps {
  details: WeatherType;
  open: boolean;
  onClose: () => void;
}

function WindDrawer({ details, open, onClose }: WindDrawerProps) {
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
    <WeatherDetailDrawer
      open={open}
      onClose={onClose}
      title="Wind"
      desc="Wind..."
    >
      <Box>
        <Box sx={{ textAlign: "center", paddingBottom: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: "500" }}>
            {details?.current.wind_kph} km/h
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: "400" }}>
            (as of {details?.location.localtime.split(" ").at(1)})
          </Typography>
        </Box>

        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              bottom: 5,
            }}
          >
            {gradient}
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip
              content={(props) => CustomTooltip(props as CustomTooltipProps)}
            />
            <XAxis dataKey="time" stroke="rgba(255,255,255,0.6)" />
            <Area
              type="monotone"
              dataKey="gust"
              stroke="#009fd8ff"
              fill="transparent"
            />
            <Area
              type="monotone"
              dataKey="windSpeed"
              stroke="url(#gradient)"
              fill="url(#gradient)"
              activeDot={{
                r: 8,
                fill: "#262626ff",
                stroke: "#262626ff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </WeatherDetailDrawer>
  );
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  const isVisible = active && payload && payload.length > 0;
  return (
    <ChartTooltip
      isVisible={!!isVisible}
      label={label || ""}
      data={`${payload?.[0]?.value} km/h | Gusts: ${payload?.[1]?.value} km/h`}
    />
  );
};

const gradient = (
  <defs>
    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#009fd8ff" stopOpacity={0.8} />
      <stop offset="100%" stopColor="#00f078ff" stopOpacity={0.8} />
    </linearGradient>
  </defs>
);

export default WindDrawer;
