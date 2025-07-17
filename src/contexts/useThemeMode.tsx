/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

type ThemeMode = "day" | "night";

interface ThemeModeContextType {
  mode: ThemeMode;
  forceMode: boolean;
  setMode: (mode: ThemeMode) => void;
  setForceMode: (force: boolean) => void;
}

const ThemeContext = createContext<ThemeModeContextType | undefined>(undefined);

export const ThemeModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mode, setMode] = useState<ThemeMode>("day");
  const [forceMode, setForceMode] = useState(false);

  return (
    <ThemeContext.Provider value={{ mode, forceMode, setMode, setForceMode }}>
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
