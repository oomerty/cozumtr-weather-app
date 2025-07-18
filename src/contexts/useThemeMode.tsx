/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

type ThemeMode = "day" | "night";

interface ThemeModeContextType {
  mode: ThemeMode;
  forceMode: boolean;
  setMode: (mode: ThemeMode) => void;
  setForceMode: (force: boolean) => void;
  toggleTheme: () => void;
}

const modeStorage = "weatherapp_mode";
const forceModeStorage = "weatherapp_forcemode";
const ThemeContext = createContext<ThemeModeContextType | undefined>(undefined);

export const ThemeModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem(modeStorage);
    return (savedMode as ThemeMode) || "day";
  });

  const [forceMode, setForceModeState] = useState<boolean>(() => {
    const savedForceMode = localStorage.getItem(forceModeStorage);
    return savedForceMode ? JSON.parse(savedForceMode) : false;
  });

  useEffect(() => {
    localStorage.setItem(modeStorage, mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem(forceModeStorage, JSON.stringify(forceMode));
  }, [forceMode]);

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
  };

  const setForceMode = (force: boolean) => {
    setForceModeState(force);
  };

  const toggleTheme = () => {
    setModeState((prevMode) => {
      const newMode = prevMode === "day" ? "night" : "day";
      return newMode;
    });
    setForceModeState(true);
  };

  return (
    <ThemeContext.Provider
      value={{ mode, forceMode, setMode, setForceMode, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useThemeMode must be used within ThemeModeProvider");
  return context;
};
