import React from 'react'
import {render, cleanup, fireEvent} from "@testing-library/react";
import {AddTask} from '../components/AddTask/AddTask'
import {useSelectedProjectsValue} from "../context";
import firebase from "firebase"

beforeEach(cleanup);

jest.mock('../context', () => ({
    useSelectedProjectsValue: jest.fn(() => ({selectedProject: "1"})),
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

        it('render the < AddTask/> main showable using onClick', () => {
            const {queryByTestId} = render(<AddTask showAddTaskMain />)

            fireEvent.click(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-main')).toBeTruthy()
        })

        it('render the < AddTask/> main showable using onKeyDown', () => {
            const {queryByTestId} = render(<AddTask showAddTaskMain />)

            fireEvent.keyDown(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-main')).toBeTruthy()
        })

        it('render the < AddTask/> project overlay when using onClick', () => {
            const {queryByTestId} = render(<AddTask showAddTaskMain />)

            fireEvent.click(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-main')).toBeTruthy()

            fireEvent.click(queryByTestId('show-project-overlay'))
            expect(queryByTestId('project-overlay')).toBeTruthy()
        })

        it('render the < AddTask/> project overlay when using onKeyDown', () => {
            const {queryByTestId} = render(<AddTask showAddTaskMain />)

            fireEvent.keyDown(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-main')).toBeTruthy()

            fireEvent.keyDown(queryByTestId('show-project-overlay'))
            expect(queryByTestId('project-overlay')).toBeTruthy()
        })

        it('render the < AddTask /> date overlay when using onClick', () => {
            const {queryByTestId} = render(<AddTask showAddTaskMain />)

            fireEvent.click(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-main')).toBeTruthy()

            fireEvent.click(queryByTestId('show-task-date-overlay'))
            expect(queryByTestId('task-date-overlay')).toBeFalsy()
        })

        it('render the < AddTask /> date overlay when using onKeyDown', () => {
            const {queryByTestId} = render(<AddTask showAddTaskMain />)

            fireEvent.keyDown(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-main')).toBeTruthy()

            fireEvent.keyDown(queryByTestId('show-task-date-overlay'))
            expect(queryByTestId('task-date-overlay')).toBeFalsy()
        })

        it('hides the < AddTask /> main when cancel is clicked using onClick', () => {
            const {queryByTestId} = render(<AddTask showAddTaskMain />)

            fireEvent.click(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-main')).toBeTruthy()

            fireEvent.click(queryByTestId('add-task-main-cancel'))
            expect(queryByTestId('add-task-main')).toBeFalsy()
        })

        it('hides the < AddTask /> main when cancel is clicked using onKeyDown', () => {
            const {queryByTestId} = render(<AddTask showAddTaskMain />)

            fireEvent.keyDown(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-main')).toBeTruthy()

            fireEvent.keyDown(queryByTestId('add-task-main-cancel'))
            expect(queryByTestId('add-task-main')).toBeFalsy()
        })


        it('render the < AddTask /> for quick add task and then click cancel using onClick', () => {
            const showQuickAddTask = true
            const setShowQuickAddTask = jest.fn(() => !showQuickAddTask)
            const {queryByTestId} = render(
                <AddTask
                    setShowQuickAddTask={setShowQuickAddTask}
                    showQuickAddTask
                />)
            fireEvent.click(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-main')).toBeTruthy()

            fireEvent.click(queryByTestId('add-task-quick-cancel'))
            expect(setShowQuickAddTask).toHaveBeenCalled()
        })

        it('render the < AddTask /> for quick add task and then click cancel using onKeyDown', () => {
            const showQuickAddTask = true
            const setShowQuickAddTask = jest.fn(() => !showQuickAddTask)
            const {queryByTestId} = render(
                <AddTask
                    setShowQuickAddTask={setShowQuickAddTask}
                    showQuickAddTask
                />)
            fireEvent.keyDown(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-main')).toBeTruthy()

            fireEvent.keyDown(queryByTestId('add-task-quick-cancel'))
            expect(setShowQuickAddTask).toHaveBeenCalled()
        })

        it('renders < AddTask /> and adds a task to TODAY', () => {
            useSelectedProjectsValue.mockImplementation(() => ({
                selectedProject: 'TODAY',
            }));

            const showQuickAddTask = true;
            const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
            const { queryByTestId } = render(
                <AddTask
                    showQuickAddTask={showQuickAddTask}
                    setShowQuickAddTask={setShowQuickAddTask}
                />
            );
            fireEvent.click(queryByTestId('show-main-action'));
            expect(queryByTestId('add-task-content')).toBeTruthy();

            fireEvent.change(queryByTestId('add-task-content'), {
                target: { value: 'I am a new task and I am amazing!' },
            });
            expect(queryByTestId('add-task-content').value).toBe(
                'I am a new task and I am amazing!'
            );

            fireEvent.click(queryByTestId('add-task'));
            expect(setShowQuickAddTask).toHaveBeenCalled();
        });


        it('renders < AddTask /> and adds a task to NEXT_7', () => {
            useSelectedProjectsValue.mockImplementation(() => ({
                selectedProject: 'NEXT_7',
            }));

            const showQuickAddTask = true;
            const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
            const { queryByTestId } = render(
                <AddTask
                    showQuickAddTask={showQuickAddTask}
                    setShowQuickAddTask={setShowQuickAddTask}
                />
            );
            fireEvent.click(queryByTestId('show-main-action'));
            expect(queryByTestId('add-task-content')).toBeTruthy();

            fireEvent.change(queryByTestId('add-task-content'), {
                target: { value: 'I am a new task and I am amazing!' },
            });
            expect(queryByTestId('add-task-content').value).toBe(
                'I am a new task and I am amazing!'
            );

            fireEvent.click(queryByTestId('add-task'));
            expect(setShowQuickAddTask).toHaveBeenCalled();
        });

        it('renders < AddTask /> and adds a task with a task date of TODAY', () => {
            useSelectedProjectsValue.mockImplementation(()=> ({
                selectedProject: '1'
            }))

            const {queryByTestId} = render(<AddTask showMain/>)
            fireEvent.click(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-content')).toBeTruthy()
            expect(queryByTestId('add-task-main')).toBeTruthy()

            fireEvent.change(queryByTestId('add-task-content'), {
                target: { value: 'I am a another task' },
            });
            expect(queryByTestId('add-task-content').value).toBe(
                'I am a another task'
            );

            fireEvent.click(queryByTestId('show-task-date-overlay'))
            expect(queryByTestId('task-date-overlay')).toBeTruthy()

            fireEvent.click(queryByTestId('task-date-today'))
            expect(queryByTestId('task-date-overlay')).toBeFalsy()

            fireEvent.click(queryByTestId('show-task-date-overlay'))
            expect(queryByTestId('task-date-overlay')).toBeTruthy()

            fireEvent.keyDown(queryByTestId('task-date-today'))
            expect(queryByTestId('task-date-overlay')).toBeFalsy()

            fireEvent.click(queryByTestId('add-task'))
        })


        it('renders < AddTask /> and adds a task with a task date of TOMORROW', () => {
            useSelectedProjectsValue.mockImplementation(()=> ({
                selectedProject: '1'
            }))

            const {queryByTestId} = render(<AddTask showMain/>)
            fireEvent.click(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-content')).toBeTruthy()
            expect(queryByTestId('add-task-main')).toBeTruthy()

            fireEvent.change(queryByTestId('add-task-content'), {
                target: { value: 'I am a another task' },
            });
            expect(queryByTestId('add-task-content').value).toBe(
                'I am a another task'
            );

            fireEvent.click(queryByTestId('show-task-date-overlay'))
            expect(queryByTestId('task-date-overlay')).toBeTruthy()

            fireEvent.click(queryByTestId('task-date-tomorrow'))
            expect(queryByTestId('task-date-overlay')).toBeFalsy()

            fireEvent.click(queryByTestId('show-task-date-overlay'))
            expect(queryByTestId('task-date-overlay')).toBeTruthy()

            fireEvent.keyDown(queryByTestId('task-date-tomorrow'))
            expect(queryByTestId('task-date-overlay')).toBeFalsy()

            fireEvent.click(queryByTestId('add-task'))
        })

        it('renders < AddTask /> and adds a task with a task date of NEXT_7', () => {
            useSelectedProjectsValue.mockImplementation(()=> ({
                selectedProject: '1'
            }))

            const {queryByTestId} = render(<AddTask showMain/>)
            fireEvent.click(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-content')).toBeTruthy()
            expect(queryByTestId('add-task-main')).toBeTruthy()

            fireEvent.change(queryByTestId('add-task-content'), {
                target: { value: 'I am a another task' },
            });
            expect(queryByTestId('add-task-content').value).toBe(
                'I am a another task'
            );

            fireEvent.click(queryByTestId('show-task-date-overlay'))
            expect(queryByTestId('task-date-overlay')).toBeTruthy()

            fireEvent.click(queryByTestId('task-date-next_7'))
            expect(queryByTestId('task-date-overlay')).toBeFalsy()

            fireEvent.click(queryByTestId('show-task-date-overlay'))
            expect(queryByTestId('task-date-overlay')).toBeTruthy()

            fireEvent.keyDown(queryByTestId('task-date-next_7'))
            expect(queryByTestId('task-date-overlay')).toBeFalsy()

            fireEvent.click(queryByTestId('add-task'))
        })
    })
})
