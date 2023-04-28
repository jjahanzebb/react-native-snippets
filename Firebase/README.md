
## Config File
> File Path: project/src/utils/config.js


```javascript
// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  // To be replaced with your own Firebase config
  apiKey: "AIzaSyC9Xl-ky5ZjPLkOFxjiend35jb_4SpTGYg",
  authDomain: "scavetto-9feb0.firebaseapp.com",
  projectId: "scavetto-9feb0",
  storageBucket: "scavetto-9feb0.appspot.com",
  messagingSenderId: "690557171402",
  appId: "1:690557171402:web:af7c8b99aaccf9b42ce633",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);

  firebase.firestore().settings({
    experimentalForceLongPolling: true,
    merge: true,
  });
}

export { firebase };
```

Make sure to replace the placeholder values in the `firebaseConfig` object with your own Firebase configuration values.

---


