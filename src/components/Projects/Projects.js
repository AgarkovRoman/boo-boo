import React from 'react'
import { useSelector } from 'react-redux'
import uuid from 'react-uuid'
import { IndividualProject } from '../IndividualProject/IndividualProject'
import { getAllProjects } from '../../redux/projects-selectors'

export const Projects = () => {
  const projects = useSelector((state) => getAllProjects(state))

  return projects && projects.map((project) => <IndividualProject key={uuid()} project={project} />)
}
