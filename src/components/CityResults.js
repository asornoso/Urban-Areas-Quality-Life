import React from 'react'
import '../styles/cities.css'

//This component renders a list of cities to the DOM
//Receives 2 props:
//cities: a list of city data which includes the name and city link(for api calls)
//setCity: a function to update the parent components state 
const CityResults = (props) => {

  const results = props.cities.map( (obj, i) => {
    return <div key={obj.city+'_'+i} className='city' onClick={ (e)=> {props.setCity(obj)}}> {obj.city} </div>
  })

  return (
    <div className='city-results'>
      <div className='header'>
        { results.length > 0 && <p>Select a city: </p>}
      </div>
      <div className='results'>
            {results}
      </div>

    </div>
  )
}

export default CityResults
