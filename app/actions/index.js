import firebaseApp from '../firebaseApp'
import * as actionTypes from '../constants/actionTypes'
import { makeActionCreator } from '../utils/makeActionCreator'

const Todos = firebaseApp.database().ref()

export function addTodo(text) {
  return dispatch => Todos.push({
    text,
    completed: false
  })
}

export function readTodos() {
  return dispatch => {
    Todos.on('value', (snapshot) => {
      let todos = []
      snapshot.forEach((child) => {
        todos.push({
          id: child.key,
          text: child.val().text,
          completed: child.val().completed
        })
      })
      dispatch({
        type: actionTypes.READ_TODOS,
        payload: todos
      })
    })
  }
}

export function deleteTodo(id) {
  Todos.child(id).remove()
  // return dispatch => {
  //   dispatch({
  //     type: actionTypes.DELETE_TODO,
  //     payload: id
  //   })
  // }
}

export const toggleTodo = makeActionCreator(actionTypes.TOGGLE_TODO, 'id')
export const setVisibilityFilter = makeActionCreator(actionTypes.SET_VISIBILITY_FILTER, 'filter')
