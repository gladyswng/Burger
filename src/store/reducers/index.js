import { combineReducers } from 'redux'
import burgerBuilderReducer from './burgerBuilder'

export default combineReducers({
  burgerBuilder: burgerBuilderReducer

})
