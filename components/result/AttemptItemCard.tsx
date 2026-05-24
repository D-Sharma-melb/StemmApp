import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CardContainer } from "../shared/CardContainer";
import { COLORS } from "../../styles/colors";
import { TYPOGRAPHY } from "../../styles/typography";

type FirestoreTimestampLike = {
  toDate?: () => Date;
  seconds?: number;
};

export interface AttemptItem {
  id: string;
  activityId?: string;
  score?: number;
  createdAt?: FirestoreTimestampLike | string | number | Date;
}

interface AttemptItemCardProps {
  attempt: AttemptItem;
}

function formatDate(value: AttemptItem["createdAt"]) {
  if (!value) return "Unknown date";

  if (value instanceof Date) {
    return value.toLocaleString();
  }

  if (typeof value === "string" || typeof value === "number") {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? "Unknown date" : parsed.toLocaleString();
  }

  if (typeof value === "object") {
    if (typeof value.toDate === "function") {
      return value.toDate().toLocaleString();
    }
    if (typeof value.seconds === "number") {
      return new Date(value.seconds * 1000).toLocaleString();
    }
  }

  return "Unknown date";
}

export function AttemptItemCard({ attempt }: AttemptItemCardProps) {
  return (
    <CardContainer style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.activity}>{attempt.activityId || "Unknown Activity"}</Text>
        <Text style={styles.score}>Score: {attempt.score ?? 0}</Text>
      </View>
      <Text style={styles.date}>Created: {formatDate(attempt.createdAt)}</Text>
    </CardContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  activity: {
    ...TYPOGRAPHY.cardTitle,
    textTransform: "capitalize",
    flex: 1,
  },
  score: {
    ...TYPOGRAPHY.body,
    color: COLORS.primary,
    fontFamily: "Poppins_600SemiBold",
  },
  date: {
    ...TYPOGRAPHY.subText,
    marginTop: 8,
  },
});
