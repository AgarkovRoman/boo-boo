import React from 'react'
import { useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid'
import { IndividualProject } from '../IndividualProject/IndividualProject'
import { getAllProjects } from '../../redux/projects/projects-selectors'
import { ProjectsStateI } from '../../redux/projects/projects-types'

export const Projects: React.FC = () => {
  const projects = useSelector((state: ProjectsStateI) => getAllProjects(state))

  return (
    <>
      {projects && projects.map((project) => <IndividualProject key={uuid()} project={project} />)}
    </>
  )
}
