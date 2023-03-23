import { useState, useEffect } from 'react'
import countryService from './services/countries'


const Country = (props) => {
  return (
    <p>{props.name}</p>
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
        console.log(error)
      })
  })

  console.log(newData)
  if (newData.length == 1){
    console.log("one")
  }
  if (newData.length == 10){
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  

  return (
    <div>
      {newData.map(country => <Country key={country.name.common} name={country.name.common}/>)}
    </div>
  )
}

const App = () => {
  
  const [newFilter, setNewFilter] = useState('');
 

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  

  return (
    <div>
      find countries
      <input onChange={handleFilterChange} value={newFilter}/>
      <Countries filter={newFilter}/>
    </div>
    
  )
}

export default App;
