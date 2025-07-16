import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { SWRConfig } from "swr";
import { swrGlobalConfig } from "./lib/swrConfig";
import Container from "@mui/material/Container";

import Weather from "./pages/Weather";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { ThemeModeProvider, useThemeMode } from "./contexts/useThemeMode";
import lightTheme from "./themes/lightTheme";
import darkTheme from "./themes/darkTheme";

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
    ...(mode === "day" ? lightTheme : darkTheme),
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
      <Container
        maxWidth={false}
        sx={{
          margin: 0,
          padding: 0,
          width: "100%",
          "&::-webkit-scrollbar": {
            width: "8px",
            color: "red",
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            borderRadius: "32px",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.5)",
            },
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            borderRadius: "32px",
            marginY: "32px",
          },
        }}
      >
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
