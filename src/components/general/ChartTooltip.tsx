import { Box, Paper, Typography } from "@mui/material";

interface ChartTooltipProps {
  isVisible: boolean;
  label: string;
  data: string | object;
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
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
              padding: 1,
              paddingX: 2,
            }}
          >
            <Typography variant="subtitle2">{label}</Typography>
            {typeof data === "string" && (
              <Typography variant="body1">{data}</Typography>
            )}
            {typeof data === "object" && <>{data}</>}
          </Paper>
        </Box>
      )}
    </div>
  );
}

export default ChartTooltip;
