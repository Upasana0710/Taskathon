import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../utils/init-firebase'
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail,
    confirmPasswordReset,
} from 'firebase/auth'

const AuthContext = createContext({
    currentUser: null,
    register: () => Promise,
    login: () => Promise,
    logout: () => Promise,
    forgotpassword: () => Promise,
    resetPassword: () => Promise,
})

export const useAuth = () => useContext(AuthContext)

export default function AuthContextProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
          setCurrentUser(user ? user : null)
        })
        return () => {
          unsubscribe()
        }
      }, [])
    function register(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
      }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
      }

      function logout() {
        return signOut(auth)
      }
      function forgotpassword(email) {
        return sendPasswordResetEmail(auth, email, {
          url: `http://localhost:3000`,
        })
      }
      function resetPassword(oobCode, newPassword) {
        return confirmPasswordReset(auth, oobCode, newPassword)
      }

    const value = {
        currentUser,
        register,
        login,
        logout,
        forgotpassword,
        resetPassword,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
