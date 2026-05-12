import { useState, useEffect, useRef } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import { Notification } from "./components/Notifications";
import { createPersonEntry, deletePersonEntry, updatePersonEntry, getAllPersons } from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notificationObj, setNotificationObj] = useState(null);
  const prevTimer = useRef(null)

  useEffect(() => {
    getAllPersons()
      .then(initPersons => setPersons(initPersons));
  }, []);

  const resetNewPerson = () => {
    setNewName("")
    setNewNumber("")
  }

  const showNotification = ({ msg, type }) => {
    setNotificationObj({ msg, type })
    clearTimeout(prevTimer.current)
    prevTimer.current = setTimeout(() => {
      setNotificationObj(null)
      prevTimer.current = null
    }, 5000)
  }

  const addPerson = () => {
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    createPersonEntry(newPerson).then((person) => {
      setPersons((prevPersons) => prevPersons.concat(person));
      resetNewPerson()
      showNotification({ msg: `Added ${person.name}`, type: 'success' });
    });
  }

  const updatePerson = () => {
    const prevEntry = persons.find((person) => person.name === newName)
    const updatedPerson = {
      ...prevEntry, number: newNumber
    };

    updatePersonEntry(updatedPerson).then((data) => {
      setPersons((prevPersons) => prevPersons.map((p) => p.id === data.id ? data : p));
      resetNewPerson()
      showNotification({ msg: `Updated ${data.name}'s phone number`, type: 'success' })
    }).catch(error => {
      showNotification({ msg: `Information of ${prevEntry.name} has already been removed from server`, type: 'error' })
      setPersons((prevPersons) => prevPersons.filter(p => p.id !== prevEntry.id))
    })

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
        setPersons(prevPersons => prevPersons.filter((p) => p.id !== id))
      })
    }
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setFilterTerm(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationObj} />
      <Filter
        newSearchTerm={filterTerm}
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
        searchTerm={filterTerm}
        handleDeletePerson={handleDelete}
      />
    </div>
  );
};

export default App;
