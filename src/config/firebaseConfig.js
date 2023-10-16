import {initializeApp} from "firebase/app"
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyC9Y4vxIidE8_DCW5lzHVirPWCLEJaKhQg",
    authDomain: "todo-5b961.firebaseapp.com",
    projectId: "todo-5b961",
    storageBucket: "todo-5b961.appspot.com",
    messagingSenderId: "820933004402",
    appId: "1:820933004402:web:5fcf2e081309f5379186eb",
    measurementId: "G-H4TDWS03WX"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app)

