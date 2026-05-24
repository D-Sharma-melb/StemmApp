import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../styles/colors";
import { SHADOWS } from "../../styles/shadows";
import { SPACING } from "../../styles/spacing";
import { TYPOGRAPHY } from "../../styles/typography";

interface ProfileHeaderProps {
  firstName: string;
  lastName: string;
}

export function ProfileHeader({ firstName, lastName }: ProfileHeaderProps) {
  const initials =
    `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
  const fullName = `${firstName || ""} ${lastName || ""}`.trim() || "User";

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>{initials || "?"}</Text>
      </View>
      <Text style={styles.nameText}>{fullName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: SPACING.sectionGap,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.itemGap,
    ...SHADOWS.card,
  },
  avatarText: {
    ...TYPOGRAPHY.screenTitle,
    color: COLORS.background,
  },
  nameText: {
    ...TYPOGRAPHY.sectionTitle,
    color: COLORS.text,
  },
});
