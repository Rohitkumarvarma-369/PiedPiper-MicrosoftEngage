//This File enables us to use PrivateRoute to enforce auth condition on all the routes by directly using this in the main App for all the routes
import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "./LoginContexts/AuthContext"

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : <Redirect to="/login" />//condition which redirects a user to the login page if the user is not logged in
      }}
    ></Route>
  )
}
