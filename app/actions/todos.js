import firebaseApp from '../firebaseApp'
import * as actionTypes from '../constants/actionTypes'
import signInWithGithub from './signInWithGithub'

const Todo = firebaseApp.database().ref()

export function fetchTodos() {
  return dispatch => {
    signInWithGithub()
    return (
      Todo.orderByChild('text').on('value', function (snapshot) {
        let todos = []
        snapshot.forEach(function (child) {
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
    )
  }
}

export function addTodo(text) {
  return dispatch => {
    signInWithGithub()
    return (
      Todo.push({
        text,
        completed: false
      }).catch(error => {
        dispatch({
          type: actionTypes.GET_ERROR,
          error
        })
      })
    )
  }
}

export function toggleTodo(todo) {
  return dispatch => {
    signInWithGithub()
    return (
      Todo.child(todo.id).update({
        completed: !todo.completed
      }).catch(error => {
        dispatch({
          type: actionTypes.GET_ERROR,
          error
        })
      })
    )
  }
}

export function deleteTodo(id) {
  return dispatch => {
    signInWithGithub()
    return (
      Todo.child(id).remove().catch(error => {
        dispatch({
          type: actionTypes.GET_ERROR,
          error
        })
      })
    )
  }
}
