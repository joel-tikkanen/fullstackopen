import { useState, useEffect } from 'react'
import countryService from './services/countries'


const Country = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>capital {props.capital}</p>
      <p>area {props.area}</p>
      <h3>languages</h3>
      <ul>
        {Object.keys(props.languages).map(l => <li>{l}</li>)}
      </ul>
      <img src={props.flags.png} height='auto' width='auto'/>
    </div>
  )
}

const Countries = (props) => {
  const [newData, setData] = useState([]);
  const baseUrl = 'https://restcountries.com/v3.1/name/'

  useEffect(() => {
    countryService
      .getAll(baseUrl + props.filter)
      .then(response => {
        setData(response.data)
      })
      .catch(error => {
        setData([])
      })
  })

  const handleShow = (event) => {
    props.change(event.target.name)
  }

  if (newData.length === 1){
    return (
      newData.map(country => <Country key={country.name.common} name={country.name.common} capital={country.capital} area={country.area} flags={country.flags} languages={country.languages}/>)
    )
  }
  if (newData.length > 10){
    return (
      <p>Too many matches, specify another filter</p>
    )
  }

  return (
    <div>
      {newData.map(country => <p key={country.name.common}>{country.name.common}<button name={country.name.common} onClick={handleShow}>show</button></p>)}
    </div>
  )
}

const App = () => {
  
  const [newFilter, setNewFilter] = useState('');
 

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    console.log(newFilter)
  }

  

  return (
    <div>
      find countries
      <input onChange={handleFilterChange} value={newFilter}/>
      <Countries filter={newFilter} change={setNewFilter}/>
    </div>
    
  )
}

export default App;
