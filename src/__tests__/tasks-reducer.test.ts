import {
  ADD_TASK,
  addTask,
  ARCHIVED_TASK,
  archivedTask,
  archivedTaskHandler,
  DELETE_TASK,
  deleteTask,
  SET_TASKS,
  setAllTasks,
  tasksReducer,
} from '../redux/tasks/tasks-reducer'

const tasks = [
  {
    task: 'test',
    createDate: 123141412124,
    date: '12312312',
    archived: false,
    userId: '2314124124',
    projectId: '1',
    id: '12345',
    docId: '13124531245543',
  },
  {
    task: 'test1',
    createDate: 123141412124,
    date: '123123121',
    archived: false,
    userId: '231412412411',
    projectId: '1',
    id: '1234567',
    docId: '131245312455431',
  },
]

const task = {
  task: 'test3',
  createDate: 23424234234234,
  date: '23423423423',
  archived: false,
  userId: '23423412311',
  projectId: '1',
  id: '12312312',
  docId: '12312312',
}

const taskId = '1234567'

const initialState = {
  allTasks: [],
}

describe('tasks-reducer', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('archivedTaskHandler success', () => {
    test('archivedTaskHandler return array with one archive task', () => {
      const expectedResponse = [
        {
          task: 'test',
          createDate: 123141412124,
          date: '12312312',
          archived: false,
          userId: '2314124124',
          projectId: '1',
          id: '12345',
          docId: '13124531245543',
        },
        {
          task: 'test1',
          createDate: 123141412124,
          date: '123123121',
          archived: true,
          userId: '231412412411',
          projectId: '1',
          id: '1234567',
          docId: '131245312455431',
        },
      ]
      expect(archivedTaskHandler(tasks, taskId)).toEqual(expectedResponse)
    })
    test('archivedTaskHandler return array with not archive task', () => {
      const taskIdMock = '12345678'
      const expectedResponse = [
        {
          task: 'test',
          createDate: 123141412124,
          date: '12312312',
          archived: false,
          userId: '2314124124',
          projectId: '1',
          id: '12345',
          docId: '13124531245543',
        },
        {
          task: 'test1',
          createDate: 123141412124,
          date: '123123121',
          archived: false,
          userId: '231412412411',
          projectId: '1',
          id: '1234567',
          docId: '131245312455431',
        },
      ]
      expect(archivedTaskHandler(tasks, taskIdMock)).toEqual(expectedResponse)
    })
  })
  describe('actions', () => {
    test('setAllTasks action creator should set all tasks', () => {
      const expectedAction = {
        type: SET_TASKS,
        payload: tasks,
      }
      expect(setAllTasks(tasks)).toEqual(expectedAction)
    })

    test('addTask action creator should add task ', () => {
      const expectedAction = {
        type: ADD_TASK,
        payload: task,
      }
      expect(addTask(task)).toEqual(expectedAction)
    })

    test('archivedTask action creator should archive task ', () => {
      const expectedAction = {
        type: ARCHIVED_TASK,
        payload: taskId,
      }
      expect(archivedTask(taskId)).toEqual(expectedAction)
    })

    test('deleteTask action creator should delete task ', () => {
      const expectedAction = {
        type: DELETE_TASK,
        payload: taskId,
      }
      expect(deleteTask(taskId)).toEqual(expectedAction)
    })
  })
  describe('tasks-reducer', () => {
    test('should handle SET_TASKS ', () => {
      const expectedState = {
        allTasks: [...tasks],
      }
      expect(tasksReducer(initialState, setAllTasks(tasks))).toEqual(expectedState)
    })
    test('should handle ADD_TASK ', () => {
      const expectedState = {
        allTasks: [task],
      }
      expect(tasksReducer(initialState, addTask(task))).toEqual(expectedState)
    })
    test('should handle ARCHIVED_TASK ', () => {
      const initialStateMock = {
        allTasks: [
          {
            task: 'test',
            createDate: 123141412124,
            date: '12312312',
            archived: false,
            userId: '2314124124',
            projectId: '1',
            id: '12345',
            docId: '13124531245543',
          },
          {
            task: 'test1',
            createDate: 123141412124,
            date: '123123121',
            archived: false,
            userId: '231412412411',
            projectId: '1',
            id: '1234567',
            docId: '131245312455431',
          },
        ],
      }
      const expectedState = {
        allTasks: [
          {
            task: 'test',
            createDate: 123141412124,
            date: '12312312',
            archived: false,
            userId: '2314124124',
            projectId: '1',
            id: '12345',
            docId: '13124531245543',
          },
          {
            task: 'test1',
            createDate: 123141412124,
            date: '123123121',
            archived: true,
            userId: '231412412411',
            projectId: '1',
            id: '1234567',
            docId: '131245312455431',
          },
        ],
      }
      const id = '1234567'
      expect(tasksReducer(initialStateMock, archivedTask(id))).toEqual(expectedState)
    })
    test('should handle DELETE_TASK ', () => {
      const initialStateMock = {
        allTasks: [
          {
            task: 'test',
            createDate: 123141412124,
            date: '12312312',
            archived: false,
            userId: '2314124124',
            projectId: '1',
            id: '12345',
            docId: '123098',
          },
          {
            task: 'test1',
            createDate: 123141412124,
            date: '123123121',
            archived: false,
            userId: '231412412411',
            projectId: '1',
            id: '1234567',
            docId: '1230000',
          },
        ],
      }
      const docId = '1230000'
      const expectedState = {
        allTasks: [
          {
            task: 'test',
            createDate: 123141412124,
            date: '12312312',
            archived: false,
            userId: '2314124124',
            projectId: '1',
            id: '12345',
            docId: '123098',
          },
        ],
      }
      expect(tasksReducer(initialStateMock, deleteTask(docId))).toEqual(expectedState)
    })
  })
})
