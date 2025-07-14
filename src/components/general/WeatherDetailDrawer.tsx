import { Box, Drawer, Typography } from "@mui/material";

interface WeatherDetailDrawerProps {
  children: React.ReactNode;
  title?: string;
  desc?: string;
  open: boolean;
  onClose: () => void;
}

function WeatherDetailDrawer({
  children,
  title,
  desc,
  open,
  onClose,
}: WeatherDetailDrawerProps) {
  return (
    <Drawer anchor="bottom" open={open} onClose={onClose}>
      {title && (
        <Typography
          sx={{
            textTransform: "uppercase",
            color: { light: "#fff", dark: "#ccc" },
            paddingBottom: 2,
          }}
          variant="subtitle2"
        >
          {title}
        </Typography>
      )}
      {children}
      <Box sx={{ paddingTop: 1 }}>
        <Typography variant="body1">{desc}</Typography>
      </Box>
    </Drawer>
  );
}

export default WeatherDetailDrawer;
