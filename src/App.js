import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import './App.css';

function App() {

  const[countries, setCountries] = useState([]);

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

  return (
    <div className="app">
      <div className="app__header">
      <h1>COVID 19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select variabt="outlined"value="abc">
            {/** Loop through all the countries and show a dropdown */}

            {
              countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>
      {/**Header */}
      {/**Title + Select input dropdown field */}

      {/**InfoBoxs */}
      {/**InfoBoxs */}
      {/**InfoBoxs */}

      {/**Table */}
      {/**Graph */}

      {/**Map */}
    </div>
  );
}

export default App;
