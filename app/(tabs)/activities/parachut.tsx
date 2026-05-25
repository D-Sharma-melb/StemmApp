import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { ParachuteDiagram } from "../../../components/activity/parachute/ParachuteDiagram";
import { ParachuteForm } from "../../../components/activity/parachute/ParachuteForm";
import { ActivityLayout } from "../../../components/shared/ActivityLayout";
import { AppButton } from "../../../components/shared/AppButton";
import { auth } from "../../../config/firebase";
import { saveAttempt } from "../../../services/firebase/attempts";
import { COLORS as colors } from "../../../styles/colors";
import { TYPOGRAPHY as typography } from "../../../styles/typography";

export default function ParachuteActivity() {
  const router = useRouter();
  const user = auth.currentUser;

  const [results, setResults] = useState<Record<string, any> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!user) {
      Alert.alert("Error", "Must be logged in to save attempts.");
      return;
    }

    if (!results) {
      Alert.alert("No results", "Please run the calculation before saving.");
      return;
    }

    setIsSaving(true);
    try {
      const score = results.finalVelocity ?? 0;

      await saveAttempt({
        activityId: "parachute",
        userId: user.uid,
        teamId: null,
        score,
        metadata: results,
      });

      router.push({
        pathname: "/(tabs)/activities/results",
        params: {
          score: score.toString(),
          metric: "m/s",
          activityType: "Parachute Challenge",
        },
      });
    } catch (error) {
      Alert.alert("Error", "Failed to save activity data");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ActivityLayout
      title="Parachute Challenge"
      instructions="Design and test parachutes. Record times and calculate forces."
    >
      <ScrollView contentContainerStyle={styles.container}>
        <ParachuteDiagram />

        <ParachuteForm onResults={setResults} />

        <View style={styles.resultsHeader}>
          <Text style={styles.resultsTitle}>Latest Results</Text>
          <Text>
            Final velocity:{" "}
            {results
              ? `${Number(results.finalVelocity).toFixed(2)} m/s`
              : "---"}
          </Text>
          <Text>
            G-force:{" "}
            {results && results.gForce !== null
              ? `${Number(results.gForce).toFixed(2)} g`
              : "---"}
          </Text>
        </View>

        <AppButton
          title={isSaving ? "Saving..." : "Finish & Save"}
          onPress={handleSave}
          disabled={isSaving || !results}
        />
      </ScrollView>
    </ActivityLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    alignItems: "center",
  },
  resultsHeader: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  resultsTitle: {
    ...typography.cardTitle,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
