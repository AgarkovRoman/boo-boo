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

describe('<AddTask/>', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Success', () => {
        it('render the <AddTask/>', () => {
            const {queryByTestId} = render(<AddTask/>);
            expect(queryByTestId('add-task-comp')).toBeTruthy()
        })

        it('render the <AddTask/> quick overlay', () => {
            const setShowQuickAddTask = jest.fn()
            const {queryByTestId} = render(
                <AddTask
                    setShowQuickAddTask={setShowQuickAddTask}
                    showAddTaskMain
                    showQuickAddTask
                    showShouldMain={false}
                />);
            expect(queryByTestId('add-task-comp')).toBeTruthy()
        })

        it('render the <AddTask/> main showable when clicked', () => {
            const {queryByTestId} = render(<AddTask showAddTaskMain />)
            fireEvent.click(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-main')).toBeTruthy()
        })
    })

})
