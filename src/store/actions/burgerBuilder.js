import * as actionTypes from './types'
import axios from '../../axios-orders'

export const addIngredient = (ingName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingName
  }
} 

export const removeIngredient = (ingName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingName
  }
} 

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  }
} 

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}

export const initIngredients = () => dispatch => {
    axios
    .get("https://burgerme-3c86d.firebaseio.com/ingredients.json")
    .then(response => {
      dispatch(setIngredients(response.data))
    })
    .catch(error => {
      dispatch(fetchIngredientsFailed())
    })
}
