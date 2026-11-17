import { useState, createContext } from "react";
import Navbar from "./Navbar";
import Markets from "./Markets";
import Favorites from "./Favorites";
import "./App.css";

export const ThemeContext = createContext();

export default function App() {
  const [theme, setTheme] = useState("light");
  const [currentView, setCurrentView] = useState("markets");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };


return (
  <ThemeContext.Provider value = {{ theme, toggleTheme }}>
    <div className={`app-container ${theme}`}>
      <Navbar currentView = {currentView} setCurrentView = {setCurrentView} />

      <main className= "main-content">
        {currentView === "markets" ? <Markets /> : <Favorites />}
      </main>
    </div>
  </ThemeContext.Provider>
)
};
