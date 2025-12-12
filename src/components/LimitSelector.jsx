import React from 'react';

const LimitSelector = ({ limit, onLimitChange }) => {
    const options = [5, 10, 20, 50, 100];

    return (
        <div className="limit-selector-wrapper">
            <div className="select-container">
                <div className="select-label">
                    <span>📋</span>
                    <span>Show</span>
                </div>
                <div className="select-wrapper">
                    <select
                        id="limit"
                        value={limit}
                        onChange={(e) => onLimitChange(Number(e.target.value))}
                        className="limit-select"
                    >
                        {options.map(option => (
                            <option key={option} value={option}>
                                {option} coins
                            </option>
                        ))}
                    </select>
                    <span className="select-arrow">▼</span>
                </div>
            </div>
        </div>
    );
};

export default LimitSelector;