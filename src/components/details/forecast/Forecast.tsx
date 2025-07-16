import type WeatherType from "../../../types/WeatherType";

import { Box, Grid, Typography } from "@mui/material";
import WeatherDetailCard from "../../general/WeatherDetailCard";
import ForecastDrawer from "./ForecastDrawer";
import { useState } from "react";

function Forecast({
  details,
  forecastFromNow,
}: {
  details: WeatherType;
  forecastFromNow: object;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <WeatherDetailCard gridSize={12} onClick={handleDrawerToggle}>
      <Grid columns={{ xs: 12, md: 6 }} container spacing={1}>
        {forecastFromNow &&
          Object.values(forecastFromNow)
            .slice(0, 6)
            .map((el, index) => {
              return (
                <Grid
                  key={index}
                  size={{ xs: 12, md: 1 }}
                  textAlign="center"
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "row", md: "column" },
                    justifyContent: { xs: "space-between", md: "start" },
                    alignItems: "center",
                    gap: { xs: 2, md: 1 },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "row", md: "column" },
                      alignItems: "center",
                      gap: { xs: 2, md: 0.5 },
                    }}
                  >
                    <Typography variant="subtitle2">
                      {index === 0 ? "Now" : el?.time.split(" ").at(1)}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: "600" }}>
                      {el?.temp_c}°
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      textAlign: { xs: "end", md: "center" },
                    }}
                  >
                    {el?.condition.text}
                  </Typography>
                </Grid>
              );
            })}
      </Grid>
      <ForecastDrawer
        details={details}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </WeatherDetailCard>
  );
}

export default Forecast;
