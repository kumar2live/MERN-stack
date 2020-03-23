import React, { useReducer, useEffect } from 'react';

import {validate} from '../../utils/validators';
import './InputComponent.css';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.payload,
        isValid: validate(action.payload, action.validators),
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      };
  
    default:
      return state;
  }
}

const InputComponent = (props) => {
  const [reducerState, dispatch] = useReducer(
    inputReducer, {
      value: props.initialValue || '', isValid: props.initialValidity || false, isTouched: false,
    });

  const {id, onInput} = props;
  const {value, isValid} = reducerState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, onInput, value, isValid])

  const changeHandler = event => {
    dispatch({
      type: 'CHANGE',
      payload: event.target.value,
      validators: props.validators,
    });
  };

  const blurHandler = event => {
    dispatch({
      type: 'TOUCH',
    });
  };

  const element = props.element === 'input' ?
    <input value={reducerState.value || ''} className='w-100'
      id={props.id} type={props.type} placeholder={props.placeholder} onChange={changeHandler} onBlur={blurHandler}/>
      :
    <textarea 
      value={reducerState.value || ''} className='w-100'
      id={props.id} rows={props.rows || 3} onChange={changeHandler} onBlur={blurHandler}/>;


  return (
    <React.Fragment>
      <div className={`${!reducerState.isValid && reducerState.isTouched ? 'error-form-styles' : 'form-styles'}` }>
        <label>
          {props.label}
        </label>
        <div>{element}</div>
        {!reducerState.isValid && reducerState.isTouched && <span className='error'>{props.errorText}</span>}
      </div>
    </React.Fragment>
  );
}

export default InputComponent;
