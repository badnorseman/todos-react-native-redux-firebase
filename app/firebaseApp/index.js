import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyAvcfOZR2sX4mABNzRLMEv_vAmSdiT8q-Y',
  authDomain: 'my-to-dos.firebaseapp.com',
  databaseURL: 'https://my-to-dos.firebaseio.com',
  storageBucket: 'my-to-dos.appspot.com'
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp
