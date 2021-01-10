import React, { useState } from 'react'
import classes from './AddProject.module.scss'
import { firebase } from '../../firebase'
import { generatePushId } from '../../helpers/helpers'
import { useProjectsValue } from '../../context'
import { Button } from '../UI/Button/Button'

export const AddProject = ({ shouldShow = false }) => {
  const [show, setShow] = useState(shouldShow)
  const [projectName, setProjectName] = useState('')

  const projectId = generatePushId()
  const { projects, setProjects } = useProjectsValue()

  const addProject = () =>
    projectName &&
    firebase
      .firestore()
      .collection('projects')
      .add({
        projectId,
        name: projectName,
        userId: 'RM6FGvtHAMviaIDJNas',
      })
      .then(() => {
        setProjects([...projects])
        setProjectName('')
        setShow(false)
      })

  return (
    <div className={classes.wrapper} data-testid="add-project">
      {!show && (
        <div
          className={classes.addProject}
          aria-label="Add Project"
          data-testid="add-project-action"
          onClick={() => setShow(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') setShow(true)
          }}
          role="button"
          tabIndex={0}
        >
          <span className={classes.plus}>+</span>
          <span className={classes.text}>Add Project</span>
        </div>
      )}

      {show && (
        <>
          <div className={classes.input} data-testid="add-project-inner">
            <input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className={classes.name}
              data-testid="project-name"
              type="text"
              placeholder="Name your project"
            />
          </div>

          <div className={classes.buttons}>
            <Button
              color="primary"
              label="Add Project"
              onClick={addProject}
              dataTestId="add-project-submit"
            />
            <Button
              color="transparent"
              label="Cancel"
              onClick={() => setShow(false)}
              dataTestId="hide-project-overlay"
            />
          </div>
        </>
      )}
    </div>
  )
}
