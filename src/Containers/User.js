import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { db } from "../fireStore";

export const addUser = async (userInfo) => {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            ...userInfo,
            registerdAt: new Date()
        });
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (err) {
        console.error("Error adding document: ", err);
        throw new Error("Error adding document: ", err);
    }
};
