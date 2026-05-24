import {
  addDoc,
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";

import { db } from "../../config/firebase";

export async function createOrGetTeam(
  teamName: string,
  userId: string
) {

  try {

    // Check existing team
    const teamQuery = query(
      collection(db, "teams"),
      where("teamName", "==", teamName)
    );

    const teamSnapshot =
      await getDocs(teamQuery);

    // Existing team
    if (!teamSnapshot.empty) {

      return teamSnapshot.docs[0].id;
    }

    // Create new team
    const teamRef = await addDoc(
      collection(db, "teams"),
      {
        teamName,

        createdBy: userId,

        members: [userId],

        totalScore: 0,

        createdAt: Timestamp.now(),
      }
    );

    return teamRef.id;

  } catch (error) {

    console.log(error);

    throw error;
  }
}