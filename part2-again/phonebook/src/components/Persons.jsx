const DeleteButton = ({ onClick }) => <button onClick={onClick}>Delete</button>

const Person = ({ person, handleDelete }) => <p>{person.name} {person.number} <DeleteButton onClick={handleDelete} /> </p>

const Persons = ({ persons, searchTerm, handleDeletePerson }) => {
    const filteredPersons = persons.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    return filteredPersons.map((p) => <Person person={p} key={p.id} handleDelete={() => handleDeletePerson(p.id)} />)
}

export default Persons