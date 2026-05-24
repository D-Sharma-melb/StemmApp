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
    // sanitize payload: Firestore rejects `undefined` fields
    const sanitize = (obj: any) => {
      if (!obj || typeof obj !== "object") return obj ?? null;
      const out: any = {};
      Object.keys(obj).forEach((k) => {
        if (typeof obj[k] !== "undefined") out[k] = obj[k];
      });
      return out;
    };

    // Build top-level data and remove any undefined fields (Firestore forbids undefined)
    const topLevel: any = {
      activityId,
      userId,
      teamId,
      score,
      metadata: sanitize(metadata),
      createdAt: Timestamp.now(),
      location,
    };

    const data: any = {};
    Object.keys(topLevel).forEach((k) => {
      if (typeof topLevel[k] !== "undefined") data[k] = topLevel[k];
    });

    console.log("Saving attempt data:", JSON.stringify(data));
    const docRef = await addDoc(collection(db, "attempts"), data);

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
