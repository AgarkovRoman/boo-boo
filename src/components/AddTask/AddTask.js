import React, {useState} from 'react'
import {FaRegListAlt, FaRegCalendarAlt, FaRegTimesCircle} from "react-icons/fa"
import firebase from "firebase"
import moment from 'moment'
import './AddTask.scss'
import {useSelectedProjectsValue} from "../../context";
import {ProjectOverlay} from "../ProjectOverlay";
import {TaskDate} from "../TaskDate";
import {Button} from "../UI/Button/Button";

export const AddTask = ({
                            showAddTaskMain = true,
                            showShouldMain = false,
                            showQuickAddTask,
                            setShowQuickAddTask
                        }) => {
    const [task, setTask] = useState('')
    const [taskDate, setTaskDate] = useState('')
    const [project, setProject] = useState('')
    const [showMain, setShowMain] = useState(showShouldMain)
    const [showProjectOverlay, setShowProjectOverlay] = useState(false)
    const [showTaskDate, setShowTaskDate] = useState(false)

    const {selectedProject} = useSelectedProjectsValue()

    const addTask = () => {
        const projectId = project || selectedProject;
        let collatedDate = '';
        if (projectId === 'TODAY') {
            collatedDate = moment().format('DD/MM/YYYY')
        } else if (projectId === 'NEXT_7') {
            collatedDate = moment().add(7, 'days').format('DD/MM/YYYY')
        }

        return (
            task
            && projectId
            && firebase
                .firestore()
                .collection('tasks')
                .add({
                    archived: false,
                    projectId,
                    task,
                    date: collatedDate || taskDate,
                    userId: 'RM6FGvtHAMviaIDJNas'
                }).then(() => {
                    setTask('')
                    setProject('')
                    setShowMain('')
                    setShowProjectOverlay(false)
                })
        )
    }
    return (
        <div
            className={showQuickAddTask ? 'add-task add-task__overlay' : 'add-task'}
            data-testid="add-task-comp"
        >
            {showAddTaskMain && !showMain && (
                <div
                    className="add-task__shallow"
                    data-testid="show-main-action"
                    onClick={() => setShowMain(!showMain)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') setShowMain(!showMain);
                    }}
                    tabIndex={0}
                    aria-label="Add task"
                    role="button"
                >
                    <span className="add-task__plus">+</span>
                    <span className="add-task__text">Add Task</span>
                </div>
            )}

            {(showMain || showQuickAddTask) && (
                <div className="add-task__main" data-testid="add-task-main">
                    {showQuickAddTask && (
                        <>
                            <div data-testid="quick-add-task">
                                <h2 className="header">Quick Add Task</h2>
                                <span
                                    className="add-task__cancel-x"
                                    data-testid="add-task-quick-cancel"
                                    aria-label="Cancel adding task"
                                    onClick={() => {
                                        setShowMain(false);
                                        setShowProjectOverlay(false);
                                        setShowQuickAddTask(false);
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            setShowMain(false);
                                            setShowProjectOverlay(false);
                                            setShowQuickAddTask(false);
                                        }
                                    }}
                                    tabIndex={0}
                                    role="button"
                                ><FaRegTimesCircle/></span>
                            </div>
                        </>
                    )}
                    <ProjectOverlay
                        setProject={setProject}
                        showProjectOverlay={showProjectOverlay}
                        setShowProjectOverlay={setShowProjectOverlay}
                    />
                    <TaskDate
                        setTaskDate={setTaskDate}
                        showTaskDate={showTaskDate}
                        setShowTaskDate={setShowTaskDate}
                    />
                    <input
                        className="add-task__content"
                        aria-label="Enter your task"
                        data-testid="add-task-content"
                        type="text"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    />
                    <Button
                        onClick={() => {
                            showQuickAddTask
                                ? addTask() && setShowQuickAddTask(false)
                                : addTask()
                        }} label={'Add Task'} color={'primary'} dataTestId={"add-task"}
                    />
                    {!showQuickAddTask &&
                    <span className={'add-task__button-cancel'}>
                    <Button onClick={() => {
                        setShowMain(false);
                        setShowProjectOverlay(false);
                    }} label={'Cancel'} color={'transparent'} dataTestId={'add-task-main-cancel'}
                    /></span>}
                    <span
                        className="add-task__project"
                        data-testid="show-project-overlay"
                        onClick={() => setShowProjectOverlay(!showProjectOverlay)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') setShowProjectOverlay(!showProjectOverlay);
                        }}
                        tabIndex={0}
                        role="button"
                    ><FaRegListAlt/></span>
                    <span
                        className="add-task__date"
                        data-testid="show-task-date-overlay"
                        onClick={() => setShowTaskDate(!showTaskDate)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') setShowTaskDate(!showTaskDate);
                        }}
                        tabIndex={0}
                        role="button"
                    ><FaRegCalendarAlt/></span>
                </div>
            )}
        </div>
    );
};
