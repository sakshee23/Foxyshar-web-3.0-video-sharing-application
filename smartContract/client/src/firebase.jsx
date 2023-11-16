// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAog3R_t9OZR2xyWxFNGJ5tesl-7gRQKJs",
  authDomain: "videosharingapplication-5cbf8.firebaseapp.com",
  projectId: "videosharingapplication-5cbf8",
  storageBucket: "videosharingapplication-5cbf8.appspot.com",
  messagingSenderId: "660861170224",
  appId: "1:660861170224:web:196bb5b65adc5df04cf3f5"
};


const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)

export default app;