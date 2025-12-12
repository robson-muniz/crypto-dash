import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CoinCard from "./components/CoinCard.jsx";
import LimitSelector from "./components/LimitSelector.jsx";
import FilterInput from "./components/FilterInput.jsx";
import SortSelect from "./components/SortSelect.jsx";
import StatsPanel from "./components/StatsPanel.jsx";

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

    const filteredCoins = coins
        .filter((coin) =>
            coin.name.toLowerCase().includes(filter.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(filter.toLowerCase())
        )
        .slice()
        .sort((a, b) => {
            switch (sortBy) {
                case 'market_cap_desc':
                    return b.market_cap - a.market_cap;
                case 'market_cap_asc':
                    return a.market_cap - b.market_cap;
                case 'price_desc':
                    return b.current_price - a.current_price;
                case 'price_asc':
                    return a.current_price - b.current_price;
                case 'change_desc':
                    return b.price_change_percentage_24h - a.price_change_percentage_24h;
                case 'change_asc':
                    return a.price_change_percentage_24h - b.price_change_percentage_24h;
                default:
                    return 0;
            }
        });

    const totalMarketCap = coins.reduce((sum, coin) => sum + coin.market_cap, 0);
    const totalVolume = coins.reduce((sum, coin) => sum + coin.total_volume, 0);
    const avgChange = coins.reduce((sum, coin) => sum + coin.price_change_percentage_24h, 0) / coins.length;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="app-container"
        >
            <header className="app-header">
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="header-content"
                >
                    <div className="header-main">
                        <div className="logo-container">
                            <motion.div
                                className="logo"
                                animate={{ rotate: [0, 360] }}
                                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                            >
                                <svg width="40" height="40" viewBox="0 0 40 40">
                                    <circle cx="20" cy="20" r="18" fill="none" stroke="url(#gradient)" strokeWidth="2"/>
                                    <path d="M20 2 L20 38 M2 20 L38 20" stroke="url(#gradient)" strokeWidth="1"/>
                                    <circle cx="20" cy="20" r="8" fill="none" stroke="url(#gradient)" strokeWidth="2"/>
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#667eea" />
                                            <stop offset="100%" stopColor="#764ba2" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </motion.div>
                            <div>
                                <h1 className="app-title">Crypto<span className="gradient-text">Dash</span></h1>
                                <p className="app-subtitle">Real-time cryptocurrency insights</p>
                            </div>
                        </div>

                        <StatsPanel
                            totalCoins={coins.length}
                            totalMarketCap={totalMarketCap}
                            totalVolume={totalVolume}
                            avgChange={avgChange}
                        />
                    </div>
                </motion.div>
            </header>

            <main className="main-content">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="controls-section"
                >
                    <div className="controls-grid">
                        <FilterInput filter={filter} onFilterChange={setFilter} />
                        <div className="secondary-controls">
                            <SortSelect sortBy={sortBy} onSortChange={setSortBy} />
                            <LimitSelector limit={limit} onLimitChange={setLimit} />
                        </div>
                    </div>
                </motion.div>

                {loading ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="loading-container"
                    >
                        <div className="spinner"></div>
                        <p className="loading-text">Fetching market data...</p>
                    </motion.div>
                ) : error ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="error-container"
                    >
                        <div className="error-icon">⚠️</div>
                        <h3>Unable to Load Data</h3>
                        <p>{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="retry-btn"
                        >
                            Retry Connection
                        </button>
                    </motion.div>
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={filteredCoins.length}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {filteredCoins.length > 0 ? (
                                <div className="coins-grid">
                                    <AnimatePresence>
                                        {filteredCoins.map((coin, index) => (
                                            <motion.div
                                                key={coin.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                transition={{ delay: index * 0.05 }}
                                                layout
                                            >
                                                <CoinCard coin={coin} />
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="no-results"
                                >
                                    <div className="no-results-icon">🔍</div>
                                    <h3>No Matching Coins Found</h3>
                                    <p>Try adjusting your search filter</p>
                                </motion.div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                )}

                <motion.footer
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="app-footer"
                >
                    <p>Data updates in real-time • Last refresh: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                </motion.footer>
            </main>
        </motion.div>
    );
};

export default App;