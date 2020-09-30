import React from "react";
import classes from "./NavigationItem.css";
import { NavLink } from 'react-router-dom'

const navigationItem = props => (
  <li className={classes.NavigationItem}>
    <NavLink 
      to={props.link} // as long as path starts with props.link this link is treated to be acitve, there for "exact" from parent
      exact={props.exact}
      activeClassName={classes.active}
      // className={props.active ? classes.active : null}
      // We no longer need this after navlink isince we dont have to defined if its active or not, it will automatically determine this since the NavLink automatically attaches a class named active, it is set up in css in Navigation.css, but css module will take our class names and convert them into unique class names, there for it wont work without the activeClassName
    >
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;
