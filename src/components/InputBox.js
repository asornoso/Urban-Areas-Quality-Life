import React from 'react'

//This component allows the user to enter text input
//Receives 2 props:
//onChange to update the parent's state
//states: a list of states to render dropdown items for
const InputBox = (props) => {

  const options  = props.cities.map( (city, i) => {
        return <option value={city} key={'city_'+i}>{city}</option>
      })

  return (
    <div className='input-box'>
       <select name="city" id='user_input' className='input'  defaultValue={'default'}  onChange={ e => {
           props.onChange(e.target.value)
         }}>

         <option value="default" disabled > Select a state </option>


        { options  }

      </select>
    </div>
  )
}

export default InputBox
