import Input from '../../shared/components/FormElements/Input/Input'
import Button from '../../shared/components/FormElements/Button/Button'
import './NewPlace.css'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { useContext } from 'react'
import AuthContext from '../../shared/context/auth-context'
import ErrorModal from '../../shared/components/UIElements/ErrorModal/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner/LoadingSpinner'
import {useNavigate} from 'react-router-dom'

const NewPlace = () => {
  const {loading, error, sendRequest, clearError} = useHttpClient();
  const {userId} = useContext(AuthContext);
  const navigate = useNavigate();
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

  const placeSubmitHandler = async (e)=> {
    e.preventDefault();
    try {
      await sendRequest('http://localhost:5000/api/places',
       'POST',
       JSON.stringify({
        title: formState.inputs.title.value,
        description: formState.inputs.description.value,
        address: formState.inputs.address.value,
        creatorId: userId
      }), {
        'Content-Type': 'application/json',
      })
      navigate(`/${userId}/places`);
    } catch (error) {
      
    }
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError}/>
      <form className='place-form'>
       {loading && <LoadingSpinner asOverlay/>}
        <Input type="text" label="Title" element="input" id="title" validators={[VALIDATOR_REQUIRE()]} onInput={inputHandler} errorText="Please enter a valid title"/>
        <Input type="text" label="Address" element="input" id="address" validators={[VALIDATOR_REQUIRE()]} onInput={inputHandler} errorText="Please enter a valid address"/>
        <Input label="Description" element="textarea" id="description" validators={[VALIDATOR_MINLENGTH(5)]} onInput={inputHandler} errorText="Please enter a valid description."/>
        <Button type='submit' disabled={!formState.isValid} onClick={placeSubmitHandler}>
          ADD PLACE
        </Button>
      </form>
    </>
  )
}

export default NewPlace