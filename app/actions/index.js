import firebaseApp from '../firebaseApp'
import * as actionTypes from '../constants/actionTypes'
import { makeActionCreator } from '../utils/makeActionCreator'

const Todo = firebaseApp.database().ref()

export function fetchTodos() {
  return dispatch => {
    Todo.on('value', function (snapshot) {
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
    }).then(function (result) {
      console.log('addTodo result', result)
    }, function (error) {
      console.error('addTodo error', error)
    })
  }
}

export function toggleTodo(todo) {
  return dispatch => {
    Todo.child(todo.id).update({
      completed: !todo.completed
    }).then(function (result) {
      console.log('toggleTodo result', result)
    }, function (error) {
      console.error('toggleTodo error', error)
    })
  }
}

export function deleteTodo(id) {
  return dispatch => {
    Todo.child(id).remove().then(function (result) {
      console.log('deleteTodo result', result)
    }, function (error) {
      console.error('deleteTodo error', error)
    })
  }
}

function authenticate() {
  const auth = firebaseApp.auth()
  return auth.signInAnonymously()
    .then(res => res)
    .catch(err => {
      throw new Error(err)
    })
}

export const setVisibilityFilter = makeActionCreator(actionTypes.SET_VISIBILITY_FILTER, 'filter')
