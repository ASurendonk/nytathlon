import { CssBaseline, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./router/router.tsx";
import { GameProvider } from "./context/gameContext.tsx";
import { darkTheme, lightTheme } from "./theme/theme.ts";
import { useThemeSelection } from "./context/themeContext.tsx";
import { useMemo } from "react";
import ThemeType from "./enums/themeType.enum.ts";

function App() {
  const { theme } = useThemeSelection();
  const selectedTheme = useMemo(() => (
    theme === ThemeType.Light ? lightTheme : darkTheme
  ), [theme]);

  return (
    <ThemeProvider theme={selectedTheme}>
      <CssBaseline />
      <GameProvider>
        <Router />
      </GameProvider>
      <ToastContainer position="bottom-right" />
    </ThemeProvider>
  )
}

export default App
