import { useCallback, useReducer } from 'react';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let isFormValid = true;
      for (const input in state.inputs) {
        if (input === action.inputId) {
          isFormValid = isFormValid && action.isValid;
        } else {
          isFormValid = isFormValid && state.inputs[input].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {value: action.value, isValid: action.isValid},
        },
        isValid: isFormValid,
      }
  
    case 'SET_DATA':
      return {
        ...state,
        inputs: action.inputs,
        isValid: action.isValid,
      }
    default:
      return state;
  }
}

export const useAppFormHook = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(
    formReducer, {
      inputs: initialInputs,
      isValid: initialFormValidity,
    });

  const inputChangeHandler = useCallback((id, value, isValid) => {
      dispatch({
        type: 'INPUT_CHANGE',
        value: value,
        inputId: id,
        isValid: isValid,
      });
    }, [dispatch]);

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: 'SET_DATA',
      inputs: inputData,
      isValid: formValidity,
    })
  }, [dispatch])

  return [
    formState, inputChangeHandler, setFormData,
  ];
}

