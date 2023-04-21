import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAro5e6X0LJf8VdvmpBEqPChC2w8kn_MUg",
  authDomain: "uploadimg-72119.firebaseapp.com",
  projectId: "uploadimg-72119",
  storageBucket: "uploadimg-72119.appspot.com",
  messagingSenderId: "905123521643",
  appId: "1:905123521643:web:f43df5db1fe65be1e13d2e",
  measurementId: "G-5EM3RN75XP"
};

export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)