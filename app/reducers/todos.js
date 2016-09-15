// @flow
import * as actionTypes from '../constants/actionTypes'
import { createReducer } from '../utils/createReducer'

const todosHandlers = {
  [actionTypes.FETCH_TODOS_SUCCESS](state: {}, action: {}) {
    return action.todos
  },
  [actionTypes.FETCH_TODOS_FAILURE](state: {}, action: {}) {
    return action.error
  }
}

const todos = createReducer([], todosHandlers)

export default todos
