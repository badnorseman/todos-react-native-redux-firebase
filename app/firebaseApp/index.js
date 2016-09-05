import * as firebase from 'firebase'

const firebaseConfig = require('../../firebaseconfig.json')

const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp
