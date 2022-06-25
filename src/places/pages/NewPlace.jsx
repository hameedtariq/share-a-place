import React, { useCallback } from 'react'
import Input from '../../shared/components/FormElements/Input/Input'
import Button from '../../shared/components/FormElements/Button/Button'
import './NewPlace.css'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import { useReducer } from 'react'
const NewPlace = () => {

  const formReducer = (state,action) => {
    switch(action.type){
      case "INPUT_CHANGE":
        let formIsValid = true;
        for(const inputId in state.inputs)
        {
          if(inputId === action.inputId)
          {
            formIsValid = formIsValid && action.isValid;
          }else{
            formIsValid = formIsValid && state.inputs[inputId].isValid;
          }
        }
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [action.inputId]: {
              value: action.value,
              isValid: action.isValid,
            }
          },
          isValid: formIsValid,
        }
      default:
        return state;
    }
  }

  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      }
    },
    isValid: false,
  });
  const inputHandler = useCallback((id,value,isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value,
      inputId: id,
      isValid,
    })
  }, [])
  // const descriptionInputHandler = useCallback((id,value,isValid) => {

  // }, [])

  const placeSubmitHandler = (e)=> {
    e.preventDefault();
    console.log(formState.inputs);
  }

  return (
    <form className='place-form'>
      <Input type="text" label="Title" element="input" id="title" validators={[VALIDATOR_REQUIRE()]} onInput={inputHandler} errorText="Please enter a valid title"/>
      <Input type="text" label="Address" element="input" id="address" validators={[VALIDATOR_REQUIRE()]} onInput={inputHandler} errorText="Please enter a valid address"/>
      <Input label="Description" element="textarea" id="description" validators={[VALIDATOR_MINLENGTH(5)]} onInput={inputHandler} errorText="Please enter a valid description."/>
      <Button type='submit' disabled={!formState.isValid} onClick={placeSubmitHandler}>
        ADD PLACE
      </Button>
    </form>
  )
}

export default NewPlace