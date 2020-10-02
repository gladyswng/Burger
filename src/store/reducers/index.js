import { combineReducers } from 'redux'
import burgerBuilderReducer from './burgerBuilder'
import orderReducer from './order'

export default combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer
})
