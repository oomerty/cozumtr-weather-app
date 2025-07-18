import { useState } from "react";

import { Typography } from "@mui/material";
import WeatherDetailCard from "../../general/WeatherDetailCard";
import HumidityDrawer from "./HumidityDrawer";
import type WeatherType from "../../../types/WeatherType";

function Humidity({ details }: { details: WeatherType }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <WeatherDetailCard title="Humidity" onClick={handleDrawerToggle}>
      <Typography variant="h4" sx={{ fontWeight: "500" }}>
        {details?.current.humidity}%
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary" }}>
        The dew point is {details?.current.dewpoint_c}° right now
      </Typography>
      <HumidityDrawer
        details={details}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </WeatherDetailCard>
  );
}

export default Humidity;
