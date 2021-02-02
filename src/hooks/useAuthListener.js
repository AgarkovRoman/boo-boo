import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../helpers/helpers'
import { authAPI } from '../api/api'
import { authMeThunkCreator } from '../redux/auth-reducer'

export const useAuthListener = () => {
  const [user, setUser] = useState(getUser())

  const auth = (authUser) => {
    if (authUser) {
      localStorage.setItem('authUser', JSON.stringify(authUser))
      setUser(authUser)
    } else {
      localStorage.removeItem('authUser')
      setUser(null)
    }
  }

  const dispatch = useDispatch()

  useEffect(() => {
    const listener = authAPI.authMe(auth)
    dispatch(authMeThunkCreator())
    return () => listener()
  }, [])

  return { user }
}
