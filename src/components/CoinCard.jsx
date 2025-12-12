import React from 'react';

const CoinCard = ({ coin }) => {
    const isPositive = coin.price_change_percentage_24h >= 0;
    const marketCapInBillions = (coin.market_cap / 1e9).toFixed(2);
    const volumeInMillions = (coin.total_volume / 1e6).toFixed(1);

    return (
        <div className="coin-card">
            <div className="card-header">
                <div className="coin-info">
                    <img
                        src={coin.image}
                        alt={coin.name}
                        className="coin-image"
                    />
                    <div className="coin-title">
                        <h3 className="coin-name">{coin.name}</h3>
                        <span className="coin-symbol">{coin.symbol.toUpperCase()}</span>
                    </div>
                </div>
                <div className="card-actions">
                    <button className="star-btn">⭐</button>
                </div>
            </div>

            <div className="card-body">
                <div className="price-section">
                    <div className="price-label">Current Price</div>
                    <div className="price-value">${coin.current_price.toLocaleString()}</div>
                    <div className={`price-change ${isPositive ? 'positive' : 'negative'}`}>
                        {isPositive ? '↗' : '↘'} {coin.price_change_percentage_24h.toFixed(2)}%
                    </div>
                </div>

                <div className="metrics-grid">
                    <div className="metric">
                        <div className="metric-label">Market Cap</div>
                        <div className="metric-value">${marketCapInBillions}B</div>
                    </div>
                    <div className="metric">
                        <div className="metric-label">24h Volume</div>
                        <div className="metric-value">${volumeInMillions}M</div>
                    </div>
                </div>
            </div>

            <div className="card-footer">
                <div className="market-data">
                    <div className="data-item">
                        <span className="data-label">Rank:</span>
                        <span className="data-value">#{coin.market_cap_rank || 'N/A'}</span>
                    </div>
                </div>
                <div className={`market-sentiment ${isPositive ? 'positive' : 'negative'}`}>
                    {isPositive ? 'Bullish ↗' : 'Bearish ↘'}
                </div>
            </div>
        </div>
    );
};

export default CoinCard;