import { Linking } from 'react-native'

const githubConfig = require('../../githubconfig.json')

function getTokenFromGithub(code) {
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
        code,
        state: Math.random().toString(36)
      })
    }
  )

  return fetch(request)
  .then(result => result.json())
  .then(resultJson => resultJson.access_token)
  .catch(error => {
    throw new Error(error)
  })
}

function handleUrl(event) {
  const code = event.url.slice(event.url.lastIndexOf('=') + 1)
  getTokenFromGithub(code).done(token => {
    console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
    console.log('token', token)
    console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ')
  })

  Linking.removeEventListener('url', handleUrl)
}

export default function signInWithGithub() {
  const request = githubConfig.url+
    'authorize?client_id='+githubConfig.clientId+
    '&redirect_uri='+githubConfig.redirectUri

  Linking.addEventListener('url', handleUrl)
  Linking.openURL(request).catch(error => {
    throw new Error(error)
  })
}
