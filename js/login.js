// const loginForm = document.getElementById("login-form");
// const loginButton = document.getElementById("login_form_submit");
// const loginErrorMsg = document.getElementById("incorrect_h3");

// loginButton.addEventListener("click", (e) => {
//     e.preventDefault();
//     const username = loginForm.user_name.value;
//     const password = loginForm.user_password.value;

//     if (username === "user" && password === "user") {
//         setTimeout(function(){
//             window.location.href = 'index.html';
//           }, 2 * 1000);
//     } else {
//         loginErrorMsg.style.visibility = "visible";
//     }
// })
import { validate_email, validate_password } from "/js/validators.js";
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  update,
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

const but = document.getElementById("login_form_submit");

but.addEventListener("click", (e) => {
  let email = document.getElementById("user_email").value;
  let password = document.getElementById("user_password").value;
  const loginErrorMsg = document.getElementById("incorrect_h3");

  console.log(email, password);

  if (validate_email(email) == false) {
    alert('Email is not correct')
  }

  if (validate_password(password) == false) {
    alert('Password is not correct')
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

      const user = userCredential.user;

      const dt = new Date();
      update(ref(database, "users/" + user.uid), {
        last_login: dt,
      });

      alert("User loged in!");

      setTimeout(function () {
        window.location.href = "index.html";
      }, 2 * 1000);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
      loginErrorMsg.style.visibility = "visible";
    });
});

