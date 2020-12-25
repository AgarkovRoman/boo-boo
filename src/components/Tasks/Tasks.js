import React, {useEffect} from "react";
import {Checkbox} from "../UI/Checkbox/Checkbox";
import './Tasks.scss'
import {useTasks} from "../../hooks";
import {collatedTasks} from "../../constants/collatedTasks";
import {getTitle, getCollatedTitle, collatedTasksExist} from "../../helpers/helpers";
import {useSelectedProjectsValue, useProjectsValue} from "../../context";
import {AddTask} from "../AddTask/AddTask";

export const Tasks = () => {
    const {selectedProject} = useSelectedProjectsValue()
    const {projects} = useProjectsValue()
    const {tasks} = useTasks(selectedProject)

    let projectName = '';

    if (projects && projects.length > 0 && selectedProject && !collatedTasksExist(selectedProject)) {
        projectName = getTitle(projects, selectedProject).name
        // console.log('1', projectName)
    }

    if (collatedTasksExist(selectedProject) && selectedProject) {
        projectName = getCollatedTitle(collatedTasks, selectedProject).name
        // console.log('2', projectName)
    }

    useEffect(() => {
        document.title = `${projectName}: Todoist`;
    }, [projectName])

    return (
        <div className='tasks' data-testid='tasks'>
            <h2 data-testid='project-name'>{projectName}</h2>

            {tasks.length > 0 &&
                <ul className='tasks__list'>
                    {tasks.map(task => (
                        <li key={`${task.id}`} data-testid='task'>
                            <Checkbox id={task.id} taskDesc={task.task}/>
                            <span>{task.task}</span>
                        </li>
                    ))}
                </ul>}

            <AddTask/>

            {tasks.length === 0 && <>
                <div className={'tasks__done'}/>
                <div className={'tasks__done-text'} data-testid='task-not-found'>All tasks are done! Nice work!</div>
            </>}

        </div>
    )
}
