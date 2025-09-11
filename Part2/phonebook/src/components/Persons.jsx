import Person from './Person'

const Persons = ({ persons, handleDelete }) => (
  <ul>
    {persons.map(person =>
      <Person 
      key={person.id} 
      person={person.name} 
      number={person.number} 
      handleDelete={() => handleDelete(person.name, person.id)}/>
    )}
  </ul>
)

export default Persons
