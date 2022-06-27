import React, { useContext } from 'react'
import { useState } from 'react'
import Button from '../../shared/components/FormElements/Button/Button'
import Input from '../../shared/components/FormElements/Input/Input'
import Card from '../../shared/components/UIElements/Card/Card'
import AuthContext from '../../shared/context/auth-context'
import { useForm } from '../../shared/hooks/form-hook'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import './Auth.css'
const Auth = () => {
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


    const authSubmitHandler = (e)=> {
        e.preventDefault();
        login()
        console.log(formState);
    }
  return (
    <Card className='authentication'>
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
  )
}

export default Auth