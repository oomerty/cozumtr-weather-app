import { useState } from "react";

import type WeatherType from "../../../types/WeatherType";

import { Box, Grid, Typography } from "@mui/material";
import WeatherDetailCard from "../../general/WeatherDetailCard";
import UVDrawer from "./UVDrawer";

function UV({ details }: { details: WeatherType }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const uv = details?.current.uv;

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <WeatherDetailCard title="UV" onClick={handleDrawerToggle}>
      <Typography variant="h4" sx={{ fontWeight: "500" }}>
        {uv}
      </Typography>
      <UVBar uv={uv} />
      <Typography variant="body1" sx={{ color: "text.secondary" }}>
        {uv <= 2
          ? "No protection needed"
          : uv <= 7
          ? "Put on protection and wear protective clothing"
          : "Put on extra protection and don't stay outside much"}
      </Typography>
      <UVDrawer
        details={details}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </WeatherDetailCard>
  );
}

function UVBar({ uv }: { uv: number }) {
  const uvLevels = [
    { level: 0, color: "#2aa05fff" },
    { level: 1, color: "#3CB371" },
    { level: 2, color: "#66C265" },
    { level: 3, color: "#A0CB4F" },
    { level: 4, color: "#D4D944" },
    { level: 5, color: "#FFD700" },
    { level: 6, color: "#FFB937" },
    { level: 7, color: "#FF943A" },
    { level: 8, color: "#FF6241" },
    { level: 9, color: "#C13778" },
    { level: 10, color: "#800080" },
    { level: 11, color: "#530053ff" },
  ];

  return (
    <Grid
      columns={10}
      spacing={0}
      container
      sx={{
        width: "100%",
        height: "8px",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      {Object.values(uvLevels).map((el, index) => (
        <Grid size={1} key={index}>
          <Box
            key={index}
            sx={{
              backgroundColor: el.color,
              display: "inline-block",
              width: "100%",
              height: "100%",
              opacity: Number(uv?.toFixed(0)) === el.level ? "100%" : "20%",
            }}
          ></Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default UV;
