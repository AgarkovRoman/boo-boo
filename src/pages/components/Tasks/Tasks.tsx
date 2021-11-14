import React, { useEffect, useState } from 'react'
import './Tasks.scss'
import { useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid'
import { collatedTasks } from '../../../constants/collatedTasks'
import { getTitle, getCollatedTitle, collatedTasksExist } from '../../../helpers/helpers'
import { AddTask } from '../AddTask/AddTask'
import { getActiveProject } from '../../../redux/projects/projects-selectors'
import { ProjectsStateI } from '../../../redux/projects/projects-types'
import { TaskI } from '../../../redux/tasks/tasks-types'
import { Task } from '../Task/Task'
import { projectsAPI, tasksAPI } from '../../../api/api'

export const Tasks: React.FC = () => {
  const [selectedProjectTasks, setSelectedProjectTasks] = useState<TaskI[]>([])
  const selectedProject = useSelector((state: ProjectsStateI) => getActiveProject(state))
  const { data: projects } = projectsAPI.useGetAllProjectsByIdQuery('')
  const { data: tasks, refetch } = tasksAPI.useGetAllTasksByIdQuery('')

  const createProjectName = () => {
    let name = ''
    if (
      projects &&
      projects.length > 0 &&
      selectedProject &&
      !collatedTasksExist(selectedProject)
    ) {
      name = getTitle(projects, selectedProject)
    }

    if (collatedTasksExist(selectedProject) && selectedProject) {
      name = getCollatedTitle(collatedTasks, selectedProject)
    }

    return name
  }

  const getFilteredTasks = (allTasks: Array<TaskI>, selectProjectId: string) =>
    allTasks.filter((task: TaskI) => task.projectId === selectProjectId && !task.archived)

  const projectName = createProjectName()

  useEffect(() => {
    document.title = `BOO—BOO: ${projectName} tasks`
  }, [projectName])

  useEffect(() => {
    if (tasks) {
      const projectTasks = getFilteredTasks(tasks, selectedProject)
      setSelectedProjectTasks(projectTasks)
    }
  }, [tasks, selectedProject])

  return (
    <div className="tasks" data-testid="tasks">
      <h2 data-testid="project-name">{projectName}</h2>

      {tasks && selectedProjectTasks.length > 0 && (
        <ul className="tasks__list">
          {selectedProjectTasks.map((task) => (
            <Task
              key={uuid()}
              id={task.id}
              name={task.name}
              archived={task.archived}
              projectId={selectedProject}
              date={task.date}
              description={task.description}
              refetch={refetch}
            />
          ))}
        </ul>
      )}

      <AddTask />

      {selectedProjectTasks.length === 0 && (
        <>
          <div className="tasks__done" />
          <div className="tasks__done-text" data-testid="task-not-found">
            All tasks are done! Nice work!
          </div>
        </>
      )}
    </div>
  )
}
