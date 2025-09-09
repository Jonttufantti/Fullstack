const Filter = ({ search, handleSearchPersons }) => (
    <div>
        <input
            value={search}
            onChange={handleSearchPersons}
            placeholder='Search by name'
        />
    </div>
)

export default Filter
