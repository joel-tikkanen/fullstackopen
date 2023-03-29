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
    const country = newData[0]
    return (
      <div>
        <Country key={country.name.common} name={country.name.common} capital={country.capital} area={country.area} flags={country.flags} languages={country.languages}/>
        <Weather city={country.capital}/>
      </div>
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

const Weather = (props) => {

  const [newData, setData] = useState([]);
  const [loaded, setLoaded] = useState(false)
  const apiKey = process.env.REACT_APP_API_KEY
  const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=${apiKey}`
  const toCelcius = (kelvin) => {return kelvin-273.15}

  useEffect(() => {
    if (!loaded) {
    countryService
      .getAll(baseUrl)
      .then(response => {
        console.log(response.data)
        setData(response.data)
        setLoaded(true)
      })
      .catch(error => {
        setData([])
        setLoaded(false)
      })
    }
  }, [])
   
   try {
    const iconUrl = `https://openweathermap.org/img/wn/${newData.weather[0].icon}@2x.png`
    return (
      <div>
        <h2>Weather in {props.city}</h2>
        <p>temperature {toCelcius(newData.main.temp)}°C</p>
        <img src={iconUrl} height='auto' width='auto' alt='weather-icon'/>
        <p>wind {newData.wind.speed} m/s</p>
      </div>
    )
    } catch (error){
      return (
        <p>loading...</p>
      )
    }
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
