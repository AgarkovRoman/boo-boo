import React, { useEffect, useState } from 'react'
import { VscAdd } from 'react-icons/vsc'
import classes from './AddProject.module.scss'
import { Button } from '../../../common/UI/Button/Button'
import { ProjectI } from '../../../redux/projects/projects-types'
import { projectsAPI } from '../../../api/api'

interface AddProjectPropsI {
  shouldShow?: boolean
  userId: string
}

export const AddProject: React.FC<AddProjectPropsI> = ({ shouldShow = false }) => {
  const [show, setShow] = useState<boolean>(shouldShow)
  const [project, setProject] = useState<ProjectI>({
    name: '',
    description: '',
    id: '',
  })

  const { refetch } = projectsAPI.useGetAllProjectsByIdQuery('')
  const [addProject, { data: addProjectResponse, isLoading }] = projectsAPI.useAddProjectMutation()

  const handleAddProject = (item: ProjectI) => {
    addProject(item)
    setProject({ ...project, name: '' })
    setShow(false)
  }

  useEffect(() => {
    if (!isLoading && addProjectResponse) {
      refetch()
    }
  }, [addProjectResponse, isLoading])

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
          <span className={classes.plus}>
            <VscAdd />
          </span>
          <span className={classes.text}>Add Project</span>
        </div>
      )}

      {show && (
        <>
          <div className={classes.input} data-testid="add-project-inner">
            <input
              value={project.name}
              onChange={(e) => setProject({ ...project, name: e.target.value })}
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
              onClick={() => handleAddProject(project)}
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
