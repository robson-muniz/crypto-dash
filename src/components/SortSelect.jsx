import React from 'react';

const SortSelect = ({ sortBy, onSortChange }) => {
    const sortOptions = [
        { value: 'market_cap_desc', label: 'Market Cap (High → Low)' },
        { value: 'market_cap_asc', label: 'Market Cap (Low → High)' },
        { value: 'price_desc', label: 'Price (High → Low)' },
        { value: 'price_asc', label: 'Price (Low → High)' },
        { value: 'change_desc', label: '24h Change (High → Low)' },
        { value: 'change_asc', label: '24h Change (Low → High)' }
    ];

    return (
        <div className="sort-selector-wrapper">
            <div className="select-container">
                <div className="select-label">
                    <span>🔽</span>
                    <span>Sort by</span>
                </div>
                <div className="select-wrapper">
                    <select
                        id="sort"
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="sort-select"
                    >
                        {sortOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <span className="select-arrow">▼</span>
                </div>
            </div>
        </div>
    );
};

export default SortSelect;