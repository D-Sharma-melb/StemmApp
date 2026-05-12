import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../styles/colors';

interface Props {
  onPress: () => void;
}

export const MediaUploadButton: React.FC<Props> = ({ onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Ionicons name="cloud-upload-outline" size={32} color={COLORS.primary} />
    <Text style={styles.text}>Upload Photo/Video</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    height: 120,
    backgroundColor: COLORS.primaryLight,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 8,
    fontFamily: 'Poppins_500Medium',
    color: COLORS.primary,
  }
});