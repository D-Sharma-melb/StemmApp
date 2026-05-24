import React from "react";
import { StyleSheet, View } from "react-native";
import { AppButton } from "../../shared/AppButton";

export type EqMode = "Mild" | "Moderate" | "Severe";

interface Props {
  selected: EqMode;
  onSelect: (mode: EqMode) => void;
}

export const EarthquakeModeSelector: React.FC<Props> = ({
  selected,
  onSelect,
}) => {
  const modes: EqMode[] = ["Mild", "Moderate", "Severe"];

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
