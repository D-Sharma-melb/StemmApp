import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
  where,
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
    const docRef = await addDoc(collection(db, "attempts"), {
      activityId,

      userId,

      teamId,

      score,

      metadata,

      location,

      createdAt: Timestamp.now(),
    });

    return docRef.id;
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export async function getUserRecentAttempts(
  userId: string,
  numAttempts: number = 3,
) {
  try {
    const q = query(
      collection(db, "attempts"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
      limit(numAttempts),
    );
    const querySnapshot = await getDocs(q);
    const attempts: any[] = [];
    querySnapshot.forEach((doc) => {
      attempts.push({ id: doc.id, ...doc.data() });
    });
    return attempts;
  } catch (error) {
    console.error("Error fetching user attempts:", error);
    throw error;
  }
}
