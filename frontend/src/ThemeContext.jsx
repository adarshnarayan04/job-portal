import React, { createContext, useState } from "react";

// Create the context object
export const ThemeContext = createContext();

// Create the provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};