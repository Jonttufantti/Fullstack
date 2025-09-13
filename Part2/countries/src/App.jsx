import { useEffect, useState } from 'react'
import getAll from './services/countries'
import { hasFlag } from 'country-flag-icons'

function App() {
  const [countries, setCountries] = useState([])
  const [searchCountries, setSearchCountries] = useState('')
  const [header, setHeader] = useState('Search results')

  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchCountries.toLowerCase())
  )

  useEffect(() => {
    if (countriesToShow.length === 1) {
      setHeader(countriesToShow[0].name.common);
    } else {
      setHeader('Search results');
    }
  }, [countriesToShow, setHeader]);

  const Notification = () => {
    if (countriesToShow.length > 10 && searchCountries) {
      return (
        <p>Too many matches, specify another filter</p>
      )
    }
    return null;
  }

  const SearchResults = () => {
    if (countriesToShow.length === 1) {
      const country = countriesToShow[0];
      return (
        <div>
          <p>Capital {country.capital}</p>
          <p>Area {country.area}</p>
          <br />
          <h2>Languages</h2>
          <ul>
            {Object.values(country.languages).map(lang => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
          <img
            alt={country.flags.alt || `${country.name.common} flag`}
            src={country.flags.svg}
            width="150"
          />
        </div>
      )
    }
    return (
      <div>
        <ul>
          {countriesToShow.map(c => (
            <li key={c.cca3} >{c.name.common}</li>
          ))}
        </ul>
      </div>
    )
  }

  useEffect(() => {
    getAll()
      .then(initialCountries => {
        console.log('Promise fulfilled')
        setCountries(initialCountries)
      })
  }, [])

  const handleSearch = (event) => {
    console.log(event.target.value)
    setSearchCountries(event.target.value)
  }

  return (
    <>
      <div>
        <h2>Search</h2>

        <input
          value={searchCountries}
          placeholder='Find countries'
          onChange={handleSearch}
        />

        <Notification />
        <h2>{header} </h2>
        <SearchResults />

      </div>
    </>
  )
}

export default App
