import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";

import { db } from "../../config/firebase";

export async function createUserProfile({
  uid,
  firstName,
  lastName,
  className,
  email,
  teamId,
}: any) {
  try {
    await setDoc(doc(db, "users", uid), {
      uid,

      firstName,

      lastName,

      className,

      email,

      teamId,

      role: "student",

      createdAt: Timestamp.now(),
    });
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export async function getUserProfile(uid: string) {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    throw error;
  }
}
