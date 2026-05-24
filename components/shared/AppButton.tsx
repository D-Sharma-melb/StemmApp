import React, { useRef } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../../styles/colors";
import { SHADOWS } from "../../styles/shadows";
import { TYPOGRAPHY } from "../../styles/typography";

interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  style?: any;
  disabled?: boolean;
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  style,
  disabled = false,
}) => {
  const isPrimary = variant === "primary";
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <Animated.View
      style={[{ transform: [{ scale: scaleAnim }], width: "100%" }, style]}
    >
      <TouchableOpacity
        style={[
          styles.button,
          isPrimary ? styles.primary : styles.secondary,
          disabled && { opacity: 0.5 },
        ]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
        disabled={disabled}
      >
        <Text
          style={[
            styles.text,
            { color: isPrimary ? "#FFFFFF" : COLORS.primary },
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.card,
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.primaryLight,
  },
  text: {
    ...TYPOGRAPHY.button,
  },
});
