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
      <Container maxWidth={false} sx={{ margin: 0, padding: 0, width: "100%" }}>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
