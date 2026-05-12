import React, { useState } from 'react';
import { TextInput, StyleSheet, View, TextInputProps } from 'react-native';
import { COLORS } from '../../styles/colors';
import { TYPOGRAPHY } from '../../styles/typography';

export const AppInput: React.FC<TextInputProps> = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, isFocused && styles.focused]}>
      <TextInput 
        style={styles.input} 
        placeholderTextColor="#9E9E9E"
        onFocus={(e) => { setIsFocused(true); props.onFocus?.(e); }}
        onBlur={(e) => { setIsFocused(false); props.onBlur?.(e); }}
        {...props} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F7',
    borderRadius: 14,
    height: 52,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: 'transparent',
    justifyContent: 'center',
  },
  focused: {
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    ...TYPOGRAPHY.body,
  }
});