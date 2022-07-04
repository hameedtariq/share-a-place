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
import { useHttpClient } from '../../shared/hooks/http-hook'
import ImageUpload from '../../shared/components/FormElements/ImageUpload/ImageUpload'

const Auth = () => {
    const {loading, error, sendRequest, clearError} = useHttpClient();

    
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
                },
                image: {
                    value: null,
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
        
        if(!isLogin){
            try {
                const formData = new FormData();
                formData.append('name', formState.inputs.name.value);
                formData.append('email', formState.inputs.email.value);
                formData.append('password', formState.inputs.password.value);
                formData.append('image', formState.inputs.image.value);

                const resData = await sendRequest(
                    'http://localhost:5000/api/users/signup',
                    'POST',
                    formData
                )
                login(resData.userId,resData.token);

            } catch(err){}
        }else {
            try {
                const resData = await sendRequest(
                    'http://localhost:5000/api/users/login',
                    'POST',
                    JSON.stringify({
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value,
                    }),
                    {
                        'Content-Type': 'application/json',
                    }
                )
                login(resData.userId,resData.token)

            } catch(err){}
        }
        
        console.log(formState);
    }

  return (
    <>
    <ErrorModal error={error} onClear={clearError}/>
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

        {
            !isLogin && <ImageUpload center id='image' onInput={inputHandler}/>
        }

        <Button type='submit' onClick={authSubmitHandler} disabled={!formState.isValid}>{!isLogin ? 'SIGN UP' : 'LOGIN'}</Button>
    </form>
    <Button inverse onClick={formSwitchHandler}>SWITCH TO {isLogin ? 'SIGN UP' : 'LOGIN'}</Button>
    </Card>
    </>
  )
}

export default Auth