import React, { useEffect, useState } from 'react';
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
    const avgChange = coins.length > 0 ? coins.reduce((sum, coin) => sum + coin.price_change_percentage_24h, 0) / coins.length : 0;

    return (
        <div className="app-container">
            <header className="app-header">
                <div className="header-content">
                    <div className="header-top">
                        <div className="logo-container">
                            <div className="logo">
                                <svg width="40" height="40" viewBox="0 0 40 40">
                                    <circle cx="20" cy="20" r="18" fill="none" stroke="#667eea" strokeWidth="2"/>
                                    <path d="M20 2 L20 38 M2 20 L38 20" stroke="#667eea" strokeWidth="1"/>
                                    <circle cx="20" cy="20" r="8" fill="none" stroke="#667eea" strokeWidth="2"/>
                                </svg>
                            </div>
                            <div className="logo-text">
                                <h1 className="app-title">Crypto<span className="gradient-text">Dash</span></h1>
                                <p className="app-subtitle">Real-time cryptocurrency insights</p>
                            </div>
                        </div>

                        <div className="header-actions">
                            <button className="header-btn watchlist-btn">
                                📋 Watchlist
                            </button>
                            <button
                                className="header-btn refresh-btn"
                                onClick={() => window.location.reload()}
                            >
                                🔄 Refresh
                            </button>
                        </div>
                    </div>

                    <div className="header-stats">
                        <div className="market-overview">
                            <div className="overview-title">
                                <span>📊</span>
                                <h3>Market Overview</h3>
                            </div>

                            <div className="overview-stats">
                                <div className="overview-stat">
                                    <span className="stat-label">Total Cryptos</span>
                                    <span className="stat-value">14,205</span>
                                </div>
                                <div className="overview-stat">
                                    <span className="stat-label">24h Volume</span>
                                    <span className="stat-value">$89.2B</span>
                                </div>
                                <div className="overview-stat">
                                    <span className="stat-label">BTC Dominance</span>
                                    <span className="stat-value">52.8%</span>
                                </div>
                                <div className="overview-stat">
                                    <span className="stat-label">Market Status</span>
                                    <span className="stat-value positive">Greed</span>
                                </div>
                            </div>
                        </div>

                        <div className="trending-coins">
                            <div className="trending-title">
                                <span>🚀</span>
                                <h3>Trending Now</h3>
                            </div>
                            <div className="trending-list">
                                {coins.slice(0, 3).map((coin) => (
                                    <div key={coin.id} className="trending-coin">
                                        <img src={coin.image} alt={coin.name} width={20} height={20} />
                                        <span className="trending-name">{coin.symbol.toUpperCase()}</span>
                                        <span className={`trending-change ${coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}`}>
                                            {coin.price_change_percentage_24h >= 0 ? '+' : ''}{coin.price_change_percentage_24h.toFixed(1)}%
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <StatsPanel
                        totalCoins={coins.length}
                        totalMarketCap={totalMarketCap}
                        totalVolume={totalVolume}
                        avgChange={avgChange}
                    />
                </div>
            </header>

            <main className="main-content">
                <div className="controls-section">
                    <div className="controls-grid">
                        <FilterInput filter={filter} onFilterChange={setFilter} />
                        <div className="secondary-controls">
                            <SortSelect sortBy={sortBy} onSortChange={setSortBy} />
                            <LimitSelector limit={limit} onLimitChange={setLimit} />
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p className="loading-text">Fetching market data...</p>
                    </div>
                ) : error ? (
                    <div className="error-container">
                        <div className="error-icon">⚠️</div>
                        <h3>Unable to Load Data</h3>
                        <p>{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="retry-btn"
                        >
                            Retry Connection
                        </button>
                    </div>
                ) : (
                    <>
                        {filteredCoins.length > 0 ? (
                            <div className="coins-grid">
                                {filteredCoins.map((coin) => (
                                    <CoinCard key={coin.id} coin={coin} />
                                ))}
                            </div>
                        ) : (
                            <div className="no-results">
                                <div className="no-results-icon">🔍</div>
                                <h3>No Matching Coins Found</h3>
                                <p>Try adjusting your search filter</p>
                            </div>
                        )}
                    </>
                )}

                <footer className="app-footer">
                    <p>Data updates in real-time • Last refresh: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                </footer>
            </main>
        </div>
    );
};

export default App;