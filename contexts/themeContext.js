"use client";

import React, { createContext, useContext, useState } from "react";

// Create the theme context
export const ThemeContext = createContext();

// Create the theme provider component
export default function ThemeProvider({ children }) {
  // Define the state for theme
  const [theme, setTheme] = useState("light");

  // Return the theme context provider with the state and setter
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
