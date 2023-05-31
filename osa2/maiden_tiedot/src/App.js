import { useState, useEffect } from 'react';
import axios from 'axios'
import Country from './components/Country.js'

const App = () => {
  const [countries, setcountries] = useState(null) 
  const [search, setSearch] = useState('')
  const [searchedCountries, setSearchedCountries] = useState([])
  const [name, setName] = useState('')
  const [capital, setCapital] = useState('')
  const [area, setArea] = useState(0)
  const [languages, setLanguages] = useState([])
  const [flag, setFlag] = useState('')
  const [msg, setMsg] = useState(null)

  useEffect(() => {
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setcountries(response.data.map(x => x.name.common))
    })

    if (search !== '') {
      const searched = countries.filter(country => country.toLowerCase().startsWith(search.toLowerCase()))
      if (searched.length === 1) {
        axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${searched[0]}`)
        .then(response => {
          setName(searched[0])
          setCapital(response.data.capital[0])
          setArea(response.data.area)
          setLanguages(Object.values(response.data.languages))
          setFlag(response.data.flags.png)
          setMsg('')
        setSearchedCountries([])
    })
      }
      else if (searched.length <= 10) {
        setName('')
        setMsg('')
      setSearchedCountries(searched)
      } else {
        setName('')
        setMsg("Too many matches, specify another filter")
        setSearchedCountries([])
      }
    } else {
      setName('')
      setMsg('')
      setSearchedCountries([])
    }
  }, [search])

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  const handleButton = (country) => {
    axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
        .then(response => {
          setName(country)
          setCapital(response.data.capital[0])
          setArea(response.data.area)
          setLanguages(Object.values(response.data.languages))
          setFlag(response.data.flags.png)
        setSearchedCountries([])
    })
  }


  return (
    <div>
      <div>
        find countries <input value={search} onChange={handleChange} />
      </div>
      {msg}
      <div>
      {searchedCountries.map(country => (
          <p key={country}>
            {country}
            <button onClick={() => handleButton(country)}>show</button>
          </p>
        ))}

      </div>
      <div>
        <Country 
        name={name}
        capital={capital}
        area={area}
        languages={languages}
        flag={flag}
        />
      </div>
    </div>
  )
  }


export default App