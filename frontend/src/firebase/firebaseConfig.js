import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/database"

const firebaseConfig = {
    apiKey: "AIzaSyCn_eZG71GOg3fdMtKcxNlW7B5kl1_4N2Y",
    authDomain: "tensorgo-c5f30.firebaseapp.com",
    projectId: "tensorgo-c5f30",
    storageBucket: "tensorgo-c5f30.firebasestorage.app",
    messagingSenderId: "690069543713",
    appId: "1:690069543713:web:23a13b82e1e8ef8d253c60",
    measurementId: "G-XW4Q47CSR3"
  };
  

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export default firebase