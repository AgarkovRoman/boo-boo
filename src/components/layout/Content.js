import React from 'react'
import { Sidebar } from './Sidebar/Sidebar'
import { Tasks } from '../Tasks/Tasks'

export const Content = () => (
  <section className="content">
    <Sidebar />
    <Tasks />
  </section>
)
