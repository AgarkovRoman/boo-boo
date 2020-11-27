import React from 'react'
import {render, cleanup, fireEvent} from "@testing-library/react";
import {AddTask} from '../components/AddTask'
import {useSelectedProjectsValue} from "../context";
import firebase from "firebase"

beforeEach(cleanup);

jest.mock('../context', () => ({
    useSelectedProjectsValue: jest.fn(() => ({selectedProject: 1})),
    useProjectsValue: jest.fn(() => ({projects: []})),
}))

jest.mock('../firebase', () => ({
    firebase: {
        firestore: jest.fn(() => ({
            collection: jest.fn(() => ({
                add: jest.fn(() => Promise.resolve('Never mockk')),
            })),
        })),
    },
}));

describe('< AddTask />', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Success', () => {
        it('render the < AddTask />', () => {
            const {queryByTestId} = render(<AddTask/>);
            expect(queryByTestId('add-task-comp')).toBeTruthy()
        })

        it('render the < AddTask /> quick overlay', () => {
            const setShowQuickAddTask = jest.fn()
            const {queryByTestId} = render(
                <AddTask
                    setShowQuickAddTask={setShowQuickAddTask}
                    showAddTaskMain
                    showQuickAddTask
                    showShouldMain={false}
                />);
            expect(queryByTestId('quick-add-task')).toBeTruthy()
        })

        it('render the < AddTask/> main showable when clicked', () => {
            const {queryByTestId} = render(<AddTask showAddTaskMain />)

            fireEvent.click(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-main')).toBeTruthy()

            fireEvent.click(queryByTestId('show-project-overlay'))
            expect(queryByTestId('project-overlay')).toBeTruthy()
        })

        it('render the < AddTask /> date overlay when clicked', () => {
            const {queryByTestId} = render(<AddTask showAddTaskMain />)

            fireEvent.click(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-main')).toBeTruthy()

            fireEvent.click(queryByTestId('show-task-date-overlay'))
            expect(queryByTestId('task-date-overlay')).toBeFalsy()
        })

        it('hides the < AddTask /> main when cancel when clicked', () => {
            const {queryByTestId} = render(<AddTask showAddTaskMain />)

            fireEvent.click(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-main')).toBeTruthy()

            fireEvent.click(queryByTestId('add-task-main-cancel'))
            expect(queryByTestId('add-task-main')).toBeFalsy()
        })

        it('render the < AddTask /> for quick add task and then click cancel', () => {
            const showQuickAddTask = true
            const setShowQuickAddTask = jest.fn(() => !showQuickAddTask)
            const {queryByTestId} = render(
                <AddTask
                    setShowQuickAddTask={setShowQuickAddTask}
                    showQuickAddTask
                />)
            expect(queryByTestId('add-task-main')).toBeTruthy()

            fireEvent.click(queryByTestId('add-task-quick-cancel'))
            expect(setShowQuickAddTask).toHaveBeenCalled()
        })

        it('render the < AddTask /> and add task to the inbox and clears the state', () => {
            useSelectedProjectsValue.mockImplementation(() => ({
                selectedProject: 'TODAY'
            }))
        })
    })

})
