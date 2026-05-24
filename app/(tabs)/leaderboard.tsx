import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityTabs } from "../../components/leaderboard/ActivityTabs";
import { RecentActivityFeed } from "../../components/leaderboard/RecentActivityFeed";
import { AppHeader } from "../../components/shared/AppHeader";
import { EmptyState } from "../../components/shared/EmptyState";
import { LeaderboardCard } from "../../components/shared/LeaderboardCard";
import { LoadingSpinner } from "../../components/shared/LoadingSpinner";
import { ScreenContainer } from "../../components/shared/ScreenContainer";
import {
  ActivityFeedEntry,
  LeaderboardEntry,
  subscribeRecentActivity,
  subscribeTopTeams,
} from "../../services/firebase/leaderboard";
import { SPACING } from "../../styles/spacing";

const TABS = ["Overall", "Earthquake", "Breathing", "Reaction", "Sound"];

export default function LeaderboardScreen() {
  const [activeTab, setActiveTab] = useState("Overall");
  const [topTeams, setTopTeams] = useState<LeaderboardEntry[]>([]);
  const [recentFeed, setRecentFeed] = useState<ActivityFeedEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribeTeams = subscribeTopTeams(activeTab, (data) => {
      setTopTeams(data);
      setLoading(false);
    });

    // We only need to subscribe to recent activity once, independent of tab
    const unsubscribeFeed = subscribeRecentActivity((data) => {
      setRecentFeed(data);
    });

    return () => {
      unsubscribeTeams();
      unsubscribeFeed();
    };
  }, [activeTab]);

  const renderLeaderboardRows = () => {
    if (loading)
      return <LoadingSpinner text={`Loading ${activeTab} Standings...`} />;
    if (topTeams.length === 0)
      return (
        <EmptyState
          icon="trophy-outline"
          message="No rankings available yet."
        />
      );

    return topTeams.map((team) => {
      let subtitle = undefined;
      // Add custom engineering metadata if it's the Earthquake activity
      if (activeTab === "Earthquake" && team.metadata) {
        subtitle = `Max Tilt: ${team.metadata.maxTilt || 0}°, ${team.metadata.maxAcceleration || 0}G`;
      } else if (activeTab === "Breathing" && team.metadata) {
        subtitle = `Smoothness: ${team.metadata.smoothness || 0}/100`;
      }

      return (
        <LeaderboardCard
          key={team.id}
          rank={team.rank}
          teamName={team.teamName}
          score={team.score}
          subtitle={subtitle}
        />
      );
    });
  };

  return (
    <ScreenContainer style={styles.container}>
      <AppHeader title="Leaderboard" />

      <View style={styles.tabsContainer}>
        <ActivityTabs
          tabs={TABS}
          activeTab={activeTab}
          onTabPress={setActiveTab}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderLeaderboardRows()}

        {recentFeed.length > 0 && <RecentActivityFeed data={recentFeed} />}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0, // Tabs need to go edge-to-edge
  },
  tabsContainer: {
    marginBottom: SPACING.sectionGap,
  },
  scrollContent: {
    paddingHorizontal: SPACING.screenPadding,
    paddingBottom: SPACING.sectionGap,
  },
});
