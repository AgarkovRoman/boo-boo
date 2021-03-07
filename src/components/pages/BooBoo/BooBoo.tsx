import React from 'react'
import { useSelector } from 'react-redux'
import { Header } from '../../layout/Header/Header'
import { Content } from '../../layout/Content/Content'
import { getUserId } from '../../../redux/auth/auth-selectors'
import { AuthStateI } from '../../../redux/auth/auth-types'

interface BooBooPropsI {
  userId: string
}

export const BooBoo: React.FC<BooBooPropsI> = ({ userId }) => (
  // const userId = useSelector((state: AuthStateI) => getUserId(state))
  //
  // const isUserExist = (id: number | string) => !id || id !== ''

  <>
    {/* {isUserExist(userId) ? ( */}
    {/*  <> */}
    <Header />
    <Content userId={userId} />
    {/*  </> */}
    {/* ) : ( */}
    {/*  <h1>Loading...</h1> */}
    {/* )} */}
  </>
)
