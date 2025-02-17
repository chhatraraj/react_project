import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBP3atWp2H_DUwjE7vI4NbOUxe-THQyR-8",
  authDomain: "new-apps-97a5f.firebaseapp.com",
  projectId: "new-apps-97a5f",
  storageBucket: "new-apps-97a5f.firebasestorage.app",
  messagingSenderId: "1005730424907",
  appId: "1:1005730424907:web:0c17d1198cf246782745ce",
  measurementId: "G-24QZMFW017"


};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export { db, auth };
