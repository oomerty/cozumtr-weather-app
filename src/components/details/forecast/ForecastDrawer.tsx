import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type WeatherType from "../../../types/WeatherType";

import { Box, Typography } from "@mui/material";
import WeatherDetailDrawer from "../../general/WeatherDetailDrawer";
import ChartTooltip from "../../general/ChartTooltip";

interface HumidityDrawerProps {
  details: WeatherType;
  open: boolean;
  onClose: () => void;
}

function HumidityDrawer({ details, open, onClose }: HumidityDrawerProps) {
  const data: {
    temp: number;
    conditionIcon: string;
    time: number;
  }[] = [];

  const currTime = Number(
    details?.location.localtime.split(" ").at(1)?.split(":").at(0)
  );
  const dailyForecast = details?.forecast.forecastday.at(0)?.hour;
  dailyForecast?.forEach((hourlyForecast) => {
    data.push({
      temp: hourlyForecast.temp_c,
      conditionIcon: hourlyForecast.condition.icon,
      time: Number(hourlyForecast.time.split(" ").at(1)?.split(":").at(0)) || 0,
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
            <CartesianGrid strokeOpacity="0.32" strokeDasharray="3 3" />
            <Tooltip
              content={(props) => CustomTooltip(props as CustomTooltipProps)}
            />
            <YAxis dataKey="temp" stroke="rgba(255,255,255,0.6)" />
            <XAxis dataKey="time" stroke="rgba(255,255,255,0.6)" />
            <ReferenceLine x={currTime} stroke="#009fd8ff" strokeWidth={2} />
            <Area
              type="monotone"
              dataKey="temp"
              stroke="url(#gradient)"
              strokeWidth={3}
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

        <Typography variant="body1">
          Today, the highest temperature is{" "}
          {details?.forecast.forecastday.at(0)?.day.maxtemp_c}° and lowest
          temperature is {details?.forecast.forecastday.at(0)?.day.mintemp_c}°.
          Average temperature is{" "}
          {details?.forecast.forecastday.at(0)?.day.avgtemp_c}°.
        </Typography>
      </Box>
    </WeatherDetailDrawer>
  );
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: { conditionIcon: string };
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  const isVisible = active && payload && payload.length > 0;
  return (
    <ChartTooltip
      isVisible={!!isVisible}
      label={label ? `${label}:00` : ""}
      data={
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
          }}
        >
          <img
            src={`${payload?.[0]?.payload.conditionIcon}`}
            style={{ width: "32px", aspectRatio: "1/1" }}
          />
          <Typography>{`${payload?.[0]?.value}°`}</Typography>
        </Box>
      }
    />
  );
};

const gradient = (
  <defs>
    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#d85a00ff" stopOpacity={0.8} />
      <stop offset="33%" stopColor="#d8a600ff" stopOpacity={0.8} />
      <stop offset="66%" stopColor="#009fd8ff" stopOpacity={0.8} />
      <stop offset="100%" stopColor="#0032d8ff" stopOpacity={0.8} />
    </linearGradient>
  </defs>
);

export default HumidityDrawer;
