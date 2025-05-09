// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9FRBHYtTsfkUyBTq7LOqfsyToOXsgK0w",
  authDomain: "tpf-lab-86551.firebaseapp.com",
  projectId: "tpf-lab-86551",
  storageBucket: "tpf-lab-86551.firebasestorage.app",
  messagingSenderId: "1038486176741",
  appId: "1:1038486176741:web:2fe3bdc219ff3e31aaa50c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

// Sign in function
async function userSignIn() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log('User signed in:', user);
    // Inject user data into form
    const firstNameField = document.getElementById("firstName");
    const lastNameField = document.getElementById("lastName");
    const emailField = document.getElementById("email");
    const displayName = user.displayName || "";
    const [firstName, ...rest] = displayName.split(' ');
    if (firstNameField) firstNameField.value = firstName;
    if (lastNameField) lastNameField.value = rest.join(' ');
    if (emailField) emailField.value = user.email || '';
  } catch (error) {
    console.error('Sign-in error:', error.code, error.message);
  }
}

// Sign out function
async function userSignOut() {
  try {
    await signOut(auth);
    alert("You have been signed out!");
    console.log('User signed out');
  } catch (error) {
    console.error('Sign-out error:', error.code, error.message);
  }
}

// Observe auth state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('Auth state changed, user:', user);
  } else {
    console.log('No user is signed in');
  }
});

// Attach event listeners after DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  const signInButton = document.getElementById("signInButton");
  const signOutButton = document.getElementById("signOutButton");
  if (signInButton) signInButton.addEventListener("click", userSignIn);
  if (signOutButton) signOutButton.addEventListener("click", userSignOut);
});