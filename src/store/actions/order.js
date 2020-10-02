import * as actionTypes from './types'
import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  }
}

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}

export const purchaseBurger = (orderData) => dispatch => {
  dispatch(purchaseBurgerStart())
  axios
  .post("/orders.json", orderData)
  .then(response => {
    dispatch(purchaseBurgerSuccess(response.data.name, orderData))
  })
  .catch(error => {
    dispatch(purchaseBurgerFail(error))
  })
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  }
}

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  }
}

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}

export const fetchOrders = () => dispatch => {
  dispatch(fetchOrdersStart())
  axios.get('/orders.json')
  .then(res => {
    // We get back an object with IDs as properties, there for need to turn into array
    const fetchedOrders =[]
    for (let key in res.data) {
      fetchedOrders.push({
        ...res.data[key],
        id: key
      })
    }
    dispatch(fetchOrdersSuccess(fetchedOrders))

  })
  .catch(err => {
    dispatch(fetchOrdersFail(err))
  })
}