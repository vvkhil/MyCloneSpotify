// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";
import {
  getDatabase,
  set,
  ref,
} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYsFsyShXX71DH9lzapvBEpYWrHDj5ROs",
  authDomain: "myclonespotify.firebaseapp.com",
  databaseURL: "https://myclonespotify-default-rtdb.firebaseio.com",
  projectId: "myclonespotify",
  storageBucket: "myclonespotify.appspot.com",
  messagingSenderId: "726811738074",
  appId: "1:726811738074:web:96def61422dea10e7b8ae3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);
const auth = getAuth(app);
console.log(auth);
const database = getDatabase(app);
console.log(database);

const but = document.getElementById("sign_up_submit");

but.addEventListener("click", (e) => {
  let email = document.getElementById("user_email").value;
  let username = document.getElementById("user_name").value;
  let password = document.getElementById("user_password").value;

  console.log(email, username, password);

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      set(ref(database, "users/" + user.uid), {
        username: username,
        email: email,
      });
      alert("user created!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
    });
});
