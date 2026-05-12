const DeleteButton = ({ onClick }) => <button onClick={onClick}>Delete</button>

const Person = ({ person, onClick }) => <p>{person.name} {person.number} <DeleteButton onClick={onClick} /> </p>

const Persons = ({ persons, searchTerm, onClick }) => {
    const filteredPersons = persons.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    return filteredPersons.map((p) => <Person person={p} key={p.id} onClick={() => onClick(p.id)} />)
}

export default Persons