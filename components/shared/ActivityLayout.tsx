import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SPACING } from '../../styles/spacing';
import { ScreenContainer } from './ScreenContainer';
import { AppHeader } from './AppHeader';

interface Props {
  title: string;
  instructions: string;
  children: React.ReactNode;
  sensorData?: React.ReactNode;
  buttons?: React.ReactNode;
  onBack?: () => void;
}

export const ActivityLayout: React.FC<Props> = ({ title, instructions, children, sensorData, buttons, onBack }) => (
  <ScreenContainer style={styles.container}>
    <AppHeader title={title} onBack={onBack} />
    <ScrollView contentContainerStyle={styles.scroll}>
      <Text style={styles.instructions}>{instructions}</Text>
      
      <View style={styles.mainArea}>
        {children}
      </View>

      {sensorData && <View style={styles.sensorArea}>{sensorData}</View>}
    </ScrollView>
    {buttons && <View style={styles.buttonArea}>{buttons}</View>}
  </ScreenContainer>
);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
  },
  scroll: {
    flexGrow: 1,
    paddingVertical: SPACING.sectionGap,
  },
  instructions: {
    fontSize: 16,
    color: '#3E3E3E',
    marginBottom: SPACING.sectionGap,
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
  },
  mainArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sectionGap,
  },
  sensorArea: {
    marginBottom: SPACING.sectionGap,
  },
  buttonArea: {
    paddingBottom: SPACING.screenPadding,
  }
});