import { useEffect, useState } from 'react'
import getAll from './services/countries'

function App() {
  const [countries, setCountries] = useState([])
  const [searchCountries, setSearchCountries] = useState('')
  const [header, setHeader] = useState('Search results')
  const [countryToShow, setCountryToShow] = useState(null);
  const [weather, setWeather] = useState(null);

  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchCountries.toLowerCase())
  )
  const apiKey = import.meta.env.VITE_WEATHERMAP_KEY;

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

  useEffect(() => {
    console.log('UseEffect weather');
    const country = countryToShow || (countriesToShow.length === 1 ? countriesToShow[0] : null);
    if (!country) return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${apiKey}&units=metric`)
      .then(res => res.json())
      .then(data => setWeather(data))
      .catch(err => console.error(err));

  }, [countryToShow, countriesToShow.length, countriesToShow[0]?.name.common]);



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
      {weather && (
        <div>
          <h3>Weather in {header}</h3>
          <p>Temperature: {weather.main.temp} °C</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>Wind: {weather.wind.speed} m/s</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}

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
