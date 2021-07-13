//Auth context file to provide Auth provider to all the components in the main App

import React, { useContext, useState, useEffect } from "react"
import { auth } from "../../../firebase"// using firebase to provide auth

const AuthContext = React.createContext()// creating new context

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)//signup auth function
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)//login auth function
  }

  function logout() {
    return auth.signOut()//logout auth function
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email) //reset password support by firebase
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email) //update email support by firebase
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)  //update password support by firebase
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }


  //Export the AuthContext for other components to inherit in the App.js
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
