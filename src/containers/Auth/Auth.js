import React, { useState, useEffect } from 'react'


const Auth = () => {
  const [ controls, setControls ] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Name'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
  })
  return (
    <div>
      <form>

      </form>
    </div>
  )
}

export default Auth