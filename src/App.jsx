import React, { useEffect, useState } from 'react';

const API_URL =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=10&page=1&sparkline=false';

const App = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCoins = async () => {
            try {
                const res = await fetch(API_URL);

                if (!res.ok) {
                    throw new Error('Coin not found');
                }

                const data = await res.json();
                console.log(data);
                setCoins(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getCoins();
    }, []);

    return (
        <div>
            <h1>🚀 Crypto Dash</h1>
        </div>
    );
};

export default App;
