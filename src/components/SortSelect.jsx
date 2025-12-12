import React from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';

const SortSelect = ({ sortBy, onSortChange }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sort-selector-wrapper"
        >
            <div className="select-container">
                <Filter size={16} className="filter-icon" />
                <div className="select-wrapper">
                    <select
                        id="sort"
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="sort-select"
                    >
                        <option value="market_cap_desc">Market Cap (High → Low)</option>
                        <option value="market_cap_asc">Market Cap (Low → High)</option>
                        <option value="price_desc">Price (High → Low)</option>
                        <option value="price_asc">Price (Low → High)</option>
                        <option value="change_desc">24h Change (High → Low)</option>
                        <option value="change_asc">24h Change (Low → High)</option>
                    </select>
                </div>
            </div>
        </motion.div>
    );
};

export default SortSelect;