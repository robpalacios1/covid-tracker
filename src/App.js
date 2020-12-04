import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import InfoBox from './components/InfoBox'
import './App.css';

function App() {

  const[countries, setCountries] = useState([]);
  const[country, setCountry] = useState('worldwide');

  useEffect(() => {
    const getCountriesData = async() => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country => (
          {
            name: country.country, // Colombia, Japan, United States
            value: country.countryInfo.iso2 // CO, JP, US
          })
        ))
        setCountries(countries);
      })
    }
    getCountriesData();
  }, [])

  const onCountryChange = (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
  }

  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID 19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select variabt="outlined" onChange={onCountryChange} value={country}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
      </div>

      <div className="app__stats">
        <InfoBox title="Coronavirus Cases" />

        <InfoBox title="Recovered" />

        <InfoBox title="Deaths" />
      </div>


      {/**Table */}
      {/**Graph */}

      {/**Map */}
    </div>
  );
}

export default App;
