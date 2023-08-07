import { getFirestore } from "firebase/firestore";
import { firebase } from './firebase';
export const db = getFirestore(firebase);
