import { Box, Grid, Typography } from "@mui/material";
import WeatherDetailCard from "./WeatherDetailCard";

function Forecast({ forecastFromNow }: { forecastFromNow: object }) {
  return (
    <WeatherDetailCard gridSize={12}>
      <Grid columns={{ xs: 12, md: 5 }} container spacing={1}>
        {forecastFromNow &&
          Object.values(forecastFromNow)
            .slice(0, 5)
            .map((el, index) => {
              return (
                <Grid
                  key={index}
                  size={{ xs: 12, md: 1 }}
                  textAlign="center"
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "row", md: "column" },
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: { xs: 2, md: 0.5 },
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
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    {el?.condition.text}
                  </Typography>
                </Grid>
              );
            })}
      </Grid>
    </WeatherDetailCard>
  );
}

export default Forecast;
