import { useEffect, useState } from 'react'
import getAll from './services/countries'
import { hasFlag } from 'country-flag-icons'

function App() {
  const [countries, setCountries] = useState([])
  const [searchCountries, setSearchCountries] = useState('')
  const [header, setHeader] = useState('Search results')
  const [countryToShow, setCountryToShow] = useState(null);

  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchCountries.toLowerCase())
  )

  useEffect(() => {
    setCountryToShow(null);
  }, [searchCountries]);

  useEffect(() => {
    if (countriesToShow.length === 1) {
      setHeader(countriesToShow[0].name.common);
    } else if (countryToShow) {
      setHeader(countryToShow.name.common);
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

  const SearchResults = ({ countriesToShow, countryToShow, setCountryToShow }) => {

    if (countryToShow) {
      return <CountryDetails country={countryToShow} />;
    }

    if (countriesToShow.length === 1) {
      return <CountryDetails country={countriesToShow[0]} />;
    }


    return (
      <ul>
        {countriesToShow.map(c => (
          <li key={c.cca3}>
            {c.name.common}{" "}
            <button onClick={() => setCountryToShow(c)}>show</button>
          </li>
        ))}
      </ul>
    );
  };


  const CountryDetails = ({ country }) => (
    <div>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h3>Languages</h3>
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
  );


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

        <SearchResults
          countriesToShow={countriesToShow}
          countryToShow={countryToShow}
          setCountryToShow={setCountryToShow}
        />
      </div>
    </>
  )
}

export default App
