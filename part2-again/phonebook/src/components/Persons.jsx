const Person = ({ person }) => <p>{person.name} {person.number}</p>

const Persons = ({ persons, searchTerm }) => {
    const filteredPersons = persons.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    return filteredPersons.map((p) => <Person person={p} key={p.id} />)
}

export default Persons