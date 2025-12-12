import React from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

const FilterInput = ({ filter, onFilterChange }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="filter-input-wrapper"
        >
            <div className="filter-input-container">
                <Search size={20} className="search-icon" />
                <input
                    type="text"
                    value={filter}
                    onChange={(e) => onFilterChange(e.target.value)}
                    placeholder="Search coins by name or symbol..."
                    className="filter-input"
                />
                {filter && (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        onClick={() => onFilterChange('')}
                        className="clear-btn"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <X size={16} />
                    </motion.button>
                )}
            </div>
        </motion.div>
    );
};

export default FilterInput;