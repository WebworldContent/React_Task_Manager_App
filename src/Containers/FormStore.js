import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

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
      const updateTask = doc.data();
      updateTask['id'] = doc.id;
      taskArray.push(updateTask);
    });
    return taskArray;
  } catch(err) {
    console.error("Error getting document", err);
  }
};

export const getTask = async (documentId) => {
  try {
    const docRef = doc(db, 'tasks', documentId);
    const docSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) {
      console.log('No matching documents.');
      return;
    }

    return  docSnapshot.data();
  } catch(err) {
    console.error("Error getting document", err);
  }
};

export const updateTask = async (name, status, documentId) => {
  try {
    const docRef = doc(db, 'tasks', documentId);
    await updateDoc(docRef, {
      name,
      status
    });
    console.log('document updated!');
  } catch (err) {
    console.error("Error getting document", err);
  }
};

export const deleteTask = async(documentId) => {
  try {
    const docRef = doc(db, 'tasks', documentId);
    await deleteDoc(docRef);
    console.log('document deleted!');
  } catch(err) {
    console.error("Error getting document", err);
  }
};
