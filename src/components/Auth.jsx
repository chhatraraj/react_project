import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../Firebaseirebase";

const signInWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);

        if (!docSnap.exists()) {
            await setDoc(userRef, {
                userId: user.uid,
                username: user.displayName,
                email: user.email,
                createdAt: new Date(),
            });
        }
    } catch (error) {
        console.error("Login Error:", error);
    }
};
