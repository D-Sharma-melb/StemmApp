import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { COLORS } from '../../styles/colors';
import { TYPOGRAPHY } from '../../styles/typography';

export const CommentBox: React.FC<TextInputProps> = (props) => (
  <TextInput
    style={styles.input}
    multiline
    placeholderTextColor="#9E9E9E"
    placeholder="What did your team learn?"
    textAlignVertical="top"
    {...props}
  />
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#F7F7F7',
    borderRadius: 14,
    minHeight: 120,
    padding: 16,
    ...TYPOGRAPHY.body,
  }
});