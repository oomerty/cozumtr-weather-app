import { useState } from "react";
import type WeatherType from "../../../types/WeatherType";

import { Typography } from "@mui/material";
import WeatherDetailCard from "../../general/WeatherDetailCard";
import WindDrawer from "./WindDrawer";

function Wind({ details }: { details: WeatherType }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <WeatherDetailCard title="Wind" onClick={handleDrawerToggle}>
      <Typography variant="h4" sx={{ fontWeight: "500" }}>
        {details?.current.wind_kph} km/h
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary" }}>
        Direction {details?.current.wind_degree}° {details?.current.wind_dir}
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary" }}>
        Wind gusts {details?.current.gust_kph} km/h
      </Typography>
      <WindDrawer
        details={details}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </WeatherDetailCard>
  );
}

export default Wind;
