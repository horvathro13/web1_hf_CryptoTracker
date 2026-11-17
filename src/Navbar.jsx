import { useContext } from "react";
import { ThemeContext } from "./App";

export default function Navbar({ currentView, setCurrentView }) {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return ( 
        <header className="navbar">
            <div className="nav-left">
                <h1>CryptoTracker</h1>
                <nav className="nav-links">
                    <button
                        className={currentView === 'markets' ? 'active' : ''}
                        onClick={() => setCurrentView('markets')}
                    >
                        Piacok
                    </button>
                    <button
                        className={currentView === 'favorites' ? 'active' : ''}
                        onClick={() => setCurrentView('favorites')}
                    >
                        Kedvencek
                    </button>
                </nav>
            </div>
        
            <button onClick={toggleTheme}>
                {theme === 'light' ? 'Sötét mód' : 'Világos mód'}
            </button>
        </header>
    );
}