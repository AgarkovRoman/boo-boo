import React from 'react'
import { v4 as uuid } from 'uuid'
import { IndividualProject } from '../IndividualProject/IndividualProject'
import { projectsAPI } from '../../../api/api'

export const Projects: React.FC = () => {
  const { data: projects, refetch } = projectsAPI.useGetAllProjectsByIdQuery('')

  return (
    <div data-testid="all-projects">
      {projects &&
        projects.map((project) => (
          <IndividualProject key={uuid()} project={project} refetch={refetch} />
        ))}
    </div>
  )
}
