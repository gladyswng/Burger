import React, { useEffect, Suspense } from "react";
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './store/actions'
import Layout from "./hoc/Layout/Layout";
import BugerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from './containers/Auth/Logout/Logout';
import Spinner from "./components/UI/Spinner/Spinner";
// import Checkout from './containers/Checkout/Checkout'
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth'

const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'))
const Orders = React.lazy(() => import('./containers/Orders/Orders'))

const Auth = React.lazy(() => import('./containers/Auth/Auth'))


const App = (props) =>  {
  useEffect(() => {
    props.authCheckState()
  })

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth}/>
      <Route path="/" exact component={BugerBuilder} />
      <Redirect to="/" />
    </Switch>
  )
  

  if (props.isAuthenticated) {
    routes = (
      <Switch>

        <Route path="/checkout" component={Checkout}/>
        <Route path="/orders" component={Orders}/>
        <Route path="/logout" exact component={Logout}/>
        <Route path="/auth" component={Auth}/>

        <Route path="/" exact component={BugerBuilder}/>
        <Redirect to="/" />
      </Switch>
    )
  }
    return (
      <div>
        <Layout>
          <Suspense fallback={<div><Spinner /></div>}>

            {routes}
          </Suspense>
    
        </Layout>
      </div>
    );

}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps, actions)(App);
