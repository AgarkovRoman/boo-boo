import React from 'react';
import {render, screen} from '@testing-library/react';
import {Tasks} from '../components/Tasks/Tasks';
import {useSelectedProjectsValue} from '../context';
import {useTasks} from "../hooks";

jest.mock('../context', () => ({
    useSelectedProjectsValue: jest.fn(),
    useProjectsValue: jest.fn(() => ({
        projects: [
            {
                name: "🔧 Renovation",
                projectId: "2",
                userId: "RM6FGvtHAMviaIDJNas",
            },
            {
                name: "💻 Work",
                projectId: "1",
                userId: "RM6FGvtHAMviaIDJNas",
            }
        ]
    }))
}))

jest.mock('../hooks', () => ({
    useTasks: jest.fn(() => ({
        tasks: [
            {
                id: '0HTGB1k3BXUYVh6nn2Vy',
                archived: false,
                date: "15/11/2020",
                projectId: "1",
                task: "задача на завтра в ворк",
                userId: "RM6FGvtHAMviaIDJNas"
            },
        ],
    }))
}))

describe('< Tasks />', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders a Tasks', () => {
        useSelectedProjectsValue.mockImplementation(() => ({
            setSelectedProject: jest.fn(() => 'INBOX'),
            selectedProject: 'INBOX',
        }));

        const {getByTestId} = render(<Tasks/>);
        expect(getByTestId('tasks')).toBeTruthy();
        expect(getByTestId('project-name').textContent).toBe('Inbox');
    });

    it('render a Tasks without any tasks ', () => {
        useSelectedProjectsValue.mockImplementation(() => ({
            setSelectedProject: jest.fn(() => 'INBOX'),
            selectedProject: 'INBOX',
        }));

        useTasks.mockImplementation(()=>({
            tasks: []
        }))

        const {getByTestId} = render(<Tasks/>);
        expect(getByTestId('tasks')).toBeTruthy();
        expect(getByTestId('project-name').textContent).toBe('Inbox');
        expect(getByTestId('task-not-found').textContent).toBe('All tasks are done! Nice work!');
    })

    it('renders a Tasks with a project title', () => {
        useSelectedProjectsValue.mockImplementation(() => ({
            setSelectedProject: jest.fn(() => '1'),
            selectedProject: '1',
        }));

        const {getByTestId} = render(<Tasks/>);
        expect(getByTestId('tasks')).toBeTruthy();
        expect(getByTestId('project-name').textContent).toBe('💻 Work');
    });

    it('renders a Tasks with a collated title', () => {
        useSelectedProjectsValue.mockImplementation(() => ({
            setSelectedProject: jest.fn(() => 'INBOX'),
            selectedProject: 'INBOX',
        }));

        const {getByTestId} = render(<Tasks/>);
        expect(getByTestId('tasks')).toBeTruthy();
        expect(getByTestId('project-name').textContent).toBe('Inbox');
    });

});
