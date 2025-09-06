import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  const [fontSize, setFontSize] = useState(() => {
    return parseInt(localStorage.getItem("fontSize")) || 32;
  });

  const [textColor, setTextColor] = useState(() => {
    return localStorage.getItem("textColor") || "default";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("fontSize", fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem("textColor", textColor);
  }, [textColor]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const setThemeDark = () => 
    setTheme("dark")

  const setThemeLight = () => 
    setTheme("light")

  const increaseFont = () => setFontSize((prev) => prev + 4);
  const decreaseFont = () => setFontSize((prev) => Math.max(16, prev - 4));
  const resetFont = () => setFontSize(32);

  const setTextColorYellow = () => setTextColor("yellow");
  const setTextColorGreen = () => setTextColor("green");
  const resetTextColor = () => setTextColor("default");

  return (
    <ThemeContext.Provider
      value={{
        theme,
        fontSize,
        textColor,
        toggleTheme,
        increaseFont,
        decreaseFont,
        resetFont,
        setTextColorYellow,
        setTextColorGreen,
        resetTextColor,
        setThemeDark,
        setThemeLight
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
