import { useState, useEffect } from 'react'
import personService from './services/persons'

const PersonForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <h2>add new</h2>
        name: <input onChange={props.handleNameChange} value={props.newName} />
        number: <input onChange={props.handleNumberChange} value={props.newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Notification = (props) => {
  if (props.message === null) {
    return null
  }
  return (
    <div className={props.type}>
      {props.message}
    </div>
  )
}

const Filter = (props) => {
  return (
    <div>
      filter show with <input onChange={props.handleFilterChange} value={props.newFilter} />
    </div>
  )
}

const Person = (props) => {
  return (
      <p key={props.person.name}>{props.person.name} {props.person.number}<button id={props.person.id} name={props.person.name} onClick={props.handleDelete}>delete</button></p>
  )
}

const Persons = (props) => {

  return (
    <div>
      <h2>Numbers</h2>
      {props.persons
        .filter(person => person.name.toLowerCase().includes(props.newFilter.toLowerCase()))
        .map(person => <Person key={person.name} person={person} handleDelete={props.handleDelete} />)
      }
    </div>
  )
}
const App = () => {

  const [persons, setPersons] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newNotification, setNotification] = useState(null)
  const [newNotificationType,setNotificationType] = useState(null)


  const hook = () => {
    personService.getAll()
      .then(response => {
        setPersons(response.data)
      })
      .catch(error => {console.log("fail")})
  }

  useEffect(hook, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    let found = false
    persons.forEach(person => {
      if (person.name === newName){
        found = person
      }
    })
    console.log(found)
    if (found ) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
      personService
      .update(found.id, {name: newName , number: newNumber})
      .then(response => {
        const copy = persons.slice()
        copy[copy.indexOf(found)].number = newNumber
        setPersons(copy)
        setNotification("Changed " + newName + "'s " + "number to " + newNumber)
        setNotificationType("notification")
      })
      .catch(error => {
          setNotification(error)
          setNotificationType("error")
          setTimeout(() => {
            setNotification(null)
          }, 3000)
      })
    } 
    }
    else {
      personService
      .create({name: newName, number: newNumber})
        .then(person => {
          setPersons(persons.concat(person.data))
          setNotification("Added " + newName)
          setNotificationType("notification")
          setTimeout(() => {
            setNotification(null)
          }, 3000)
        
      })
      .catch(error => {
          setNotification(error.response.data.error)
          setNotificationType("error")
          setTimeout(() => {
            setNotification(null)
          }, 3000)
      })
      
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleDelete = (event) => {
    console.log(event.target.id)
    if (window.confirm("Delete " + event.target.name + " ?")){
      personService
      .remove(event.target.id)
      .then(response => {
        setPersons(persons.filter(n => n.id !== event.target.id))
        setNotification("Deleted " + event.target.name)
        setNotificationType("notification")
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      })
      .catch(error => {
        console.log(error)
        setNotification("fail")
        setNotificationType("error")
      })
      
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newNotification} type={newNotificationType}/>
      <Filter handleFilterChange={handleFilterChange} newFilter={newFilter} />
      <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleSubmit={handleSubmit} />
      <Persons persons={persons} newFilter={newFilter} handleDelete={handleDelete}/>
    </div>
  )

}

export default App