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
          p: 4,
          gap: 0.5,
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
