import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const LimitSelector = ({ limit, onLimitChange }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="limit-selector-wrapper"
        >
            <div className="select-container">
                <label htmlFor="limit" className="select-label">
                    Show
                </label>
                <div className="select-wrapper">
                    <select
                        id="limit"
                        value={limit}
                        onChange={(e) => onLimitChange(Number(e.target.value))}
                        className="limit-select"
                    >
                        <option value={5}>5 coins</option>
                        <option value={10}>10 coins</option>
                        <option value={20}>20 coins</option>
                        <option value={50}>50 coins</option>
                        <option value={100}>100 coins</option>
                    </select>
                    <ChevronDown size={16} className="select-arrow" />
                </div>
            </div>
        </motion.div>
    );
};

export default LimitSelector;