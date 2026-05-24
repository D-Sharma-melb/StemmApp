import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { AttemptsList } from "../../../components/result";
import { AppHeader } from "../../../components/shared/AppHeader";
import { EmptyState } from "../../../components/shared/EmptyState";
import { LoadingSpinner } from "../../../components/shared/LoadingSpinner";
import { ScreenContainer } from "../../../components/shared/ScreenContainer";
import { auth } from "../../../config/firebase";
import { getUserRecentAttempts } from "../../../services/firebase/attempts";
import { TYPOGRAPHY } from "../../../styles/typography";

type AttemptRow = {
  id: string;
  activityId?: string;
  score?: number;
  createdAt?: any;
};

export default function Results() {
  const [attempts, setAttempts] = useState<AttemptRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAttempts = async () => {
      const user = auth.currentUser;

      if (!user) {
        setError("Please log in to view your attempts.");
        setLoading(false);
        return;
      }

      try {
        const data = await getUserRecentAttempts(user.uid, 10);
        setAttempts(data);
      } catch (err: any) {
        console.error("Failed to load attempts:", err);
        setError(err?.message || "Failed to load attempts.");
      } finally {
        setLoading(false);
      }
    };

    loadAttempts();
  }, []);

  return (
    <ScreenContainer>
      <AppHeader title="My Results" onBack={() => router.back()} />

      <Text style={TYPOGRAPHY.subText}>Showing latest 10 attempts</Text>

      {loading ? (
        <LoadingSpinner text="Loading your attempts..." />
      ) : error ? (
        <EmptyState icon="alert-circle-outline" message={error} />
      ) : attempts.length === 0 ? (
        <EmptyState
          icon="document-text-outline"
          message="No attempts yet. Complete an activity to see your results here."
        />
      ) : (
        <AttemptsList attempts={attempts} />
      )}
    </ScreenContainer>
  );
}
