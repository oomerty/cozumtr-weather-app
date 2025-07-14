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

interface HumidityDrawerProps {
  details: WeatherType;
  open: boolean;
  onClose: () => void;
}

function HumidityDrawer({ details, open, onClose }: HumidityDrawerProps) {
  const data: { humidity: number; time: string }[] = [];

  const dailyForecast = details?.forecast.forecastday.at(0)?.hour;
  dailyForecast?.forEach((hourlyForecast) => {
    data.push({
      humidity: hourlyForecast.humidity,
      time: hourlyForecast.time.split(" ").at(1) || "",
    });
  });

  return (
    <WeatherDetailDrawer
      open={open}
      onClose={onClose}
      title="Humidity"
      desc="Humidity refers to the amount of water vapor (invisible water gas) present in the air. Humidity tells how “moist” the air feels, how it affects comfort, health, and weather."
    >
      <Box>
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
              dataKey="humidity"
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

        <Typography>
          Today, the average humidity is{" "}
          {details?.forecast.forecastday.at(0)?.day.avghumidity}%.
        </Typography>
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
      data={`${payload?.[0]?.value}%`}
    />
  );
};

const gradient = (
  <defs>
    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#9400d8ff" stopOpacity={0.8} />
      <stop offset="50%" stopColor="#009fd8ff" stopOpacity={0.8} />
      <stop offset="100%" stopColor="#00f078ff" stopOpacity={0.8} />
    </linearGradient>
  </defs>
);

export default HumidityDrawer;
