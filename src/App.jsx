import React, { useEffect, useState } from 'react';
import CoinCard from "./components/CoinCard.jsx";
import LimitSelector from "./components/LimitSelector.jsx";
import FilterInput from "./components/FilterInput.jsx";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [limit, setLimit] = useState(10);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const getCoins = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch(
                    `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
                );

                if (!res.ok) {
                    throw new Error('Coin not found');
                }

                const data = await res.json();
                setCoins(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getCoins();
    }, [limit]);

    // ✅ Apply filter
    const filteredCoins = coins.filter((coin) =>
        coin.name.toLowerCase().includes(filter.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            <h1>🚀 Crypto Dash</h1>

            {loading && <p>Loading...</p>}
            {error && <div className="error">{error}</div>}

            <div className="top-controls">
                <FilterInput filter={filter} onFilterChange={setFilter} />
                <LimitSelector limit={limit} onLimitChange={setLimit} />
            </div>

            {!loading && !error && (
                <main className="grid">
                    {filteredCoins.length > 0 ? filteredCoins.map((coin) => (
                        <CoinCard key={coin.id} coin={coin} />
                    )) : (<P>No Matching Coins!</P>)}
                </main>
            )}
        </div>
    );
};

export default App;
