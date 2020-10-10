import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions'


const Logout = (props) => {
  useEffect(() => {
    props.logout()

  }, [])
  return (
    <Redirect to="/" />
  )
}


export default connect(null, actions)(Logout)