import React, { useContext } from 'react'
import { useState } from 'react'
import ErrorModal from '../../shared/components/UIElements/ErrorModal/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner/LoadingSpinner'
import Button from '../../shared/components/FormElements/Button/Button'
import Input from '../../shared/components/FormElements/Input/Input'
import Card from '../../shared/components/UIElements/Card/Card'
import AuthContext from '../../shared/context/auth-context'
import { useForm } from '../../shared/hooks/form-hook'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import './Auth.css'
const Auth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    
    const {login} = useContext(AuthContext)  
    const [isLogin,setIsLogin] = useState(true);
    const [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value: '',
                isValid: false,
            },
            password: {
                value: '',
                isValid: false,
            }
        },
       false
    )

    const formSwitchHandler = (e)=> {
        e.preventDefault();
        if(isLogin){
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false,
                }                
            },false)
        }else{
            const {email, password} = formState.inputs;
            setFormData({
                email,password     
            }, (formState.inputs.email.isValid && formState.inputs.password.isValid))
        }
        setIsLogin(prevMode => !prevMode)
    }


    const authSubmitHandler = async (e)=> {
        e.preventDefault();
        setLoading(true);
        if(!isLogin){
            try {
                const res = await fetch('http://localhost:5000/api/users/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value,
                    })
                })
                const responseData = await res.json();
                if(!res.ok){
                    throw new Error(responseData.message)
                }
                console.log(responseData);
                setLoading(false);
                login()

            } catch(err){
                setLoading(false);
                console.log(err);
                setError(err.message || 'Something went wrong, please try again.')
            }
        }else {
            try {
                const res = await fetch('http://localhost:5000/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value,
                    })
                })
                const responseData = await res.json();
                if(!res.ok){
                    throw new Error(responseData.message)
                }
                // console.log(responseData);
                setLoading(false);
                login()

            } catch(err){
                setLoading(false);
                // console.log(err);
                setError(err.message || 'Something went wrong, please try again.')
            }
        }
        
        console.log(formState);
    }


    const errorHandler = ()=> {
        setError(null)
    }

  return (
    <>
    <ErrorModal error={error} onClear={errorHandler}/>
    <Card className='authentication'>
        {loading && <LoadingSpinner asOverlay />}
    <form>
        {
            !isLogin && <Input
            label='Name'
            id ='name'
            element='input'
            type='text'
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
           />
        }
        <Input
         label='Email'
         id ='email'
         element='input'
         type='text'
         validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
         onInput={inputHandler}
        />
        <Input
         label='Password'
         id ='password'
         element='input'
         type='password'
         validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
         onInput={inputHandler}
        />

        <Button type='submit' onClick={authSubmitHandler} disabled={!formState.isValid}>{!isLogin ? 'SIGN UP' : 'LOGIN'}</Button>
    </form>
    <Button inverse onClick={formSwitchHandler}>SWITCH TO {isLogin ? 'SIGN UP' : 'LOGIN'}</Button>
    </Card>
    </>
  )
}

export default Auth