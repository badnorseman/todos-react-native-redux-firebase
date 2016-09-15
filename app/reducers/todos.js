// @flow
import * as actionTypes from '../constants/actionTypes'
import { createReducer } from '../utils/createReducer'

const todosHandlers = {
  [actionTypes.TODOS_SUCCESS](state: {}, action: {}) {
    return action.todos
  },
  [actionTypes.TODOS_FAILURE](state: {}, action: {}) {
    return action.error
  }
}

const todos = createReducer([], todosHandlers)

export default todos
