import React from 'react';

const FilterInput = ({ filter, onFilterChange }) => {
    return (
        <div className="filter-input-wrapper">
            <div className="filter-input-container">
                <span className="search-icon">🔍</span>
                <input
                    type="text"
                    value={filter}
                    onChange={(e) => onFilterChange(e.target.value)}
                    placeholder="Search coins by name or symbol..."
                    className="filter-input"
                />
                {filter && (
                    <button
                        onClick={() => onFilterChange('')}
                        className="clear-btn"
                        style={{
                            position: 'absolute',
                            right: '16px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'transparent',
                            border: 'none',
                            color: '#a0a3c1',
                            cursor: 'pointer'
                        }}
                    >
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
};

export default FilterInput;