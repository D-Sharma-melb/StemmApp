import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ActivityFeedEntry } from "../../services/firebase/leaderboard";
import { COLORS } from "../../styles/colors";
import { TYPOGRAPHY } from "../../styles/typography";
import { CardContainer } from "../shared/CardContainer";

interface Props {
  data: ActivityFeedEntry[];
}

export const RecentActivityFeed: React.FC<Props> = ({ data }) => {
  return (
    <CardContainer style={styles.container}>
      <Text style={styles.title}>Recent Activity</Text>
      {data.map((item, index) => (
        <View
          key={item.id}
          style={[styles.row, index === data.length - 1 && styles.lastRow]}
        >
          <Text style={styles.text}>
            <Text style={styles.bold}>{item.userName}</Text> scored {item.score}{" "}
            in <Text style={styles.bold}>{item.activityId}</Text>
          </Text>
        </View>
      ))}
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20,
  },
  title: {
    ...TYPOGRAPHY.sectionTitle,
    marginBottom: 16,
  },
  row: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  text: {
    ...TYPOGRAPHY.body,
    fontSize: 14,
  },
  bold: {
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.primary,
  },
});
