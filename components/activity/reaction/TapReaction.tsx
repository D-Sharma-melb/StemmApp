import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS as colors } from "../../../styles/colors";
import { TYPOGRAPHY as typography } from "../../../styles/typography";
import { AppButton } from "../../shared/AppButton";

interface TapReactionProps {
  onComplete: (timeMs: number) => void;
  title: string;
}

export function TapReaction({ onComplete, title }: TapReactionProps) {
  const [gameState, setGameState] = useState<"idle" | "waiting" | "ready">(
    "idle",
  );
  const [startTime, setStartTime] = useState<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleStart = () => {
    setGameState("waiting");

    // random delay 1-3 seconds
    const delay = Math.random() * 2000 + 1000;

    timeoutRef.current = setTimeout(() => {
      setGameState("ready");
      setStartTime(Date.now());
    }, delay);
  };

  const handleTap = () => {
    if (gameState === "waiting") {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setGameState("idle");
      alert("Too soon! Wait for the button to turn GREEN.");
    } else if (gameState === "ready") {
      const endTime = Date.now();
      const reactTime = endTime - startTime;
      setGameState("idle");
      onComplete(reactTime);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {gameState === "idle" ? (
        <AppButton title="Start" onPress={handleStart} variant="primary" />
      ) : (
        <TouchableOpacity
          style={[
            styles.touchArea,
            gameState === "waiting" ? styles.waitingArea : styles.readyArea,
          ]}
          activeOpacity={0.8}
          onPress={handleTap}
        >
          <Text style={styles.touchText}>
            {gameState === "waiting" ? "Wait..." : "TAP NOW!"}
          </Text>
        </TouchableOpacity>
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
  },
  title: {
    ...typography.sectionTitle,
    marginBottom: 20,
  },
  touchArea: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  waitingArea: {
    backgroundColor: colors.danger,
  },
  readyArea: {
    backgroundColor: "#4CAF50", // Green
  },
  touchText: {
    ...typography.screenTitle,
    color: "#fff",
    fontWeight: "bold",
  },
});
