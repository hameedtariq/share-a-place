import React, { useEffect, useReducer } from 'react'
import './Input.css'
import { validate } from '../../../util/validators';

const inputReducer = (state, action) => {
    switch(action.type){
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators),
            };
        case 'TOUCH':
            return {
                ...state,
                isTouched: true,
            }
        default:
            return state;
    }
}


const Input = (props) => {
    const [inputState, dispatch] = useReducer(inputReducer, {value:'',isValid:false, isTouched: false})

    const {onInput, id} = props;
    const {value, isValid} = inputState;

    useEffect(()=> {
        onInput(id,value,isValid);
    }, [onInput,id,isValid, value])


    const changeHandler = (e) => {
        dispatch({
            type: "CHANGE",
            val: e.target.value,
            validators: props.validators
        })
    }

    const onTouch = ()=> {
        dispatch({
            type: "TOUCH",
        })
    }
    
    const element = props.element === 'input' ? (
        <input id={props.id} type={props.type} placeholder={props.placeholder} value={inputState.val} onChange={changeHandler} onBlur={onTouch}/>
    ) : <textarea id={props.id} rows={props.rows || 3} value={inputState.val} onChange={changeHandler} onBlur={onTouch}/>
  return (
    <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
        <label htmlFor={props.id}>{props.label}</label>
        {element}
        {!inputState.isValid && inputState.isTouched && <p className=''>{props.errorText}</p>}
    </div>
  )
}

export default Input