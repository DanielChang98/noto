//functions for user authentication

import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  //function for sign up
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password) 
  }

  //function for login
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }
  //function for logout
  function logout() {
    return auth.signOut()
  }
  //function for sending reset password email
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }
  //function for updating name
  function updateProfile(name) {
    return currentUser.updateProfile({
      displayName: name
    })
  }

  //function for updating password
  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  //only run once, set current user
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
    updateProfile,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
