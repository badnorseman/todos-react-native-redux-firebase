import firebaseApp from '../firebaseApp'
import * as actionTypes from '../constants/actionTypes'
import { makeActionCreator } from '../utils/makeActionCreator'

const Todo = firebaseApp.database().ref()

export function fetchTodos() {
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
        type: actionTypes.TODOS_SUCCESS,
        todos
      })
    }, function (error) {
      dispatch({
        type: actionTypes.TODOS_FAILURE,
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
        type: actionTypes.TODOS_FAILURE,
        error
      })
    })
  }
}

export function toggleTodo(todo) {
  return dispatch => {
    Todo.child(todo.id).update({
      completed: !todo.completed
    }).catch(error => {
      dispatch({
        type: actionTypes.TODOS_FAILURE,
        error
      })
    })
  }
}

export function deleteTodo(id) {
  return dispatch => {
    Todo.child(id).remove().catch(error => {
      dispatch({
        type: actionTypes.TODOS_FAILURE,
        error
      })
    })
  }
}

function authenticate() {
  return dispatch => {
    const auth = firebaseApp.auth()
    auth.signInAnonymously().catch(error => {
      dispatch({
        type: actionTypes.TODOS_FAILURE,
        error
      })
    })
  }
}

export const setVisibilityFilter = makeActionCreator(actionTypes.SET_VISIBILITY_FILTER, 'filter')
