import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../../styles/colors";
import { TYPOGRAPHY } from "../../styles/typography";

interface Props {
  tabs: string[];
  activeTab: string;
  onTabPress: (tab: string) => void;
}

export const ActivityTabs: React.FC<Props> = ({
  tabs,
  activeTab,
  onTabPress,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => onTabPress(tab)}
          >
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    maxHeight: 60,
  },
  contentContainer: {
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 12,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    ...TYPOGRAPHY.body,
    fontSize: 14,
    color: COLORS.subText,
  },
  activeTabText: {
    color: "#FFF",
    fontFamily: "Poppins_600SemiBold",
  },
});
