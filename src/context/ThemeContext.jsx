import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Load from localStorage or fallback
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [fontSize, setFontSize] = useState(() => {
    return parseInt(localStorage.getItem("fontSize")) || 32;
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("fontSize", fontSize);
  }, [fontSize]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  const increaseFont = () => setFontSize((prev) => prev + 4);
  const decreaseFont = () => setFontSize((prev) => Math.max(16, prev - 4));
  const resetFont = () => setFontSize(32);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        fontSize,
        toggleTheme,
        increaseFont,
        decreaseFont,
        resetFont,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
