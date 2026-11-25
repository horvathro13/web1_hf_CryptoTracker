import { useState, useEffect, useReducer, createContext } from "react";
import Navbar from "./Navbar";
import Markets from "./Markets";
import Favorites from "./Favorites";
import "./App.css";

export const ThemeContext = createContext();

function favoritesReducer(state, action) {
  switch (action.type) {
    case "ADD_FAVORITE":
      if (state.some((item) => item.id === action.payload.id)) {
        return state;
      }
      return [...state, action.payload];

    case "REMOVE_FAVORITE":
      return state.filter((item) => item.id !== action.payload);
    
      default:
        return state;
  } 
}

export default function App() {
  const [theme, setTheme] = useState("light");
  const [currentView, setCurrentView] = useState("markets");

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const [favorites, dispatch] = useReducer(favoritesReducer, [], () => {
    const saved = localStorage.getItem("crypto_favorites");
    return saved ? JSON.parse(saved) : [];
  })

  useEffect(() => {
    localStorage.setItem("crypto_favorites", JSON.stringify(favorites));
  }, [favorites]);

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
        {currentView === "markets" ? (
          <Markets
            coins={coins}
            loading={loading}
            favorites={favorites}
            dispatch={dispatch}
          />
          ) : (
          <Favorites favorites={favorites} dispatch={dispatch} />
          )}
      </main>
    </div>
  </ThemeContext.Provider>
)
};
