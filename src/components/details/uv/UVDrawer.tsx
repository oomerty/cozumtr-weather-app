import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

import type WeatherType from "../../../types/WeatherType";

import { Box, Typography } from "@mui/material";
import WeatherDetailDrawer from "../../general/WeatherDetailDrawer";
import ChartTooltip from "../../general/ChartTooltip";

interface UVDrawerProps {
  details: WeatherType;
  open: boolean;
  onClose: () => void;
}

function UVDrawer({ details, open, onClose }: UVDrawerProps) {
  const data: { uv: number; time: number }[] = [];

  const currTime = Number(
    details?.location.localtime.split(" ").at(1)?.split(":").at(0)
  );
  const uvDaily = details?.forecast.forecastday.at(0)?.hour;
  uvDaily?.forEach((uvHourly) => {
    data.push({
      uv: uvHourly.uv,
      time: Number(uvHourly.time.split(" ").at(1)?.split(":").at(0)) || 0,
    });
  });

  return (
    <WeatherDetailDrawer
      open={open}
      onClose={onClose}
      title="UV Index"
      desc={`The UV Index is a standardized, open-ended scale (typically from 0
            to 11+) that quantifies the strength of sunburn-producing
            ultraviolet (UV) radiation reaching the Earth’s surface at a
            particular time and place.\n\nIt’s a linear system, meaning a UV Index of 10 is roughly twice as harmful as a 5—so higher numbers mean sunburn can happen much faster . When the index reaches 3 or above, protective measures like sunscreen, shade, and hats are advised; at values of 11+, damage to the skin and eyes can occur within minutes, making full protection essential.`}
    >
      <Box>
        <Box sx={{ textAlign: "center", paddingBottom: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: "500" }}>
            {details?.current.uv}
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
            <XAxis dataKey="time" stroke="rgba(255,255,255,0.6)" />
            <ReferenceLine x={currTime} stroke="#009fd8ff" strokeWidth={2} />
            <Area
              type="monotone"
              dataKey="uv"
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
      label={label ? `${label}:00` : ""}
      data={`${payload?.[0]?.value} `}
    />
  );
};

const gradient = (
  <defs>
    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#530053" stopOpacity={0.8} />
      <stop offset="20%" stopColor="#C13778" stopOpacity={0.8} />
      <stop offset="40%" stopColor="#FF943A" stopOpacity={0.8} />
      <stop offset="60%" stopColor="#D4D944" stopOpacity={0.8} />
      <stop offset="80%" stopColor="#66C265" stopOpacity={0.8} />
      <stop offset="100%" stopColor="#2aa05f" stopOpacity={0.8} />
    </linearGradient>
  </defs>
);

export default UVDrawer;
