import React from 'react';

const StatsPanel = ({ totalCoins, totalMarketCap, totalVolume, avgChange }) => {
    const stats = [
        {
            icon: '💰',
            label: "Tracked Coins",
            value: totalCoins,
            color: "#667eea",
            change: "+2.3%",
            trend: "up"
        },
        {
            icon: '📈',
            label: "Total Market Cap",
            value: `$${(totalMarketCap / 1e12).toFixed(2)}T`,
            color: "#00d09c",
            change: "+1.8%",
            trend: "up"
        },
        {
            icon: '💎',
            label: "24h Volume",
            value: `$${(totalVolume / 1e9).toFixed(2)}B`,
            color: "#f093fb",
            change: "+5.2%",
            trend: "up"
        },
        {
            icon: '📊',
            label: "Avg 24h Change",
            value: `${avgChange.toFixed(2)}%`,
            color: avgChange >= 0 ? "#00d09c" : "#ff4757",
            change: avgChange >= 0 ? "+2.1%" : "-1.3%",
            trend: avgChange >= 0 ? "up" : "down"
        }
    ];

    return (
        <div className="stats-panel">
            <div className="stats-header">
                <div className="stats-title">
                    <span>📈</span>
                    <h3>Live Market Metrics</h3>
                </div>
                <div className="stats-update">
                    <span>🕒</span>
                    <span>Updated just now</span>
                </div>
            </div>

            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div
                        key={stat.label}
                        className="stat-card"
                    >
                        <div className="stat-main">
                            <div className="stat-icon" style={{ background: `${stat.color}20` }}>
                                <div style={{ color: stat.color, fontSize: '24px' }}>
                                    {stat.icon}
                                </div>
                            </div>
                            <div className="stat-content">
                                <h3 className="stat-value">{stat.value}</h3>
                                <p className="stat-label">{stat.label}</p>
                            </div>
                        </div>
                        <div className={`stat-change ${stat.trend}`}>
                            {stat.trend === 'up' ? '↗' : '↘'} {stat.change}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatsPanel;