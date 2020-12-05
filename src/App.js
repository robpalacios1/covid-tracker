import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import InfoBox from './components/InfoBox'
import Map from './components/Map'
import Table from './components/Table'
import { sortData } from './components/util'
import LineGraph from './components/LineGraph';
import './App.css';
import 'leaflet/dist/leaflet.css'

function App() {

  const[countries, setCountries] = useState([]);
  const[country, setCountry] = useState('worldwide');
  const[countryInfo, setCountryInfo] = useState({});
  const[tableData, setTableData] = useState([]);
  const[mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796})
  const[mapZoom, setMapZoom] = useState(3)

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    })
  }, [])

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

        const sortedData = sortData(data)
        setTableData(sortedData);
        setCountries(countries);
      })
    }
    getCountriesData();
  }, [])

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);

    const url = countryCode === 'worldwide'
      ? 'https://disease.sh/v3/covid-19/all'
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then(response => response.json())
    .then( data => {
      setCountry(countryCode);

      //All of the data...
      //from the country response
      setCountryInfo(data);
    })
  }

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID 19 TRACKER</h1>
            <FormControl className="app__dropdown">
              <Select
                variant="outlined"
                onChange={onCountryChange}
                value={country}
              >
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
          <InfoBox
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>

        <Map
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Lives Cases by country</h3>
          <Table countries={tableData}/>
          <h3>Worldwide new cases</h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
