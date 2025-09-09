import Person from './Person'

const Persons = ({ persons }) => (
  <ul>
    {persons.map(person =>
      <Person key={person.id} person={person.name} number={person.number} />
    )}
  </ul>
)

export default Persons
