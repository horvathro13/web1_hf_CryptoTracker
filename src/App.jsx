import { useState, useEffect, createContext } from "react";
import Navbar from "./Navbar";
import Markets from "./Markets";
import Favorites from "./Favorites";
import "./App.css";

export const ThemeContext = createContext();

export default function App() {
  const [theme, setTheme] = useState("light");
  const [currentView, setCurrentView] = useState("markets");

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1")
      .then((res) => res.json())
      .then((data) => {
        setCoins(data);
        setLoading(false);
      })
    .catch((err) => {
      console.error("Hiba az API hívásakor:", err);
      setLoading(false);
    });
  }, []);

return (
  <ThemeContext.Provider value = {{ theme, toggleTheme }}>
    <div className={`app-container ${theme}`}>
      <Navbar currentView = {currentView} setCurrentView = {setCurrentView} />

      <main className= "main-content">
        {currentView === "markets" ? (<Markets coins={coins} loading={loading} />)  : (<Favorites />)}
      </main>
    </div>
  </ThemeContext.Provider>
)
};
