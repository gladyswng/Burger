import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { useHistory } from 'react-router-dom'
import axios from "../../../axios-orders"
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import classes from './ContactData.css'

const ContactData = (props) => {
  const history = useHistory()
  const [ formIsValid, setFormIsValid ] = useState()
  console.log(formIsValid)
  const [ orderForm, setOrderForm ] = useState({
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
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Street'
      },
      value: '',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5
      },
      valid: false,
      touched: false
    },
    zipCode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'ZIP Code'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Country'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          {value: 'fastest', displayValue: 'Fastest'},
          {value: 'cheapest', displayValue: 'Cheapest'}
        ]
      },
      value: 'fastest',
      validation: {},
      valid: true
    }
  })

  const [ loading, setLoading ] = useState(false)



  const checkValidity = (value, rules) => {
    let isValid = true
    if (rules.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }
    return isValid



  }
  const orderHandler = (e) => {
    e.preventDefault()

    setLoading(true);
    console.log(props.price)
    const formData = {}
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value
    }

    
    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData
    }

    axios
      .post("/orders.json", order)
      .then(response => {
        setLoading(false)
        history.push('/')
      })
      .catch(error => {
        setLoading(false)
      });
  }

  useEffect(() => {
    // here another solution by max in input loop
    // let formIsValid = true
    // for (let inputIdentifier in updatedOrderForm) {
    //   formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
    // }
    const formIsValid = Object.keys(orderForm).every(
      (el) => orderForm[el].valid
    );
    setFormIsValid(formIsValid)
  }, [orderForm])

  const inputChangeHandler = (e, inputIndentifier) => {
    e.persist()
    console.log(e.target.value)
  
    setOrderForm((prevOrderForm) => {
      const updatedOrderForm = {...prevOrderForm}
   
      // WHATS WITH THE DEEP CLONING
      // updatedOrderForm[inputIndentifier].value = e.target.value
      // return updatedOrderForm

      const updatedFormElement = {
        ...prevOrderForm[inputIndentifier]
      }
      updatedFormElement.value = e.target.value
      updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)
      updatedFormElement.touched = true
      console.log(updatedFormElement)

      updatedOrderForm[inputIndentifier] = updatedFormElement
      

      return updatedOrderForm
    })
  }


  const formElementsArray = []
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key]
    })
  }

  let form = (
    <form onSubmit={orderHandler}>
        {formElementsArray.map(formElement => {
          return <Input 
          key={formElement.id}
          elementType={formElement.config.elementType} 
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          shouldValidate={formElement.config.validation}
          invalid={!formElement.config.valid}
          touched={formElement.config.touched}
          changed={(e ) => inputChangeHandler(e, formElement.id)}
          />
        })}
        
        <Button 
        btnType="Success"
        disabled={!formIsValid}
        >ORDER</Button>
      </form>
  )
  if (loading) {
    form = <Spinner />
  } 


  return (
    <div className={classes.ContactData}>

      <h4>Enter you Contact Data</h4>
      {form}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    price: state.burgerBuilder.totalPrice
  }
}

export default connect(mapStateToProps)(ContactData)

