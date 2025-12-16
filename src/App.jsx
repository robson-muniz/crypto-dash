import React, {useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './components/pages/Home.jsx';
import AboutPage from "./components/pages/About.jsx";
import Header from "./components/Header.jsx";
import NotFound from "./components/pages/not-found.jsx";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [limit, setLimit] = useState(10);
    const [filter, setFilter] = useState('');
    const [sortBy, setSortBy] = useState('market_cap_desc');

    useEffect(() => {
        const getCoins = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch(
                    `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
                );

                if (!res.ok) {
                    throw new Error('Failed to fetch coin data');
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

    const totalMarketCap = coins.reduce(
        (sum, coin) => sum + coin.market_cap,
        0
    );

    const totalVolume = coins.reduce(
        (sum, coin) => sum + coin.total_volume,
        0
    );

    const avgChange =
        coins.length > 0
            ? coins.reduce(
            (sum, coin) => sum + coin.price_change_percentage_24h,
            0
        ) / coins.length
            : 0;

    return (
        <>
            <Header />
        <Routes>
            <Route
                path="/"
                element={
                    <Home
                        coins={coins}
                        filter={filter}
                        setFilter={setFilter}
                        limit={limit}
                        setLimit={setLimit}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        loading={loading}
                        error={error}
                        totalMarketCap={totalMarketCap}
                        totalVolume={totalVolume}
                        avgChange={avgChange}
                    />
                }
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFound />} />

        </Routes></>

    );
};

export default App;
