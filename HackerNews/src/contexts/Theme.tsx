import React, { useState } from "react";

const ThemeContext = React.createContext({
  dark: false,
  toggleTheme: null
});

const ThemeProvider = (props: any) => {
  const [dark, toggleTheme] = useState(false);

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
export { ThemeContext, ThemeProvider };
