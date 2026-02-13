import * as React from "react";
import { useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light");
    root.classList.add("dark");
    root.style.colorScheme = "dark"; // fixes inputs/scrollbars on other devices
  }, []);

  return <>{children}</>;
}
