const FilterInput = ({ filter, onFilterChange }) => {
    return (
        <div className="filter">
            <input
                type="text"
                value={filter}
                onChange={(e) => onFilterChange(e.target.value)}
                placeholder="Filter coins by name"
            />
        </div>
    );
};

export default FilterInput;
