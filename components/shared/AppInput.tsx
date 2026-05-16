import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

import { COLORS } from "../../styles/colors";
import { TYPOGRAPHY } from "../../styles/typography";

export const AppInput: React.FC<TextInputProps> = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        styles.container,
        isFocused && styles.containerFocused,
      ]}
    >
      <TextInput
        {...props}
        style={styles.input}
        placeholderTextColor="#9E9E9E"
        autoCorrect={false}
        autoCapitalize="none"
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F7F7",
    borderRadius: 14,
    minHeight: 52,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    justifyContent: "center",
  },

  containerFocused: {
    borderColor: COLORS.primary,
  },

  input: {
    fontSize: 16,
    color: "#3E3E3E",
    paddingVertical: 12,
      
  },
});