import firebaseApp from '../firebaseApp'
import * as actionTypes from '../constants/actionTypes'
import { makeActionCreator } from '../utils/makeActionCreator'

const Todo = firebaseApp.database().ref()

export function fetchTodos() {
  authenticate()
  return dispatch => {
    Todo.orderByChild('text').on('value', function (snapshot) {
      let todos = []
      snapshot.forEach((child) => {
        todos.push({
          id: child.key,
          text: child.val().text,
          completed: child.val().completed
        })
      })
      dispatch({
        type: actionTypes.FETCH_TODOS_SUCCESS,
        todos
      })
    }, function (error) {
      dispatch({
        type: actionTypes.FETCH_TODOS_FAILURE,
        error
      })
    })
  }
}

export function addTodo(text) {
  authenticate()
  return dispatch => {
    Todo.push({
      text,
      completed: false
    }).catch(error => {
      dispatch({
        type: actionTypes.GET_ERROR,
        error
      })
    })
  }
}

export function toggleTodo(todo) {
  authenticate()
  return dispatch => {
    Todo.child(todo.id).update({
      completed: !todo.completed
    }).catch(error => {
      dispatch({
        type: actionTypes.GET_ERROR,
        error
      })
    })
  }
}

export function deleteTodo(id) {
  authenticate()
  return dispatch => {
    Todo.child(id).remove().catch(error => {
      dispatch({
        type: actionTypes.GET_ERROR,
        error
      })
    })
  }
}

function authenticate() {
  const auth = firebaseApp.auth()
  auth.signInAnonymously().catch(error => {
    throw new Error(error)
  })
}

export const setVisibilityFilter = makeActionCreator(actionTypes.SET_VISIBILITY_FILTER, 'filter')
