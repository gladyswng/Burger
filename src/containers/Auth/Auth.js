import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.css'
import * as actions from '../../store/actions'
import Spinner from '../../components/UI/Spinner/Spinner'
import { checkValidity } from '../../shared/utility'

const Auth = (props) => {
  const [ isSignup, setIsSignedup ] = useState(true) 
  const [ controls, setControls ] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email Address'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password'
      },
      value: '',
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    },
  })

  useEffect(() => {
    if (!props.buildingBurger && props.authRedirectPath !== '/') {
      props.setAuthRedirectPath('/')
    }
  }, [])
  

  const inputChangeHandler = (e, controlName) => {
    e.persist()
    const updatedControls = {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value: e.target.value,
        valid: checkValidity(e.target.value, controls[controlName].validation),
        touched: true
      }
    }
    setControls(updatedControls)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    props.auth(controls.email.value, controls.password.value, isSignup)
  }

  const formElementsArray = []
  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key]
    })
  }

  const switchAuthModeHandler = () => {
   
    setIsSignedup(!isSignup)
  }

  let form = formElementsArray.map(formElement => (
    <Input 
      key={formElement.id}
      elementType={formElement.config.elementType} 
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      shouldValidate={formElement.config.validation}
      invalid={!formElement.config.valid}
      touched={formElement.config.touched}
      changed={(e ) => inputChangeHandler(e, formElement.id)}
    />
    
  
  ))

  if (props.loading) {
    form = <Spinner />
  }

  let errorMessage = null
  if (props.error) {
    errorMessage =(
      <p>{props.error.message}</p>
    )
  }
  let authRedirect = null

  if (props.isAuthenticated) {

    authRedirect = <Redirect to={props.authRedirectPath} />
  }
  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
  
        <Button btnType="Success">SUBMIT</Button>

      </form>

      <Button 
        btnType="Danger"
        clicked={switchAuthModeHandler}
        >SWITCH TO {isSignup? 'SIGNIN' : 'SIGNUP'}
      </Button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath

  }
}

export default connect(mapStateToProps, actions)(Auth)