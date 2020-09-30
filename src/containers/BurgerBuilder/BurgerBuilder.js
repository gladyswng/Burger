import React, { Component } from "react";
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
// import { onIngredientAdded, onIngredientRemoved } from '../../store/actions'

import { NavLink, useHistory, withRouter } from 'react-router-dom'
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";




class BurgerBuilder extends Component {
  state = {
    purchasing: false
  }
  

  componentDidMount() {
    console.log(this.props)
    this.props.initIngredients 
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0 
  }

  purchaseHandler = () => {
    //query params before redux
    this.props.history.push('/checkout')
  };

  render() {
    console.log(this.props.ings)
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    // {salad: true, meat: false}

    let orderSummary = null;

    // Since Modal trigges by shouldComponentUpdate -- only updates when show is true, need to add more condition there at Modal.js

    let burger = this.state.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );
    // Overwrite when this.state.ingredients is not null
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.addIngredient}
            //test
            ingredientRemoved={this.props.removeIngredient}
          
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Aux>

        // This is for setting ingredients to null since we changed to firebase
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

    // This is to overwrite

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
            {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  }
}


export default connect(mapStateToProps, actions)(withErrorHandler(BurgerBuilder, axios))

