import React from "react";
import { StyleSheet, View } from "react-native";
import { AppButton } from "../../shared/AppButton";

export type ExerciseState = "Resting" | "After Jogging" | "After Star Jumps";

interface Props {
  selected: ExerciseState;
  onSelect: (state: ExerciseState) => void;
}

export const PhaseSelector: React.FC<Props> = ({ selected, onSelect }) => {
  const modes: ExerciseState[] = [
    "Resting",
    "After Jogging",
    "After Star Jumps",
  ];

  return (
    <View style={styles.container}>
      {modes.map((m) => (
        <AppButton
          key={m}
          title={m}
          variant={selected === m ? "primary" : "secondary"}
          onPress={() => onSelect(m)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
    marginBottom: 20,
  },
});
