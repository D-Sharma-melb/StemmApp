import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { COLORS as colors } from "../../../styles/colors";
import { TYPOGRAPHY as typography } from "../../../styles/typography";

interface TracingChallengeProps {
  onComplete: (accuracyMs: number) => void;
}

export function TracingChallenge({ onComplete }: TracingChallengeProps) {
  const [gameState, setGameState] = useState<"idle" | "tracing" | "done">(
    "idle",
  );
  const [startTime, setStartTime] = useState<number>(0);
  const [progress, setProgress] = useState(0);

  const pan = Gesture.Pan()
    .onStart(() => {
      if (gameState === "idle") {
        setGameState("tracing");
        setStartTime(Date.now());
        setProgress(0);
      }
    })
    .onUpdate((e) => {
      if (gameState === "tracing") {
        // Simple progress based on X coordinate moving right
        // The track is roughly 250px wide
        const currentProgress = Math.max(0, Math.min(100, (e.x / 250) * 100));
        setProgress(currentProgress);

        if (currentProgress >= 95) {
          // Finished tracing
          setGameState("done");
        }
      }
    })
    .onEnd(() => {
      if (gameState === "done") {
        const timeTaken = Date.now() - startTime;
        onComplete(timeTaken);
        setGameState("idle");
      } else if (gameState === "tracing") {
        // Let go too early
        setGameState("idle");
        setProgress(0);
      }
    });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Phase 3: Tracing Challenge</Text>
      <Text style={styles.instructions}>
        Drag the circle from left to right as fast as you can to stay on the
        path!
      </Text>

      <View style={styles.track}>
        <GestureDetector gesture={pan}>
          <View
            style={[
              styles.dragger,
              { transform: [{ translateX: (progress / 100) * 250 }] },
            ]}
          />
        </GestureDetector>
        {gameState === "done" && (
          <Text style={styles.doneText}>Tracing Complete!</Text>
        )}
      </View>

      {gameState === "idle" && progress === 0 && (
        <Text style={styles.hint}>Touch and drag to start</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: colors.primaryLight,
    borderRadius: 12,
    width: "100%",
  },
  title: {
    ...typography.sectionTitle,
    marginBottom: 8,
  },
  instructions: {
    ...typography.body,
    textAlign: "center",
    marginBottom: 20,
  },
  track: {
    width: 300,
    height: 60,
    backgroundColor: "#ddd",
    borderRadius: 30,
    justifyContent: "center",
    paddingHorizontal: 5,
    overflow: "hidden",
  },
  dragger: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    position: "absolute",
    left: 5,
    zIndex: 10,
  },
  hint: {
    marginTop: 15,
    color: colors.subText,
    fontStyle: "italic",
  },
  doneText: {
    position: "absolute",
    alignSelf: "center",
    fontWeight: "bold",
    color: colors.success,
    zIndex: 1,
  },
});
