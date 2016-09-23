// import { Linking } from 'react-native'
// import Firebase from 'firebase'
import firebaseApp from '../firebaseApp'
import * as actionTypes from '../constants/actionTypes'
import { makeActionCreator } from '../utils/makeActionCreator'

// const githubConfig = require('../../githubconfig.json')

const Todo = firebaseApp.database().ref()

export const setVisibilityFilter = makeActionCreator(actionTypes.SET_VISIBILITY_FILTER, 'filter')

export function fetchTodos() {
  authorize()
  return dispatch => {
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
  signInAnonymously()
}

// Works but we need to implement privacy for user data
function signInAnonymously() {
  firebaseApp.auth().signInAnonymously().then(function (result) {
    return result
  }).catch(error => {
    throw new Error(error)
  })
}

// Only works with Firebase version 2x
// function signInWithGithub() {
//   const provider = new Firebase.auth.GithubAuthProvider()
//   firebaseApp.auth().signInWithRedirect(provider)
//   firebaseApp.auth().getRedirectResult().then(result => {
//     console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
//     console.log('result', result)
//     console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
//   }).catch(error => {
//     throw new Error(error)
//   })
// }

// Require OAuth plugin to retrieve access token
// function signInWithGithubOAuth() {
//   const accessToken = 'missing'
//   const credential = new firebase.auth.GithubAuthProvider.credential(accessToken)
//   firebaseApp.auth().signInWithCredential(credential).then(result => {
//     console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
//     console.log('result', result)
//     console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
//   }).catch(error => {
//     throw new Error(error)
//   })
// }

// Return login html and redirects to Firebase Project
// function signInWithGithubUrl() {
//   const url = githubConfig.url+'?scope=user:email&client_id='+githubConfig.clientId+
//     '&response_type=token'
//   fetch(url).then(result => {
//     console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
//     console.log('result', result)
//     console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
//   }).catch(error => {
//     throw new Error(error)
//   })
// }

// Redirects to Firebase Project
// function signInWithGithubAndLinking() {
//   const url = githubConfig.url+'?scope=user:email&client_id='+githubConfig.clientId+
//     '&response_type=token'
//   Linking.openURL(url).then(result => {
//     console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
//     console.log('result', result)
//     console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
//   }).catch(error => {
//     throw new Error(error)
//   })
// }
