import { Linking } from 'react-native'

const githubConfig = require('../../githubconfig.json')

function getTokenFromGithub(code) {
  const url = githubConfig.url+'access_token'
  const request = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      client_id: githubConfig.clientId,
      client_secret: githubConfig.clientSecret,
      code,
      state: Math.random().toString(36)
    })
  }

  return fetch(url, request)
  .then(result => result.json())
  .then(json => json.access_token)
  .catch(error => {
    throw new Error(error)
  })
}

function handleUrl(event) {
  const code = event.url.slice(event.url.lastIndexOf('=') + 1)
  const accessToken = getTokenFromGithub(code).done()
  console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
  console.log('accessToken', accessToken)
  console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')

  Linking.removeEventListener('url', handleUrl)
}

export default function signInWithGithub() {
  const url = githubConfig.url+
    'authorize?client_id='+githubConfig.clientId+
    '&redirect_uri='+githubConfig.redirectUri+
    '&response_type=token'

  Linking.addEventListener('url', handleUrl)
  Linking.openURL(url).catch(error => {
    throw new Error(error)
  })
}
