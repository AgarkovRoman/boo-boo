import React from 'react'
import { Sidebar } from './Sidebar/Sidebar'
import { Tasks } from '../Tasks/Tasks'

interface ContentPropsI {
  userId: string
}

export const Content: React.FC<ContentPropsI> = ({ userId }) => (
  <section className="content" data-testid="content">
    <Sidebar userId={userId} />
    <Tasks />
  </section>
)
