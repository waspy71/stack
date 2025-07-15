import { useState, useEffect } from 'react'
import Filter from './components/FIlter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    console.log('newName', newName);
    
    const newPerson = persons.find(p => p.name.toLowerCase() === newName.toLocaleLowerCase())
    console.log('newPerson', newPerson, persons)
    if(newPerson) {
      if(window.confirm(`${newPerson.name} is already added to the phonebook, replace the old number?`)) {
        personsService
          .update(newPerson.id,{...newPerson, number: newNumber})
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id === updatedPerson.id ? updatedPerson : p))
          })
      }
      setNewName('')
      setNewNumber('')
    } else {
      const newPersonObject = {
        name: newName,
        number: newNumber,
      }

      personsService
        .create(newPersonObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
        
      setNewName('')
      setNewNumber('')
    }
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const handleRemove = (person) => {
    if(window.confirm(`Delete ${person.name}`)) {
      personsService
        .remove(person.id)
      
        setPersons(persons.filter(p => p.id !== person.id))
    }
  }

  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} filter={filter}/>
      <h2>Add new</h2>
      <PersonForm 
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons 
        personsToShow={personsToShow} 
        removePerson={handleRemove}
      />
    </div>
  )
}

export default App