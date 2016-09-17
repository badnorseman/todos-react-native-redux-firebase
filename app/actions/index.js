import firebaseApp from '../firebaseApp'
import * as actionTypes from '../constants/actionTypes'
import { makeActionCreator } from '../utils/makeActionCreator'

const Todo = firebaseApp.database().ref()

export function fetchTodos() {
  authorize()
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
  authorize()
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
  authorize()
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
  authorize()
  return dispatch => {
    Todo.child(id).remove().catch(error => {
      dispatch({
        type: actionTypes.GET_ERROR,
        error
      })
    })
  }
}

function authorize() {
  console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
  console.log('authorize')
  console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
  signInAnonymously()
}

function signInAnonymously() {
  firebaseApp.auth().signInAnonymously().then(function (result) {
    console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
    console.log('signInAnonymously result', result)
    console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
  }).catch(error => {
    console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
    console.log('signInAnonymously error', error)
    console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
    throw new Error(error)
  })
}

// function signInWithGithub() {
//   // https://developer.github.com/v3/oauth/#web-application-flow
//   const url = 'https://github.com/login/oauth/authorize?client_id=04a71d6ec8cc045fee9a'
//   const headers = {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   }
//   return fetch(url, {
//     method: 'GET',
//     headers
//   }).then(function (result) {
//     console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
//     console.log('signInWithGithub result', result)
//     console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
//     return result
//   }).catch(error => {
//     console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
//     console.log('signInWithGithub error', error)
//     console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
//     throw new Error(error)
//   })
// }

export const setVisibilityFilter = makeActionCreator(actionTypes.SET_VISIBILITY_FILTER, 'filter')
