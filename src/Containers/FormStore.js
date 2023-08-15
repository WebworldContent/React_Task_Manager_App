import { collection, addDoc, getDocs } from "firebase/firestore";

import { db } from "../fireStore";

export const addTask = async (name, status) => {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      name,
      status,
      createdAt: new Date()
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (err) {
    console.error("Error adding document: ", err);
    throw new Error("Error adding document: ", err);
  }
}

export const getTasks = async () => {
  try {
    const taskArray = [];
    const collectionRef = collection(db, 'tasks');
    const tasks = await getDocs(collectionRef);
    tasks.forEach((doc) => {
      taskArray.push(doc.data())
    });
    return taskArray;
  } catch(err) {
    console.error("Error getting document", err);
  }
};
