import { Box, Card, Grid, Typography } from "@mui/material";
// import { AccessAlarm } from "@mui/icons-material";

interface WeatherDetailCardProps {
  children: React.ReactNode;
  title?: string;
  gridSize?: number;
}

function WeatherDetailCard({
  title,
  children,
  gridSize,
}: WeatherDetailCardProps) {
  return (
    <Grid width="100%" size={{ sm: 12, md: gridSize || 6 }}>
      <Card
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          p: { xs: 2, md: 4 },
          borderRadius: "16px",
          gap: 0.5,
          height: "100%",
          backgroundColor: "transparent",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "none",
        }}
      >
        <Box>
          {/* <AccessAlarm /> */}
          {title && (
            <Typography
              sx={{ textTransform: "uppercase", color: "GrayText" }}
              variant="subtitle2"
            >
              {title}
            </Typography>
          )}
        </Box>
        {children}
      </Card>
    </Grid>
  );
}

export default WeatherDetailCard;
