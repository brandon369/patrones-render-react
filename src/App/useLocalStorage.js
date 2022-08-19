import React from 'react';

function useLocalStorage(itemName, initialValue) {


  const [state, dispatch] = React.useReducer(reducer, initialState({initialValue}));

  const {
    sincronizedItem,
    error,
    loading,
    item
  } = state

  // const [sincronizedItem, setSincronizedItem] = React.useState(true);
  // const [error, setError] = React.useState(false);
  // const [loading, setLoading] = React.useState(true);
  // const [item, setItem] = React.useState(initialValue);

  const onError = (error) => {
    dispatch({type: actionTypes.error, payload: error})
  }
  const onSuccess = (parsedItem) => {
    dispatch({type: actionTypes.success, payload: parsedItem})
  }

  const onSave = (item) => {
    dispatch({type: actionTypes.save, payload: item})
  }

  const onSincronize = () => {
    dispatch({type: actionTypes.sincronize})
  }
  React.useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;

        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
        }

        // setItem(parsedItem);
        // setLoading(false);
        // setSincronizedItem(true)

        onSuccess(parsedItem)

      } catch (error) {
        onError(error)
        // setError(error);
      }
    }, 3000);
  }, [sincronizedItem]);

  const saveItem = (newItem) => {
    try {
      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifiedItem);

      // setItem(newItem);
      onSave(newItem)
    } catch (error) {
      // setError(error);
      onError(error)
    }
  };

  const sincronize = () => {
    onSincronize()
    // setLoading(true)
    // setSincronizedItem(false)
  }

  return {
    item,
    saveItem,
    loading,
    error,
    sincronize
  };

}

const initialState = ({initialValue}) => ({
  sincronizedItem: true,
  error: false,
  loading: true,
  item: initialValue
})

const actionTypes = {
  error: 'ERROR',
  success: 'SUCCESS',
  save: 'SAVE',
  sincronize: 'SINCRONIZE',
}

const reducerObject = (state, payload) => ({
  [actionTypes.error]: {
    ...state,
    error: true
  },

  [actionTypes.success]: {
    ...state,
    error: false,
    loading: false,
    sincronizedItem: true,
    item: payload
  },
  [actionTypes.save]: {
    ...state,
    item: payload
  },
  [actionTypes.sincronize]: {
    ...state,
    sincronizedItem: false,
    loading: true,
  },

})

const reducer = (state, action) => {
  return  reducerObject(state, action.payload)[action.type] || state
}


export {useLocalStorage};
