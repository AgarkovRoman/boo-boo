import React, { useEffect } from 'react'
import './App.scss'
import 'normalize.css'
import { useDispatch } from 'react-redux'
import { AppRouter } from './routes/AppRouter'
import { authMeTC } from './redux/auth/auth-reducer'

export const App: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authMeTC())
  })

  return <AppRouter />
}
