import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { SWRConfig } from "swr";
import { swrGlobalConfig } from "./lib/swrConfig";
import Container from "@mui/material/Container";

import Weather from "./pages/Weather";
import { ThemeProvider, useTheme } from "./contexts/useTheme";
import { createTheme, CssBaseline } from "@mui/material";

function App() {
  return (
    <SWRConfig value={swrGlobalConfig}>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Weather />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </SWRConfig>
  );
}

function MainLayout() {
  const { mode } = useTheme();

  const theme = createTheme({
    palette: {
      mode: mode === "day" ? "light" : "dark",
      ...(mode === "day"
        ? { background: { default: "#e3f2fd" } }
        : { background: { default: "#0d1117" } }),
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
