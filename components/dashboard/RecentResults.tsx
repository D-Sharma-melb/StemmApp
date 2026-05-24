import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { auth } from "../../config/firebase";
import { getUserRecentAttempts } from "../../services/firebase/attempts";
import { TYPOGRAPHY } from "../../styles/typography";
import { ResultCard } from "../shared";

export function RecentResults() {
  const [recentAttempts, setRecentAttempts] = useState<any[]>([]);

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const attempts = await getUserRecentAttempts(user.uid);
          setRecentAttempts(attempts);
        }
      } catch (error) {
        console.error("Failed to fetch recent attempts:", error);
      }
    };

    fetchAttempts();
  }, []);

  const formatSummary = (attempt: any) => {
    if (attempt.activityId === "reaction") {
      return `Reaction time: ${attempt.score}ms`;
    }
    if (attempt.metadata?.summary) {
      return attempt.metadata.summary;
    }
    return `Score: ${attempt.score}`;
  };

  return (
    <View style={styles.section}>
      <Text style={TYPOGRAPHY.sectionTitle}>Recent Results</Text>
      {recentAttempts.length > 0 ? (
        recentAttempts.map((attempt, index) => (
          <View key={attempt.id || index}>
            <ResultCard
              score={attempt.score}
              summary={formatSummary(attempt)}
            />
            {index < recentAttempts.length - 1 && (
              <View style={{ height: 12 }} />
            )}
          </View>
        ))
      ) : (
        <Text style={TYPOGRAPHY.body}>No recent activity yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 28,
  },
});
