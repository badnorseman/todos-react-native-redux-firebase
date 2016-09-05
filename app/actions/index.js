import * as actionTypes from '../constants/actionTypes'
import { makeActionCreator } from '../utils/makeActionCreator'

let nextTodoId = 0
export const addTodo = text => {
  return {
    type: actionTypes.ADD_TODO,
    id: nextTodoId++,
    text
  }
}

export const toggleTodo = makeActionCreator(actionTypes.TOGGLE_TODO, 'id')
export const setVisibilityFilter = makeActionCreator(actionTypes.SET_VISIBILITY_FILTER, 'filter')
