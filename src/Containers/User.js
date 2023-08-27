import {
    collection,
    addDoc,
    getDocs,
    query,
    where
} from "firebase/firestore";
import {db} from "../fireStore";

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

export const getUserDetails = async (uid) => {
    try {
        const taskArray = [];
        const q = query(collection(db, "users"), where("userId", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const updateTask = doc.data();
            updateTask['id'] = doc.id;
            taskArray.push(updateTask);
        });
        return taskArray[0];
    } catch (err) {
        console.error("Error getting document", err);
    }
};
