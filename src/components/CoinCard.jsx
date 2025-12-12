import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';

const CoinCard = ({ coin }) => {
    const isPositive = coin.price_change_percentage_24h >= 0;
    const marketCapInBillions = (coin.market_cap / 1e9).toFixed(2);

    return (
        <motion.div
            className="coin-card"
            whileHover={{
                y: -8,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
            }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <div className="card-header">
                <div className="coin-info">
                    <div className="coin-image-wrapper">
                        <img
                            src={coin.image}
                            alt={coin.name}
                            className="coin-image"
                        />
                        <div className="coin-status" style={{
                            background: isPositive ? 'rgba(0, 208, 156, 0.2)' : 'rgba(255, 71, 119, 0.2)',
                            borderColor: isPositive ? '#00d09c' : '#ff4757'
                        }}>
                            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        </div>
                    </div>
                    <div className="coin-title">
                        <h3 className="coin-name">{coin.name}</h3>
                        <span className="coin-symbol">{coin.symbol.toUpperCase()}</span>
                    </div>
                </div>
                <button className="details-btn">
                    <ExternalLink size={16} />
                </button>
            </div>

            <div className="card-body">
                <div className="price-section">
                    <div className="price-label">Current Price</div>
                    <div className="price-value">${coin.current_price.toLocaleString()}</div>
                </div>

                <div className="metrics-grid">
                    <div className="metric">
                        <span className="metric-label">24h Change</span>
                        <span className={`metric-value ${isPositive ? 'positive' : 'negative'}`}>
                            {isPositive ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
                        </span>
                    </div>
                    <div className="metric">
                        <span className="metric-label">Market Cap</span>
                        <span className="metric-value">${marketCapInBillions}B</span>
                    </div>
                </div>

                <div className="progress-bar">
                    <div className="progress-label">Market Rank</div>
                    <div className="rank-badge">#{coin.market_cap_rank || 'N/A'}</div>
                </div>
            </div>

            <div className="card-footer">
                <div className="volume">
                    <span className="volume-label">24h Volume:</span>
                    <span className="volume-value">
                        ${(coin.total_volume / 1e6).toFixed(1)}M
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default CoinCard;