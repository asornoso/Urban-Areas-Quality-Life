import React, {useState} from 'react';
import './App.css';

import InputBox from './components/InputBox.js'
import CityResults from './components/CityResults.js'
import DataResults from './components/DataResults.js'

import {fetchCities, fetchData} from './APIConnector.js'




function App() {

//State objects to pass to children independently of each other
  //Contains user input data
  const [input, setInput] = useState("")
  //Contains fetched list of cities fetched as input updates
  const [cities, setCities] = useState([])
  //Contains fetched data as use clicks on a city
  const [data, setData] = useState({})

  return (
    <div className="App">
      <header className="App-header">
        <div> Urban Areas Quality of Living Data</div>
      
      </header>
      <div className='main-content'>

        <div className='input-wrapper wrapper'>
          <InputBox cities={states}
            onChange={ async (val) => {
              const temp = await fetchCities(val)
              setInput(val)
              setCities(temp);
            }}/>
        </div>

        <div className='city-wrapper wrapper'>
          {
            cities.length === 0 && input.length === 0 ?
              <div> Select a state in the dropdown above </div>
            :
              cities.length === 0 && input.length !== 0 ?
                <div> No Results </div>
              :
                <CityResults cities={cities} setCity={ async (obj) => {
                  const data = await fetchData(obj.link)
                  data.name = `Nearest Urban Area: ${data.name}`
                  setData(data)
                }}/>
          }
        </div>

        <div className='data-wrapper wrapper'>
          {data.name ?
              <DataResults data={data}/>
             :
              <p>No Data</p>
          }

        </div>

      </div>
    </div>
  );
}


const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshir',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virgini',
  'Wisconsin',
  'Wyoming',
]

export default App;
