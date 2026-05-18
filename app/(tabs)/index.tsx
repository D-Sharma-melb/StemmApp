import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { ScreenContainer, AppHeader } from '../../components/shared/index';
import {
  WelcomeHeader,
  TeamSummaryCard,
  FeaturedChallenge,
  QuickActivities,
  ProgressStatistics,
  RecentResults,
  LeaderboardPreview,
  TipOfTheDay,
  UpcomingChallenge
} from '../../components/dashboard/index';

export default function DashboardScreen() {
  return (
    <ScreenContainer>
      <AppHeader title="Dashboard" rightIcon="notifications-outline" onRightPress={() => {}} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <WelcomeHeader />
        <TeamSummaryCard />
        <FeaturedChallenge />
        <QuickActivities />
        <ProgressStatistics />
        <RecentResults />
        <LeaderboardPreview />
        <TipOfTheDay />
        <UpcomingChallenge />

      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
  },
});

