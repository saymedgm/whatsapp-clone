import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCz29IUNsOET-1hlUwKMMtEv4dwn8gHeCM",
    authDomain: "whatsapp-clone-1b14a.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-1b14a.firebaseio.com",
    projectId: "whatsapp-clone-1b14a",
    storageBucket: "whatsapp-clone-1b14a.appspot.com",
    messagingSenderId: "1003650476103",
    appId: "1:1003650476103:web:f4fbe6edbcff3ab2e42962",
    measurementId: "G-2D47ST9MJT"
  };

  const firebaseapp = firebase.initializeApp(firebaseConfig);
  const db = firebaseapp.firestore(); {/*database */}
  const auth = firebase.auth(); {/*authentication factor */}
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db; 