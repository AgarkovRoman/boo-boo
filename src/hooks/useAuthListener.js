import { useState, useEffect, useContext } from 'react'
import { FirebaseContext } from '../context/firebase'
import { getUser } from '../helpers/helpers'

export function useAuthListener() {
  const [user, setUser] = useState(getUser())

  const { firebase } = useContext(FirebaseContext)

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        localStorage.setItem('authUser', JSON.stringify(authUser))
        setUser(authUser)
      } else {
        localStorage.removeItem('authUser')
        setUser(null)
      }
    })
    console.log('user', user)
    return () => listener()
  }, [])

  return { user }
}
