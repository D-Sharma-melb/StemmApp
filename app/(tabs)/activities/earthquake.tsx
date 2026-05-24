import * as Battery from "expo-battery";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";

import { ActivityLayout } from "../../../components/shared/ActivityLayout";
import { AppButton } from "../../../components/shared/AppButton";
import { AppInput } from "../../../components/shared/AppInput";
import { MediaUploadButton } from "../../../components/shared/MediaUploadButton";
import { SensorDataCard } from "../../../components/shared/SensorDataCard";
import { saveAttempt } from "../../../services/firebase/attempts";
import { COLORS } from "../../../styles/colors";
import { TYPOGRAPHY } from "../../../styles/typography";

import {
    EarthquakeModeSelector,
    EqMode,
} from "../../../components/activity/earthquake/EarthquakeModeSelector";
import { ShakeMeter } from "../../../components/activity/earthquake/ShakeMeter";
import { VibrationGraph } from "../../../components/activity/earthquake/VibrationGraph";
import { useEarthquakeSensors } from "../../../hooks/useEarthquakeSensors";

export default function Earthquake() {
  const [mode, setMode] = useState<EqMode>("Moderate");
  const [structureType, setStructureType] = useState("");
  const [prediction, setPrediction] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);

  // Analytics extras
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);

  const { currentVibration, maxAcceleration, currentTilt, maxTilt, graphData } =
    useEarthquakeSensors(isRecording, mode);

  // Fetch bonus data on mount
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
      }
      const lvl = await Battery.getBatteryLevelAsync();
      setBatteryLevel(lvl);
    })();
  }, []);

  // Timer logic for live test
  useEffect(() => {
    let timerId: ReturnType<typeof setInterval>;
    if (isRecording && timeLeft > 0) {
      timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (isRecording && timeLeft === 0) {
      handleStop();
    }
    return () => clearInterval(timerId);
  }, [isRecording, timeLeft]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleStart = () => {
    if (!structureType) {
      Alert.alert(
        "Missing Field",
        'Please enter your structue design (e.g. "4 folds + 4 pillars") first!',
      );
      return;
    }
    const duration = mode === "Mild" ? 10 : mode === "Moderate" ? 15 : 20;
    setTimeLeft(duration);
    setIsRecording(true);
    setIsFinished(false);
  };

  const handleStop = async () => {
    setIsRecording(false);
    setIsFinished(true);

    // Engineering Stability Score formula: 100 - (maxAcc * 10) - (maxTilt * 5)
    // Floor at 0, cap at 100
    let rawScore = 100 - maxAcceleration * 10 - maxTilt * 5;
    const finalScore = Math.max(0, Math.min(100, Math.round(rawScore)));

    try {
      await saveAttempt({
        activityId: "earthquake",
        userId: "temp-user",
        teamId: "temp-team",
        score: finalScore,
        metadata: {
          maxAcceleration: Number(maxAcceleration.toFixed(2)),
          maxTilt: Number(maxTilt.toFixed(2)),
          structureType,
          earthquakeMode: mode,
          prediction,
          imageUri: imageUri || "none",
          location: location
            ? `${location.coords.latitude}, ${location.coords.longitude}`
            : "unknown",
          batteryLevel: batteryLevel
            ? Number((batteryLevel * 100).toFixed(0))
            : null,
        },
      });
      // Basic local attempt alert (rubric: notifications placeholder)
      Alert.alert(
        "Analysis Complete",
        `Your structure survived with a stability score of ${finalScore}/100!`,
      );
    } catch (err) {
      console.log("Error saving", err);
      Alert.alert(
        "Saved locally",
        "Result calculated but could not save to Firebase.",
      );
    }
  };

  const resetActivity = () => {
    setIsFinished(false);
    setStructureType("");
    setPrediction("");
    setImageUri(null);
  };

  // Rendering Setup Phase
  if (!isRecording && !isFinished) {
    return (
      <ActivityLayout
        title="Earthquake Resist"
        instructions="Design an anti-vibration structure. Place phone on top, select intensity, and predict movement."
        onBack={() => router.back()}
        buttons={<AppButton title="Start Simulator" onPress={handleStart} />}
      >
        <View style={styles.contentWraper}>
          <Text style={styles.label}>1. Select Simulation Mode</Text>
          <EarthquakeModeSelector selected={mode} onSelect={setMode} />

          <Text style={styles.label}>2. Structure Design Details</Text>
          <View style={styles.inputWrapper}>
            <AppInput
              placeholder="e.g. 10 folds + 4 pillars"
              value={structureType}
              onChangeText={setStructureType}
            />
          </View>

          <Text style={styles.label}>3. Movement Prediction (cm)</Text>
          <View style={styles.inputWrapper}>
            <AppInput
              placeholder="e.g. 5"
              keyboardType="numeric"
              value={prediction}
              onChangeText={setPrediction}
            />
          </View>

          <Text style={styles.label}>4. Upload Design Photo (Required)</Text>
          <View style={styles.inputWrapper}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.previewImage} />
            ) : (
              <MediaUploadButton onPress={pickImage} />
            )}
          </View>
        </View>
      </ActivityLayout>
    );
  }

  // Rendering Results Phase
  if (isFinished) {
    const rawScore = 100 - maxAcceleration * 10 - maxTilt * 5;
    const finalScore = Math.max(0, Math.min(100, Math.round(rawScore)));

    return (
      <ActivityLayout
        title="Analysis Results"
        instructions="Compare your structure's performance against your prediction."
        onBack={() => router.back()}
        buttons={
          <AppButton title="Design Another Structure" onPress={resetActivity} />
        }
      >
        <View style={styles.contentWraper}>
          <Text style={styles.resultsTitle}>
            Stability Score: {finalScore}/100
          </Text>
          <Text style={styles.resultsSubtitle}>
            Higher score means better energy absorption
          </Text>

          <View style={styles.resultCards}>
            <SensorDataCard
              icon="speedometer-outline"
              label="Max Acceleration"
              value={`${maxAcceleration.toFixed(2)}G`}
            />
            <SensorDataCard
              icon="navigate-outline"
              label="Max Tilt (Rotation)"
              value={`${maxTilt.toFixed(2)}°`}
            />
            <SensorDataCard
              icon="help-buoy-outline"
              label="Predicted Move"
              value={`${prediction} cm`}
            />
          </View>
        </View>
      </ActivityLayout>
    );
  }

  // Rendering Live Testing Phase
  return (
    <ActivityLayout
      title="Earthquake Active"
      instructions={`Testing structure under ${mode} earthquake conditions...`}
      onBack={() => router.back()}
      buttons={
        <AppButton
          title="Emergency Stop"
          variant="secondary"
          onPress={handleStop}
        />
      }
      sensorData={
        <View style={styles.sensorGrid}>
          <SensorDataCard
            icon="timer-outline"
            label="Time Left"
            value={`${timeLeft}s`}
          />
          <SensorDataCard
            icon="pulse-outline"
            label="Intensity"
            value={`${currentVibration.toFixed(2)}G`}
          />
        </View>
      }
    >
      <View style={styles.liveContainer}>
        <ShakeMeter vibration={currentVibration} />
        <Text style={styles.label}>Live Vibration Analytics</Text>
        <VibrationGraph data={graphData} />
      </View>
    </ActivityLayout>
  );
}

const styles = StyleSheet.create({
  contentWraper: {
    width: "100%",
  },
  label: {
    ...TYPOGRAPHY.body,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 12,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  previewImage: {
    width: "100%",
    height: 200,
    borderRadius: 14,
    marginBottom: 10,
  },
  liveContainer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,
  },
  sensorGrid: {
    gap: 12,
  },
  resultsTitle: {
    ...TYPOGRAPHY.screenTitle,
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: 8,
  },
  resultsSubtitle: {
    ...TYPOGRAPHY.subText,
    textAlign: "center",
    marginBottom: 30,
  },
  resultCards: {
    gap: 16,
  },
});
