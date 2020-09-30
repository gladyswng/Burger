import React, { useEffect, useState } from 'react'
import { Route, useHistory, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

const Checkout = (props) => {
  const history = useHistory()
  const location = useLocation()
  // const [ingredients, setIngredients] = useState(null)
  // const [ totalPrice, setTotalPrice ] = useState(0)

  // useEffect(() => {
  //   // const query = new URLSearchParams(location.search)

  // }, [])

  const checkoutCancelledHandler = () => {
    history.goBack()
  } 

  const checkoutContinuedHandler = () => {
    history.replace('/checkout/contact-data')
  }

  return (
    <div>
      {props.ings && 
      <React.Fragment>
      <CheckoutSummary 
      ingredients={props.ings}
      checkoutCancelled={checkoutCancelledHandler}
      checkoutContinued={checkoutContinuedHandler}
      />

       <Route path='/checkout/contact-data'>
        <ContactData 
        ingredients={props.ings}
    
        />
      </Route>


      {/* <Route path='/checkout/contact-data' 
      component={ContactData}/> */}
      </React.Fragment>}
    </div>

  )
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients
  }
}

export default connect(mapStateToProps)(Checkout)