import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { ExerciseState, PhaseSelector } from "../../../components/activity/breathing/PhaseSelector";
import { ActivityLayout } from "../../../components/shared/ActivityLayout";
import { AppButton } from "../../../components/shared/AppButton";
import { AppInput } from "../../../components/shared/AppInput";
import { SensorDataCard } from "../../../components/shared/SensorDataCard";
import { useBreathingSensor } from "../../../hooks/useBreathingSensor";
import { saveAttempt } from "../../../services/firebase/attempts";
import { COLORS } from "../../../styles/colors";
import { TYPOGRAPHY } from "../../../styles/typography";

export default function Breathing() {
  const [mode, setMode] = useState<ExerciseState>('Resting');
  const [prediction, setPrediction] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const { bpm, smoothness, currentZ } = useBreathingSensor(isRecording);

  // Timer logic
  useEffect(() => {
    let timerId: ReturnType<typeof setInterval>;
    if (isRecording && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isRecording && timeLeft === 0) {
      handleStop();
    }
    return () => clearInterval(timerId);
  }, [isRecording, timeLeft]);

  const handleStart = () => {
    setIsRecording(true);
    setTimeLeft(60);
  };

  const handleStop = async () => {
    setIsRecording(false);
    
    try {
      await saveAttempt({
        activityId: 'breathing',
        userId: 'temp-user',
        teamId: 'temp-team',
        score: bpm, // Using detected Breaths Per Minute as main score
        metadata: {
          state: mode,
          prediction: prediction,
          smoothness: smoothness,
          duration: 60 - timeLeft
        },
      });
      Alert.alert('Success', 'Breathing attempt saved successfully!');
    } catch (err) {
      console.log('Error saving', err);
      Alert.alert('Finished', 'Result finished (Firebase not connected or error saving).');
    }
  };

  return (
    <ActivityLayout
      title="Breathing Pace"
      instructions="Place the phone on your chest. Select mode, predict BPM, and start recording."
      onBack={() => router.back()}
      buttons={
        !isRecording ? 
          <AppButton title="Start Recording" onPress={handleStart} /> :
          <AppButton title="Stop Recording (or wait)" variant="secondary" onPress={handleStop} />
      }
      sensorData={
        <View style={styles.sensorGrid}>
           <SensorDataCard icon="timer-outline" label="Time Left" value={`${timeLeft}s`} />
           <SensorDataCard icon="pulse-outline" label="BPM" value={`${bpm}`} />
        </View>
      }
    >
      {!isRecording ? (
        <View style={styles.setupContainer}>
           <Text style={styles.label}>1. Select Exercise State</Text>
           <PhaseSelector selected={mode} onSelect={setMode} />
           
           <Text style={styles.label}>2. Predict Breaths Per Min</Text>
           <View style={{ marginBottom: 20 }}>
             <AppInput 
                placeholder="e.g. 15"
                keyboardType="number-pad"
                value={prediction}
                onChangeText={setPrediction}
             />
           </View>
           
           {smoothness > 0 && (
              <View style={styles.lastResult}>
                <Text style={styles.lastResultTitle}>Last Calculation</Text>
                <Text style={styles.lastResultText}>Smoothness Score: {smoothness}/100</Text>
              </View>
           )}
        </View>
      ) : (
        <View style={styles.recordingContainer}>
          <Text style={styles.recordingText}>Recording...</Text>
          <Text style={styles.accelText}>Chest Movement (Z): {currentZ.toFixed(2)}</Text>
        </View>
      )}
    </ActivityLayout>
  );
}

const styles = StyleSheet.create({
  sensorGrid: {
    gap: 12,
  },
  setupContainer: {
    width: '100%',
  },
  label: {
     ...TYPOGRAPHY.body,
     fontFamily: 'Poppins_600SemiBold',
     marginBottom: 12
  },
  recordingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  recordingText: {
    ...TYPOGRAPHY.screenTitle,
    color: COLORS.primary,
    marginBottom: 12
  },
  accelText: {
    ...TYPOGRAPHY.body,
    color: COLORS.subText,
  },
  lastResult: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    alignItems: 'center'
  },
  lastResultTitle: {
    ...TYPOGRAPHY.cardTitle,
    marginBottom: 8
  },
  lastResultText: {
    ...TYPOGRAPHY.body,
    color: COLORS.primary
  }
});