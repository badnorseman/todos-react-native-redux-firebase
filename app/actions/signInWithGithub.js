import Firebase from 'firebase'
import { Linking } from 'react-native'
import {
  getItemFromLocalStorage,
  setItemToLocalStorage
} from './localStorage'
import firebaseApp from '../firebaseApp'

const githubConfig = require('../../githubconfig.json')

async function fetchTokenFromGithub(code) {
  const request = new Request(
    githubConfig.url+'access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: githubConfig.clientId,
        client_secret: githubConfig.clientSecret,
        code
      })
    }
  )

  try {
    let result = await fetch(request)
    let resultJson = await result.json()
    return resultJson.access_token
  } catch (error) {
    throw new Error(error)
  }
}

export default function signInWithGithub() {
  const requestState = Math.random().toString(36)
  const url = githubConfig.url+
    'authorize?client_id='+githubConfig.clientId+
    '&redirect_uri='+githubConfig.redirectUri+
    '&state='+requestState

  function handleUrl(event) {
    const code = event.url.slice(event.url.indexOf('=') + 1, event.url.indexOf('&'))
    const resultState = event.url.slice(event.url.lastIndexOf('=') + 1)

    if (code && requestState === resultState) {
      fetchTokenFromGithub(code)
      .then(token => setItemToLocalStorage({ token }))
      .then(() => getItemFromLocalStorage())
      .then(token => new Firebase.auth.GithubAuthProvider.credential(token.token))
      .then(credential => firebaseApp.auth().signInWithCredential(credential))
      .catch(error => {
        throw new Error(error)
      })
    }

    Linking.removeEventListener('url', handleUrl)
  }

  Linking.addEventListener('url', handleUrl)

  Linking.openURL(url).catch(error => {
    throw new Error(error)
  })
}
