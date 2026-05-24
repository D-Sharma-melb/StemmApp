import {
    collection,
    limit,
    onSnapshot,
    orderBy,
    query,
    where
} from "firebase/firestore";
import { db } from "../../config/firebase";

export interface LeaderboardEntry {
  id: string;
  rank: number;
  userId: string;
  teamId: string;
  userName: string;
  teamName: string;
  score: number;
  metadata?: any;
}

export interface ActivityFeedEntry {
  id: string;
  userName: string;
  activityId: string;
  score: number;
}

// Helper to mock user/team resolution. Normally done via joins or cloud functions.
const resolveNames = async (userId: string, teamId: string) => {
  // Mock resolution for the fast presentation build
  const mockTeams: any = {
    team001: "Physics Ninjas",
    team002: "STEM Legends",
    team003: "Earthquake Engineers",
    "temp-team": "Alpha Testers",
  };
  const mockUsers: any = {
    uid123: "Divyam",
    uid124: "Sarah",
    "temp-user": "Developer",
  };
  return {
    userName: mockUsers[userId] || "Anonymous",
    teamName: mockTeams[teamId] || "Unknown Team",
  };
};

export const subscribeTopTeams = (
  activityFilter: string,
  callback: (data: LeaderboardEntry[]) => void,
) => {
  const qConstraints: any[] = [];
  if (activityFilter !== "Overall") {
    qConstraints.push(where("activityId", "==", activityFilter.toLowerCase()));
  }
  qConstraints.push(orderBy("score", "desc"));
  qConstraints.push(limit(10));

  const attemptsRef = collection(db, "attempts");
  const q = query(attemptsRef, ...qConstraints);

  return onSnapshot(q, async (snapshot) => {
    if (snapshot.empty) {
      // Presentation Fallback: Return impressive Mock Data
      const mockData: LeaderboardEntry[] =
        activityFilter === "Earthquake"
          ? [
              {
                id: "1",
                rank: 1,
                userId: "u1",
                teamId: "t1",
                userName: "Divyam",
                teamName: "Physics Ninjas",
                score: 94,
                metadata: { maxTilt: 3, maxAcceleration: 0.8 },
              },
              {
                id: "2",
                rank: 2,
                userId: "u2",
                teamId: "t2",
                userName: "Sarah",
                teamName: "STEM Squad",
                score: 88,
                metadata: { maxTilt: 5, maxAcceleration: 1.1 },
              },
              {
                id: "3",
                rank: 3,
                userId: "u3",
                teamId: "t3",
                userName: "Alex",
                teamName: "Cardboard Kings",
                score: 76,
                metadata: { maxTilt: 12, maxAcceleration: 1.8 },
              },
            ]
          : activityFilter === "Breathing"
            ? [
                {
                  id: "1",
                  rank: 1,
                  userId: "u1",
                  teamId: "t1",
                  userName: "Divyam",
                  teamName: "Physics Ninjas",
                  score: 12,
                  metadata: { smoothness: 98 },
                },
                {
                  id: "2",
                  rank: 2,
                  userId: "u2",
                  teamId: "t2",
                  userName: "Sarah",
                  teamName: "STEM Squad",
                  score: 15,
                  metadata: { smoothness: 90 },
                },
              ]
            : [
                {
                  id: "1",
                  rank: 1,
                  userId: "u1",
                  teamId: "t1",
                  userName: "Divyam",
                  teamName: "Physics Ninjas",
                  score: 482,
                },
                {
                  id: "2",
                  rank: 2,
                  userId: "u2",
                  teamId: "t2",
                  userName: "Sarah",
                  teamName: "STEM Legends",
                  score: 450,
                },
                {
                  id: "3",
                  rank: 3,
                  userId: "u3",
                  teamId: "t3",
                  userName: "Mike",
                  teamName: "Earthquake Engineers",
                  score: 421,
                },
              ];
      callback(mockData);
      return;
    }

    const data: LeaderboardEntry[] = [];
    let rank = 1;
    for (const doc of snapshot.docs) {
      const dbData = doc.data();
      const { userName, teamName } = await resolveNames(
        dbData.userId,
        dbData.teamId,
      );
      data.push({
        id: doc.id,
        rank,
        userId: dbData.userId,
        teamId: dbData.teamId,
        userName,
        teamName,
        score: dbData.score,
        metadata: dbData.metadata,
      });
      rank++;
    }
    callback(data);
  });
};

export const subscribeRecentActivity = (
  callback: (data: ActivityFeedEntry[]) => void,
) => {
  const attemptsRef = collection(db, "attempts");
  const q = query(attemptsRef, orderBy("createdAt", "desc"), limit(5));

  return onSnapshot(q, async (snapshot) => {
    if (snapshot.empty) {
      const mockData = [
        { id: "a1", userName: "Divyam", activityId: "Earthquake", score: 92 },
        { id: "a2", userName: "Sarah", activityId: "Breathing", score: 14 },
        { id: "a3", userName: "Mike", activityId: "Reaction", score: 320 },
      ];
      callback(mockData);
      return;
    }

    const data: ActivityFeedEntry[] = [];
    for (const doc of snapshot.docs) {
      const dbData = doc.data();
      const { userName } = await resolveNames(dbData.userId, dbData.teamId);
      data.push({
        id: doc.id,
        userName,
        activityId: dbData.activityId || "Unknown",
        score: dbData.score,
      });
    }
    callback(data);
  });
};
