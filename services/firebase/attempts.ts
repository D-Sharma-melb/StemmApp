import {
  addDoc,
  collection,
  Timestamp,
} from "firebase/firestore";

import { db } from "../../config/firebase";

export async function saveAttempt({
  activityId,
  userId,
  teamId,
  score,
  metadata,
  location,
}: any) {

  try {

    const docRef = await addDoc(
      collection(db, "attempts"),
      {
        activityId,

        userId,

        teamId,

        score,

        metadata,

        location,

        createdAt: Timestamp.now(),
      }
    );

    return docRef.id;

  } catch (error) {

    console.log(error);

    throw error;
  }
}