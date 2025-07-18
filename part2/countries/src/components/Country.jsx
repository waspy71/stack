import Weather from "./Weater";

const Country = ({ country }) => {
    
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital[0]}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map(c => <li key={c}>{c}</li>)}
      </ul>
      <img src={country.flags.png}></img>
      <Weather country={country}/>
    </div>
  )
}

export default Country