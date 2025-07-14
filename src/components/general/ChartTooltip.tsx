import { Box, Paper, Typography } from "@mui/material";

interface ChartTooltipProps {
  isVisible: boolean;
  label: string;
  data: string;
}

function ChartTooltip({ isVisible, data, label }: ChartTooltipProps) {
  return (
    <div
      className="custom-tooltip"
      style={{ visibility: isVisible ? "visible" : "hidden" }}
    >
      {isVisible && (
        <Box>
          <Paper
            sx={{ display: "flex", flexDirection: "row", gap: 2, padding: 1 }}
          >
            <Typography variant="subtitle2">{label}</Typography>
            <Typography variant="body1">{data}</Typography>
          </Paper>
        </Box>
      )}
    </div>
  );
}

export default ChartTooltip;
