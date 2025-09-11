const Person = ({ person, number, handleDelete }) => {
  return (
  <li>
    {person}: {number}
    <button onClick={handleDelete}>Delete</button>
  </li>
  )
}

export default Person;