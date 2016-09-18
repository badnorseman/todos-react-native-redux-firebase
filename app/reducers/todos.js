// @flow
import * as actionTypes from '../constants/actionTypes'
import { createReducer } from '../utils/createReducer'

const todosHandlers = {
  [actionTypes.FETCH_TODOS_SUCCESS](state: {}, action: { todos:{}}) {
    return action.todos
  },
  [actionTypes.FETCH_TODOS_FAILURE](state: {}, action: { error:{}}) {
    return action.error
  }
}

const todos = createReducer({}, todosHandlers)

export default todos
