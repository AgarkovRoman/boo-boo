import React from 'react'
import { Header } from '../components/Header/Header'
import { Content } from '../components/Content/Content'

interface BooBooPropsI {
  userId: string
}

export const BooBoo: React.FC<BooBooPropsI> = ({ userId }) => (
  <>
    <Header />
    <Content userId={userId} />
  </>
)
