import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { DecibelMeter } from "../../../components/activity/sound/DecibelMeter";
import { ActivityLayout } from "../../../components/shared/ActivityLayout";
import { AppButton } from "../../../components/shared/AppButton";
import { AppInput } from "../../../components/shared/AppInput";
import { auth } from "../../../config/firebase";
import { useDecibelMeter } from "../../../hooks/useDecibelMeter";
import { saveAttempt } from "../../../services/firebase/attempts";
import { COLORS as colors } from "../../../styles/colors";
import { TYPOGRAPHY as typography } from "../../../styles/typography";

interface ActionRecord {
  id: string;
  name: string;
  prediction: string;
  outcome: number;
  accurate: "Yes" | "No" | "Not Sure";
}

export default function SoundActivity() {
  const router = useRouter();
  const user = auth.currentUser;

  const {
    decibels,
    maxDecibels,
    isRecording,
    startMetering,
    stopMetering,
    resetMax,
    hasPermission,
  } = useDecibelMeter();

  const [actions, setActions] = useState<ActionRecord[]>([]);
  const [currentActionName, setCurrentActionName] = useState("");
  const [currentPrediction, setCurrentPrediction] = useState("");
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const toggleRecording = () => {
    if (isRecording) {
      stopMetering();
    } else {
      resetMax();
      startMetering();
    }
  };

  const recordAction = () => {
    if (!currentActionName) {
      Alert.alert("Missing Info", "Please enter an action name.");
      return;
    }

    const newAction: ActionRecord = {
      id: Date.now().toString(),
      name: currentActionName,
      prediction: currentPrediction || "N/A",
      outcome: maxDecibels,
      accurate: "Not Sure", // Could be updated by the user later depending on complexity
    };

    setActions([...actions, newAction]);
    setCurrentActionName("");
    setCurrentPrediction("");
    resetMax();
  };

  const handleSubmit = async () => {
    if (actions.length === 0) {
      Alert.alert("No Data", "Please record at least one sound action.");
      return;
    }

    if (!user) {
      Alert.alert("Error", "Must be logged in to save attempts.");
      return;
    }

    setIsSaving(true);
    try {
      if (isRecording) {
        await stopMetering();
      }

      await saveAttempt({
        activityId: "sound_pollution",
        userId: user.uid,
        teamId: null, // Depending on if we have team context
        score: actions.length, // Let's use number of actions recorded as a basic score
        metadata: {
          records: actions,
        },
      });

      router.push({
        pathname: "/(tabs)/activities/results",
        params: {
          score: actions.length.toString(),
          metric: "records",
          activityType: "Sound Pollution Hunter",
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
      title="Sound Pollution Hunter"
      instructions="Measure and map noise around you"
    >
      <ScrollView contentContainerStyle={styles.container}>
        {hasPermission === false ? (
          <Text style={styles.errorText}>
            Microphone permission is required.
          </Text>
        ) : (
          <DecibelMeter decibels={decibels} maxDecibels={maxDecibels} />
        )}

        <View style={styles.controls}>
          <AppButton
            title={isRecording ? "Stop Listening" : "Start Listening"}
            onPress={toggleRecording}
            variant={isRecording ? "secondary" : "primary"}
          />
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Record an Action</Text>
          <AppInput
            value={currentActionName}
            onChangeText={setCurrentActionName}
            placeholder="Action (e.g. dropping a book)"
          />
          <AppInput
            value={currentPrediction}
            onChangeText={setCurrentPrediction}
            placeholder="Prediction (e.g. louder than talking)"
          />
          <AppButton
            title={`Record Action (${maxDecibels} dB)`}
            onPress={recordAction}
            disabled={!isRecording && maxDecibels === 0}
          />
        </View>

        <View style={styles.recordsSection}>
          <Text style={styles.sectionTitle}>Recorded Actions</Text>
          {actions.length === 0 ? (
            <Text style={styles.emptyText}>No actions recorded yet.</Text>
          ) : (
            actions.map((action, index) => (
              <View key={action.id} style={styles.recordCard}>
                <Text style={styles.recordTitle}>
                  {index + 1}. {action.name}
                </Text>
                <Text>Prediction: {action.prediction}</Text>
                <Text>Outcome: {action.outcome} dB</Text>
              </View>
            ))
          )}
        </View>

        <AppButton
          title={isSaving ? "Saving..." : "Finish & Save"}
          onPress={handleSubmit}
          variant="primary"
          style={styles.submitBtn}
          disabled={isSaving || actions.length === 0}
        />
      </ScrollView>
    </ActivityLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  controls: {
    marginVertical: 16,
    alignItems: "center",
  },
  errorText: {
    color: colors.danger,
    textAlign: "center",
    marginVertical: 20,
  },
  formSection: {
    backgroundColor: colors.primaryLight,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    ...typography.sectionTitle,
    marginBottom: 12,
  },
  recordsSection: {
    marginBottom: 20,
  },
  recordCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  recordTitle: {
    ...typography.cardTitle,
    fontWeight: "bold",
  },
  emptyText: {
    color: colors.subText,
    fontStyle: "italic",
  },
  submitBtn: {
    marginTop: 10,
  },
});
