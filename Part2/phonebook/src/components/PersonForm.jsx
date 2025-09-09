const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => (
  <form onSubmit={addPerson}>
    <div>
      name: <input
        value={newName}
        onChange={handleNameChange}
        placeholder="Type name here"
      />
    </div>
    <div>
      number: <input
        value={newNumber}
        onChange={handleNumberChange}
        placeholder="Type phonenumber here"
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)


export default PersonForm
