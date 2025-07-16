import { useState } from "react";

import type WeatherType from "../../../types/WeatherType";

import { Typography } from "@mui/material";
import WeatherDetailCard from "../../general/WeatherDetailCard";
import FeelsLikeDrawer from "./FeelsLikeDrawer";

function FeelsLike({ details }: { details: WeatherType }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const currentTemp = details?.current.temp_c;
  const feelsLikeTemp = details?.current.feelslike_c;

  return (
    <WeatherDetailCard title="Feels Like" onClick={handleDrawerToggle}>
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
      <FeelsLikeDrawer
        details={details}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </WeatherDetailCard>
  );
}

export default FeelsLike;
