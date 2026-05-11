const Filter = ({ newSearchTerm, handleSearchTermChange }) => {
    return <label> filter shown with <input type="search" value={newSearchTerm} onChange={handleSearchTermChange} /></label>
}

export default Filter