import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { SWRConfig } from "swr";
import { swrGlobalConfig } from "./lib/swrConfig";
import Container from "@mui/material/Container";

import Weather from "./pages/Weather";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { ThemeModeProvider, useThemeMode } from "./contexts/useThemeMode";

function App() {
  return (
    <SWRConfig value={swrGlobalConfig}>
      <ThemeModeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Weather />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeModeProvider>
    </SWRConfig>
  );
}

function MainLayout() {
  const { mode } = useThemeMode();

  const theme = createTheme({
    components: {
      // PAPER
      MuiPaper: {
        styleOverrides: {},
      },
      MuiChip: {
        styleOverrides: {},
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "24px",
            backgroundColor: "transparent",
            backdropFilter: "blur(24px)",
            fillOpacity: "50%",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "none",
            backgroundImage:
              "linear-gradient(to right bottom, rgba(25, 75, 255, 0.7), rgba(43, 89, 255, 0.7))",
            "&:hover": {
              backgroundColor: "rgba(5, 58, 252, 0.7)",
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                color: {
                  light: "rgba(0, 0, 0, 0.6)",
                  dark: "rgba(255, 255, 255, 0.6)",
                },
                borderRadius: "24px",
                backgroundColor: "transparent",
                backdropFilter: "blur(24px)",
                fillOpacity: "50%",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "none",
                backgroundImage:
                  "linear-gradient(to right bottom, rgba(255, 255, 255, 0.1), rgba(239, 239, 239, 0.1))",
              },
              "&:hover fieldset": {
                borderColor: "rgba(255, 255, 255, 0.5)",
                borderRadius: "24px",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgba(255, 255, 255, 0.8)",
                borderRadius: "24px",
              },
            },
          },
        },
      },
    },
    // PALETTE
    palette: {
      mode: mode === "day" ? "light" : "dark",
    },
    typography: {
      fontFamily: "`TikTok Sans`",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
