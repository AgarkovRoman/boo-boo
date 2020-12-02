import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Tasks } from '../components/Tasks';
import { useSelectedProjectsValue } from '../context';


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
    useTasks: () => ({
        tasks: [
            {
                id: '0HTGB1k3BXUYVh6nn2Vy',
                archived: true,
                date: "15/11/2020",
                projectId: "1",
                task: "задача на завтра в ворк",
                userId: "RM6FGvtHAMviaIDJNas"
            }
        ]
    })
}))

beforeEach(cleanup);

describe('< Tasks />', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders tasks', () => {
        useSelectedProjectsValue.mockImplementation(() => ({
            setSelectedProject: jest.fn(() => 'INBOX'),
            selectedProject: 'INBOX',
        }));

        const { queryByTestId } = render(<Tasks />);
        expect(queryByTestId('tasks')).toBeTruthy();
        expect(queryByTestId('project-name').textContent).toBe('Inbox');
    });

    it('renders a task with a project title', () => {
        useSelectedProjectsValue.mockImplementation(() => ({
            setSelectedProject: jest.fn(() => '1'),
            selectedProject: '1',
        }));

        const { queryByTestId } = render(<Tasks />);
        expect(queryByTestId('tasks')).toBeTruthy();
        expect(queryByTestId('project-name').textContent).toBe('💻 Work');
    });

    it('renders a task with a collated title', () => {
        useSelectedProjectsValue.mockImplementation(() => ({
            setSelectedProject: jest.fn(() => 'INBOX'),
            selectedProject: 'INBOX',
        }));

        const { queryByTestId } = render(<Tasks />);
        expect(queryByTestId('tasks')).toBeTruthy();
        expect(queryByTestId('project-name').textContent).toBe('Inbox');
    });
});
