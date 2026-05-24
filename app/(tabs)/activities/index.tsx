import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ActivityCard } from "../../../components/shared/ActivityCard";
import { ScreenContainer } from "../../../components/shared/ScreenContainer";
import { SPACING } from "../../../styles/spacing";
import { TYPOGRAPHY } from "../../../styles/typography";

const activities = [
  {
    id: "reaction",
    title: "Reaction",
    description: "Test your reaction time.",
    iconName: "timer-outline" as const,
    accentColor: "#FF5722",
    route: "/(tabs)/activities/reaction",
  },
  {
    id: "sound",
    title: "Sound",
    description: "Measure the environment sound level.",
    iconName: "mic-outline" as const,
    accentColor: "#2196F3",
    route: "/(tabs)/activities/sound",
  },
  {
    id: "breathing",
    title: "Breathing",
    description: "Guided breathing exercises.",
    iconName: "water-outline" as const,
    accentColor: "#00BCD4",
    route: "/(tabs)/activities/breathing",
  },
  {
    id: "earthquake",
    title: "Earthquake",
    description: "Use the accelerometer to measure vibrations.",
    iconName: "pulse-outline" as const,
    accentColor: "#4CAF50",
    route: "/(tabs)/activities/earthquake",
  },
  {
    id: "results",
    title: "Results",
    description: "View your activity results and statistics.",
    iconName: "bar-chart-outline" as const,
    accentColor: "#9C27B0",
    route: "/(tabs)/activities/results",
  },
];

export default function ActivitiesScreen() {
  return (
    <ScreenContainer>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[TYPOGRAPHY.screenTitle, styles.header]}>Activities</Text>
        <View style={styles.grid}>
          {activities.map((activity) => (
            <View key={activity.id} style={styles.gridItem}>
              <ActivityCard
                title={activity.title}
                description={activity.description}
                iconName={activity.iconName}
                accentColor={activity.accentColor}
                onStart={() => router.push(activity.route as any)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: SPACING.sectionGap,
  },
  header: {
    marginBottom: SPACING.sectionGap,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "48%",
    marginBottom: SPACING.itemGap,
  },
});
