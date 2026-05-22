import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../../config/firebase";

import { createOrGetTeam } from "./team";
import { createUserProfile } from "./users";

export async function registerUser({
  firstName,
  lastName,
  className,
  teamName,
  email,
  password,
}: any) {

  try {

    // 1. Create auth user
    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    const user = userCredential.user;

    // 2. Team
    const teamId =
      await createOrGetTeam(
        teamName,
        user.uid
      );

    // 3. User profile
    await createUserProfile({
      uid: user.uid,

      firstName,

      lastName,

      className,

      email,

      teamId,
    });

    return user;

  } catch (error) {

    console.log(error);

    throw error;
  }
}

export async function loginUser(
  email: string,
  password: string
) {

  try {

    const userCredential =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

    const user = userCredential.user;

    const userDoc = await getDoc(
      doc(db, "users", user.uid)
    );

    if (!userDoc.exists()) {
      throw new Error(
        "User profile not found"
      );
    }

    return {
      firebaseUser: user,
      profile: userDoc.data(),
    };

  } catch (error) {

    console.log(error);

    throw error;
  }
}