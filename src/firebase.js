import firebase from 'firebase';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAcPrcZnR9Emn4zGxpHQYnqx7WTyKHU2WM',
  authDomain: 'react---e-commerce.firebaseapp.com',
  projectId: 'react---e-commerce',
  storageBucket: 'react---e-commerce.appspot.com',
  messagingSenderId: '824529061111',
  appId: '1:824529061111:web:02c5cd02121dc357b5fff2',
  measurementId: 'G-GQLTJNSSCN',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// Export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
