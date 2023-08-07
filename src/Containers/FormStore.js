import { collection, addDoc } from "firebase/firestore";

import { db } from "../fireStore";

export const addTask = async (name, status) => {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      name,
      status,
      createdAt: new Date()
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
