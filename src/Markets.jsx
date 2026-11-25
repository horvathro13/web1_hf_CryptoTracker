export default function Markets({ coins, loading, favorites, dispatch }) {
    if (loading) {
        return <p>Piaci adatok betöltése..</p>;
    }
    if (!Array.isArray(coins)) {
        return <p>Nem sikerült betölteni az adatokat. Próbáld újra később! </p>
    }
    return (
        <div>
            <h1>Piacok</h1>
            <table>
                <thead>
                    <tr>
                        <th>Market Prices</th>
                        <th>Árfolyam (USD)</th>
                        <th>24ó változás</th>
                        <th>Művelet</th>
                    </tr>
                </thead>
                <tbody>
                    {coins.map((coin) => {
                        const isFav = favorites.some((fav) => fav.id === coin.id);

                        return (
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
                                <td>{coin.price_change_percentage_24h?.toFixed(2)}%</td>
                                <td>
                                    <button
                                        disabled={isFav}
                                        onClick={() =>
                                            dispatch({ type: "ADD_FAVORITE", payload: coin })
                                        }
                                    >
                                        {isFav ? "Kedvencekben" : "Add to fav"}
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}