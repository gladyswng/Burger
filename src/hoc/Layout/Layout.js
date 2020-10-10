import React, { useState } from "react";
import { connect } from 'react-redux'
import Aux from "../Aux/Aux";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {
  // state = {
  //   showSideDrawer: false
  // };
  const [ showSideDrawer, setShowSlideDrawer ] = useState(false)


  const sideDrawerClosedHandler = () => {
    setShowSlideDrawer(false)
    // this.setState( { showSideDrawer: false } );
  }

  const sideDrawerToggleHandler = () => {
  setShowSlideDrawer(!showSideDrawer)
    // this.setState( ( prevState ) => {
    //     return { showSideDrawer: !prevState.showSideDrawer };
    // } );
}

  //this.setState({ showSideDrawer: !this.state.showSideDrawer });
  // Due to the asynchronous nature of set state, you'll get unexpected outcomes
  
 
 
    return (
      <Aux>
        <Toolbar 
        isAuth={props.isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler} />
        <SideDrawer
            isAuth={props.isAuthenticated}
            open={showSideDrawer}
            closed={sideDrawerClosedHandler} />
        <main className={classes.Content}>
            {props.children}
        </main>
      </Aux>
    );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout)
