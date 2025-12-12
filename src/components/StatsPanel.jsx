import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, BarChart3, Activity } from 'lucide-react';

const StatsPanel = ({ totalCoins, totalMarketCap, totalVolume, avgChange }) => {
    const stats = [
        {
            icon: <Activity size={20} />,
            label: "Tracked Coins",
            value: totalCoins,
            color: "#667eea"
        },
        {
            icon: <DollarSign size={20} />,
            label: "Total Market Cap",
            value: `$${(totalMarketCap / 1e12).toFixed(2)}T`,
            color: "#00d09c"
        },
        {
            icon: <BarChart3 size={20} />,
            label: "24h Volume",
            value: `$${(totalVolume / 1e9).toFixed(2)}B`,
            color: "#f093fb"
        },
        {
            icon: <TrendingUp size={20} />,
            label: "Avg 24h Change",
            value: `${avgChange.toFixed(2)}%`,
            color: avgChange >= 0 ? "#00d09c" : "#ff4757"
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="stats-panel"
        >
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="stat-card"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="stat-icon" style={{ background: `${stat.color}20` }}>
                            <div style={{ color: stat.color }}>
                                {stat.icon}
                            </div>
                        </div>
                        <div className="stat-content">
                            <h3 className="stat-value">{stat.value}</h3>
                            <p className="stat-label">{stat.label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default StatsPanel;