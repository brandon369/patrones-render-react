import React, {useState} from "react";


function useStorageListener(sincronize) {

  const [storageChange, setStorageChange] = useState(false);


  window.addEventListener('storage', (change) => {
    console.log('hey')
    if (change.key === 'TODOS_V1') {
      console.log('Epa la arepa')
      setStorageChange(true)
    }
  })

  const toggleShow = () => {
    sincronize()
    setStorageChange(false)
  }

  return {
    show: storageChange,
    toggleShow
  }


}


export {useStorageListener}
