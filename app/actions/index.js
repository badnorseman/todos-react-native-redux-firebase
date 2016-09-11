import firebaseApp from '../firebaseApp'
import * as actionTypes from '../constants/actionTypes'
import { makeActionCreator } from '../utils/makeActionCreator'

const Todos = firebaseApp.database().ref()

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

export function addTodo(text) {
  return dispatch => {
    Todos.push({
      text,
      completed: false
    })
  }
}

export function toggleTodo(todo) {
  return dispatch => {
    Todos.child(todo.id).update({
      completed: !todo.completed
    })
  }
}

export function removeTodo(id) {
  return dispatch => {
    Todos.child(id).remove()
  }
}

export const setVisibilityFilter = makeActionCreator(actionTypes.SET_VISIBILITY_FILTER, 'filter')
