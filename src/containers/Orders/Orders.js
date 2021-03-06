import React, { useEffect } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import Spinner from '../../components/UI/Spinner/Spinner'



const Orders = (props) => {

  
  useEffect(() => {
    props.fetchOrders(props.token, props.userId)
  }, [])

  let orders = <Spinner />
  if (!props.loading) {
    orders = (
      <React.Fragment>
      {props.orders.map(order => {
        return <Order 
        key={order.id}
        ingredients={order.ingredients}
        price={+order.price}
        />
      })}
      
    
    </React.Fragment>
    )
  }
  return (
    <div>
      {orders}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

export default connect(mapStateToProps, actions)(withErrorHandler(Orders, axios))