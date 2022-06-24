import React from 'react'
import Input from '../../shared/components/FormElements/Input/Input'
import './NewPlace.css'
const NewPlace = () => {
  return (
    <form className='place-form'>
      <Input type="text" label="Title" element="input" id="place-title"/>
    </form>
  )
}

export default NewPlace