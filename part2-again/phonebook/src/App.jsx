import { useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import { useEffect } from "react";
import { createPersonEntry, deletePersonEntry, updatePersonEntry, getAllPersons } from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newSearchTerm, setSearchTerm] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    getAllPersons()
      .then(initPersons => setPersons(initPersons));
  }, []);

  const resetNewPerson = () => {
    setNewName("")
    setNewNumber("")
  }

  const addPerson = () => {
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    createPersonEntry(newPerson).then((person) => {
      setPersons((prevPersons) => prevPersons.concat(person));
      resetNewPerson()
    });
  }

  const updatePerson = () => {
    const prevEntry = persons.find((person) => person.name === newName)
    const updatedPerson = {
      ...prevEntry, number: newNumber
    };

    updatePersonEntry(updatedPerson).then((data) => {
      setPersons((prevPersons) => prevPersons.map((p) => p.id === prevEntry.id ? data : p));
      resetNewPerson()
    });
  }


  const addOrUpdatePerson = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        updatePerson()
      }
    } else {
      addPerson()
    }
  };

  const handleDelete = (id) => {
    if (window.confirm(`Delete ${persons.find((p) => p.id === id).name}?`)) {
      deletePersonEntry(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id))
      })
    }
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        newSearchTerm={newSearchTerm}
        handleSearchTermChange={handleSearchTermChange}
      />
      <h2>add a new</h2>
      <PersonForm
        addOrUpdatePerson={addOrUpdatePerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        searchTerm={newSearchTerm}
        handleDeletePerson={handleDelete}
      />
    </div>
  );
};

export default App;
