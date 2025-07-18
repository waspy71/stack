
import { useState, useEffect } from 'react'
import axios from 'axios'

import Countries from './components/Countries'


const App = () => {
  const [countries, setCoutries] = useState([])
  const [country, setCountry] = useState('')

  

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCoutries(response.data)
      })
  }, [])


  const countriesToShow = country
    ? countries.filter(c => c.name.common.toLocaleLowerCase().includes(country.toLocaleLowerCase()))
    : null

  return (
    <div>
      <h1>Countries:</h1>
        Find countries: <input onChange={(e) => setCountry(e.target.value)} value={country} />
      <Countries countriesToShow={countriesToShow} setCountry={setCountry}/>
    </div>
  )
}

export default App
