export default function Favorites({ favorites, dispatch}) {
    return (
        <div>
            <h1>Kedvencek</h1>

            {favorites.length === 0 ? (
                <p>Még nincsenek kedvenc kriptovalutáid.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Érme</th>
                            <th>Árfolyam (USD)</th>
                            <th>24ó változás</th>
                            <th>Művelet</th>
                        </tr>
                    </thead>
                    <tbody>
                        {favorites.map((coin) => (
                            <tr key={coin.id}>
                                <td>
                                    <img
                                        src={coin.image}
                                        alt={coin.name}
                                        style={{ verticalAlign: "middle", marginRight: "8px" }}
                                    />
                                    <strong>{coin.name}</strong> ({coin.symbol.toUpperCase()})
                                </td>
                                <td>${coin.current_price.toLocaleString()}</td>
                                <td>{coin.price_change_percentage_24h.toFixed(2)}%</td>
                                <td>
                                    <button onClick={() => dispatch({ type: 'REMOVE_FAVORITE', payload: coin.id })}
                                        >
                                            Törlés
                                        </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}