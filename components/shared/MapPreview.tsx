import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../styles/colors';
import { CardContainer } from './CardContainer';

export const MapPreview: React.FC = () => (
  <CardContainer style={styles.container}>
    <View style={styles.placeholderMap}>
      <Ionicons name="map-outline" size={48} color={COLORS.subText} />
    </View>
    <View style={styles.badge}>
      <Ionicons name="location" size={16} color="#FFF" />
    </View>
  </CardContainer>
);

const styles = StyleSheet.create({
  container: {
    padding: 0,
    overflow: 'hidden',
    height: 150,
  },
  placeholderMap: {
    flex: 1,
    backgroundColor: '#EAEAEA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: COLORS.primary,
    padding: 8,
    borderRadius: 20,
    elevation: 2,
  }
});