import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../styles/colors";
import { SPACING } from "../../styles/spacing";
import { TYPOGRAPHY } from "../../styles/typography";
import { CardContainer } from "../shared/CardContainer";

interface ProfileDetailsProps {
  className: string;
  teamId: string;
  email: string;
}

export function ProfileDetails({
  className,
  teamId,
  email,
}: ProfileDetailsProps) {
  return (
    <CardContainer style={styles.card}>
      <Text style={styles.sectionTitle}>Profile Details</Text>

      <View style={styles.detailRow}>
        <View style={styles.iconContainer}>
          <Ionicons name="school-outline" size={24} color={COLORS.primary} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Class</Text>
          <Text style={styles.value}>{className || "Not assigned"}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.detailRow}>
        <View style={styles.iconContainer}>
          <Ionicons name="people-outline" size={24} color={COLORS.primary} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Team</Text>
          <Text style={styles.value}>{teamId || "No team"}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.detailRow}>
        <View style={styles.iconContainer}>
          <Ionicons name="mail-outline" size={24} color={COLORS.primary} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{email}</Text>
        </View>
      </View>
    </CardContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: SPACING.screenPadding,
    marginTop: SPACING.sectionGap,
  },
  sectionTitle: {
    ...TYPOGRAPHY.sectionTitle,
    color: COLORS.text,
    marginBottom: SPACING.itemGap,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.itemGap,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.itemGap,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    ...TYPOGRAPHY.subText,
    marginBottom: 2,
  },
  value: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.itemGap,
  },
});
