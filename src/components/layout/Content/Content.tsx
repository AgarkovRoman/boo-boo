import React, { useContext } from 'react'
import classes from './Content.module.scss'
import { Sidebar } from '../Sidebar/Sidebar'
import { Tasks } from '../../Tasks/Tasks'
import { FirebaseContext } from '../../../context/firebase'

interface ContentPropsI {
  userId: string
}

export const Content: React.FC<ContentPropsI> = ({ userId }) => (
  // debugger
  <section className={classes.content} data-testid="content">
    <Sidebar userId={userId} />
    <Tasks />
  </section>
)

// export const Content: React.FC = () => (
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// const { firebase } = useContext(FirebaseContext)
// const user = firebase.auth().currentUser || {}
// console.log('user', user)
//   <section className={classes.content} data-testid="content">
//     <Sidebar userId={user.uid} />
//     <Tasks />
//   </section>
// )
