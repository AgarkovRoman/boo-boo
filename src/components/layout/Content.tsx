import React from 'react'
import { Sidebar } from './Sidebar/Sidebar'
import { Tasks } from '../Tasks/Tasks'

export const Content: React.FC = () => (
  <section className="content" data-testid="content">
    <Sidebar />
    <Tasks />
  </section>
)
