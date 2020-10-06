import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBaIB3udOb6afYS02pk93dxjN50QTyv8fk',
  authDomain: 'rf4-info.firebaseapp.com',
  databaseURL: 'https://rf4-info.firebaseio.com',
  projectId: 'rf4-info',
  storageBucket: 'rf4-info.appspot.com',
  messagingSenderId: '226794039146',
  appId: '1:226794039146:web:b31dc24b59f65a751a6713',
  measurementId: 'G-6LT9NGQ0LD',
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
// const storage = firebaseApp.storage();

export { db, auth };
