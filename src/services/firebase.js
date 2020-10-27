import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCRK4OknfaWtkw7uO5bW6mFD418eSEH1Wc',
  authDomain: 'alt-docs.firebaseapp.com',
  databaseURL: 'https://alt-docs.firebaseio.com',
  projectId: 'alt-docs',
  storageBucket: 'alt-docs.appspot.com',
  messagingSenderId: '189326591850',
  appId: '1:189326591850:web:72816fc7d951bd98a9c713',
  measurementId: 'G-785VQ27FPJ',
};

const firebaseApp = firebase.apps.length === 0
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = firebaseApp.firestore();

export default db;
