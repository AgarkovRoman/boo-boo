import React from 'react'
import { Header } from '../../layout/Header/Header'
import { Content } from '../../layout/Content/Content'

interface BooBooPropsI {
  userId: string
}

export const BooBoo: React.FC<BooBooPropsI> = ({ userId }) => (
  <>
    <Header />
    <Content userId={userId} />
  </>
)
