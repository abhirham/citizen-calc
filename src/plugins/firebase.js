import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCAuSCF9aWKMV-S4ox9KJ861EF6Hez-RNk",
  authDomain: "citizen-apply-calc.firebaseapp.com",
  projectId: "citizen-apply-calc",
  storageBucket: "citizen-apply-calc.appspot.com",
  messagingSenderId: "969671935311",
  appId: "1:969671935311:web:00a98867d6ed71ec2cf13a",
  measurementId: "G-7G2RLBHXLQ",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = firebase.firestore();
export const auth = firebase.auth();
