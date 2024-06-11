import React, { createContext, useState, useContext } from 'react';
import { lightTheme, darkTheme } from '../components/themes';

const defaultContextData = {
    theme: 'light',
    toggleTheme: () => {},
    themeMode: darkTheme,
  };

const ThemeContext = createContext(defaultContextData);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
