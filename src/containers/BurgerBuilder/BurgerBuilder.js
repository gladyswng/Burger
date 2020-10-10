import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
// import { onIngredientAdded, onIngredientRemoved } from '../../store/actions'

// import { NavLink, useHistory, withRouter } from 'react-router-dom'
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";




const BurgerBuilder = (props) => {
  const [ purchasing, setPurchasing ] = useState(false)

  useEffect(() => {
    props.initIngredients() 
  }, [])



  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0 
  }

  // purchaseHandler = () => {
  //   //query params before redux
  //   this.props.history.push('/checkout')
  // };


  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true)

    } else {
      props.setAuthRedirectPath('/checkout')
      props.history.push('/auth')
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false)
    
}

  const purchaseContinueHandler = () => {
    props.purchaseInit()
    props.history.push('/checkout')
}

    const disabledInfo = {
      ...props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    // {salad: true, meat: false}

    let orderSummary = null;

    // Since Modal trigges by shouldComponentUpdate -- only updates when show is true, need to add more condition there at Modal.js

    let burger = props.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );
    // Overwrite when this.state.ingredients is not null
    if (props.ings) {

      burger = (
        <Aux>
          <Burger ingredients={props.ings} />
          <BuildControls
            ingredientAdded={props.addIngredient}
            ingredientRemoved={props.removeIngredient}
            disabled={disabledInfo}
            price={props.price}
            purchasable={updatePurchaseState(props.ings)}
            ordered={purchaseHandler}
            isAuth={props.isAuthenticated}
          />
        </Aux>

        // This is for setting ingredients to null since we changed to firebase
      )
    
      orderSummary = (
        <OrderSummary
          ingredients={props.ings}
          price={props.price}
          purchaseCancelled={purchaseCancelHandler}
          purchaseContinued={purchaseContinueHandler}
        />
      );

    }
    // This is to overwrite

    return (
      <Aux>
        <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
            {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
}


export default connect(mapStateToProps, actions)(withErrorHandler(BurgerBuilder, axios))

