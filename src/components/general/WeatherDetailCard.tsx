import { Box, Card, Grid, Typography } from "@mui/material";
// import { AccessAlarm } from "@mui/icons-material";

interface WeatherDetailCardProps {
  children: React.ReactNode;
  title?: string;
  gridSize?: number;
  onClick?: () => void;
  clickable?: boolean;
}

function WeatherDetailCard({
  title,
  children,
  gridSize,
  onClick,
  clickable = false,
}: WeatherDetailCardProps) {
  return (
    <Grid width="100%" size={{ sm: 12, md: gridSize || 6 }}>
      <Card
        onClick={onClick}
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          p: { xs: 2, md: 3 },
          borderRadius: { xs: "24px", md: "16px" },
          gap: 0.5,
          height: "100%",
          backgroundColor: "transparent",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "none",

          cursor: onClick || clickable ? "pointer" : "default",
          transition: "all 0.3s ease",

          ...(onClick || clickable
            ? {
                "&:hover": {
                  backdropFilter: "blur(15px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                },
              }
            : {}),
        }}
      >
        <Box>
          {/* <AccessAlarm /> */}
          {title && (
            <Typography
              sx={{
                textTransform: "uppercase",
                color: { light: "#fff", dark: "#ccc" },
              }}
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
