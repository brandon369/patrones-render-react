import React, {useState} from "react";


function withStorageListener(WrappedComponent) {
  return function WrappedComponentWithStorageListener(props) {

    const [storageChange, setStorageChange] = useState(false);


    window.addEventListener('storage', (change) => {
      console.log('hey')
      if (change.key === 'TODOS_V1') {
        console.log('Epa la arepa')
        setStorageChange(true)
      }
    })

    const toggleShow = () => {
      props.sincronize()
      setStorageChange(false)
    }

    return (
      <WrappedComponent
        show={storageChange}
        toggleShow={toggleShow}
      />
    )
  }


}


export {withStorageListener}
