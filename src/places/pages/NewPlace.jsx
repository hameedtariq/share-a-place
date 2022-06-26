import Input from '../../shared/components/FormElements/Input/Input'
import Button from '../../shared/components/FormElements/Button/Button'
import './NewPlace.css'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook'
const NewPlace = () => {

  const [formState, inputHandler] = useForm({
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
  }, false)  
  
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