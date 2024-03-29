import { useState, useEffect } from 'react'
import personService from './services/persons'
import Person from './components/Person.js'
import Filter from './components/Filter.js'
import Notification from './components/Notification.js'
import PersonForm from './components/PersonForm.js'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState('')
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const personsToShow = showAll
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(newFilter))
  
  const updatePerson = (id, newObject) => {
    const person = persons.filter(person => person.id === id)
    console.log(id)
    personService
    .replace(id, newObject)
    .then(response => {
    console.log(response)
    setPersons(persons.map(person => person.name !== newObject.name ? person : newObject))
    setMessage(`Number updated for ${person[0].name}`)
    setTimeout(() => {
      setMessage('')
    }, 4000)
    setNewName('')
    setNewNumber('')
  })
  .catch(error => {
    console.log(error)
    setErrMsg(`${person[0].name} was already deleted from server`)
    setTimeout(() => {
      setErrMsg('')
    }, 4000)
    setPersons(persons.filter(person => person.id !== id))
  })
  }



  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    if (names.includes(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.filter(person => person.name === newName)
        const newObject = {name: newName, number: newNumber}
        console.log(newObject, person[0].id) 
        updatePerson(person[0].id, newObject)
      }
    } else {
    const nameObject = {
      name: newName,
      number: newNumber,
    }
    personService
    .create(nameObject)
    .then(response => {
      setPersons(persons.concat(response.data))
    })
    setMessage(`Added ${newName}`)
    setTimeout(() => {
      setMessage('')
    }, 4000)
  }
  setNewName('')
  setNewNumber('')
  }

  const deletePerson = (id) => {
    const person = persons.filter(person => person.id === id)
    personService
    .deletePerson(id)
    .then(response => {
      console.log(response)
    })
    setPersons(persons.filter(person => person.id !== id))
    setMessage(`Deleted ${person[0].name}`)
    setTimeout(() => {
      setMessage('')
    }, 4000)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    if (event.target.value === '') {
      setShowAll(true)
    } else {
      setShowAll(false)
      setNewFilter(event.target.value.toLowerCase())
    }
  }


  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} errMessage={errMsg}/>
      <div>
        <Filter handleFilterChange={handleFilterChange}/>
      </div>
      <h2>Add a new</h2>
        <PersonForm 
          handleNameChange={handleNameChange} 
          handleNumberChange={handleNumberChange}
          newName={newName}
          newFilter={newFilter}
          addPerson={addPerson}
          newNumber={newNumber}
          />
      <h2>Numbers</h2>
      {personsToShow.map(person => 
        <Person 
          key={person.name} 
          person={person}
          deletePerson={deletePerson}
          />
      )}
    </div>
  )

}

export default App