import {
  doc,
  setDoc,
  Timestamp,
} from "firebase/firestore";

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

    await setDoc(
      doc(db, "users", uid),
      {
        uid,

        firstName,

        lastName,

        className,

        email,

        teamId,

        role: "student",

        createdAt: Timestamp.now(),
      }
    );

  } catch (error) {

    console.log(error);

    throw error;
  }
}