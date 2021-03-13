import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
  ADD_PROJECT,
  addProject,
  addProjectTC,
  DELETE_PROJECT,
  deleteProject,
  getAllProjectTC,
  projectsReducer,
  SET_ACTIVE_PROJECT,
  SET_ALL_PROJECTS,
  setActiveProject,
  setAllProjects,
} from '../redux/projects/projects-reducer'
import { projectsAPI } from '../api/api'
import { INBOX, TODAY } from '../constants/defaultProjects'

const initialState = {
  activeProject: INBOX,
  allProjects: [],
}

const projectId = '123454343234'
const userId = '124l1jn534'
const allProjects = [
  { name: 'test1', projectId: '1', userId: '54321', docId: 'fsdfsdfsdfsd' },
  { name: 'test2', projectId: '2', userId: '12345', docId: '12350912312' },
]
const project = { name: 'test3', projectId: '3', userId: '12345456' }
const docId = '124412379327412'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

// jest.mock('../api/api')
// const projectsAPIMock = projectsAPI
// projectsAPIMock.getAllProjectsById.mockReturnValue(Promise.resolve(allProjects))
// .then((res) => res)

// projectsAPIMock
//   .addProject(project)
//   .then((res) => res)
//   .mockReturnValue(() => Promise.resolve())
//   .then((res) => console.log(res))

// projectsAPI.getAllProjectsById(userId) = jest.fn().mockResolvedValue(43)

describe('projects-reducer', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('tests actions', () => {
    test('setActiveProject action creator should set Active Project by Id', () => {
      const expectAction = {
        type: SET_ACTIVE_PROJECT,
        payload: projectId,
      }
      expect(setActiveProject(projectId)).toEqual(expectAction)
    })

    test('setAllProjects action creator should set all Projects', () => {
      const expectAction = {
        type: SET_ALL_PROJECTS,
        payload: allProjects,
      }
      expect(setAllProjects(allProjects)).toEqual(expectAction)
    })

    test('AddProject action creator should add Project', () => {
      const expectAction = {
        type: ADD_PROJECT,
        payload: project,
      }
      expect(addProject(project)).toEqual(expectAction)
    })

    test('DeleteProject action creator should delete Project', () => {
      const expectAction = {
        type: DELETE_PROJECT,
        payload: docId,
      }
      expect(deleteProject(docId)).toEqual(expectAction)
    })
  })

  describe('test project reducer', () => {
    test('should return initial state', () => {
      expect(projectsReducer(undefined, {})).toEqual(initialState)
    })

    test('should handle SET_ACTIVE_PROJECT', () => {
      const expectedState = {
        activeProject: TODAY,
        allProjects: [],
      }
      expect(
        projectsReducer(
          {
            activeProject: INBOX,
            allProjects: [],
          },
          {
            type: SET_ACTIVE_PROJECT,
            payload: TODAY,
          }
        )
      ).toEqual(expectedState)
    })

    test('should handle SET_ALL_PROJECTS', () => {
      const expectedState = {
        activeProject: INBOX,
        allProjects,
      }
      expect(
        projectsReducer(
          {
            activeProject: INBOX,
            allProjects: [],
          },
          {
            type: SET_ALL_PROJECTS,
            payload: allProjects,
          }
        )
      ).toEqual(expectedState)
    })

    test('should handle ADD_PROJECT', () => {
      const expectedState = {
        activeProject: INBOX,
        allProjects: [project],
      }
      expect(
        projectsReducer(
          {
            activeProject: INBOX,
            allProjects: [],
          },
          {
            type: ADD_PROJECT,
            payload: project,
          }
        )
      ).toEqual(expectedState)
    })

    test('should handle DELETE_PROJECT', () => {
      const docIdMock = 'fsdfsdfsdfsd'
      const expectedState = {
        activeProject: INBOX,
        allProjects: [{ name: 'test2', projectId: '2', userId: '12345', docId: '12350912312' }],
      }
      expect(
        projectsReducer(
          {
            activeProject: INBOX,
            allProjects,
          },
          {
            type: DELETE_PROJECT,
            payload: docIdMock,
          }
        )
      ).toEqual(expectedState)
    })
  })

  // describe('test thunk', () => {
  //   test('getAllProjectTC should get all Projects by request', () => {
  //     const expectAction = {
  //       type: SET_ALL_PROJECTS,
  //       payload: allProjects,
  //     }
  //     const store = mockStore({ projects: [] })
  //
  //     return store.dispatch(getAllProjectTC(userId)).then(() => {
  //       expect(store.getActions()).toEqual(expectAction)
  //     })
  //   })

  // test('addProjectTC should add Project', async () => {
  //   const thunkCreator = addProjectTC(project)
  //   const mockDispatch = jest.fn()
  //   await thunkCreator(mockDispatch).then(() => {
  //     expect(mockDispatch).toBeCalledTimes(2)
  //   })
  // })
  // })
})
