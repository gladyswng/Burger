import React from 'react'
import { Route, Redirect, useHistory, useLocation } from 'react-router-dom'
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

  let summary = <Redirect to='/'/>
  if (props.ings) {

    const purcahsedRedirect = props.purshased? <Redirect to='/' /> : null
    summary = (
      <div>
        {purcahsedRedirect}
        <CheckoutSummary 
        ingredients={props.ings}
        checkoutCancelled={checkoutCancelledHandler}
        checkoutContinued={checkoutContinuedHandler}
        />
        <Route path='/checkout/contact-data'>
          <ContactData 
          ingredients={props.ings}/>
        </Route>
      </div>
    )
  }

  return summary
}

const mapStateToProps = state => {

  return {
    ings: state.burgerBuilder.ingredients,
    purshased: state.order.purchased
  }
}

export default connect(mapStateToProps)(Checkout)