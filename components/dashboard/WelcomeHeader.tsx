import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { auth } from "../../config/firebase";
import { getUserProfile } from "../../services/firebase/users";
import { TYPOGRAPHY } from "../../styles/typography";

export function WelcomeHeader() {
  const [userName, setUserName] = useState<string>("Student");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const profile = await getUserProfile(user.uid);
          if (profile && profile.firstName) {
            setUserName(profile.firstName);
          }
        }
      } catch (error) {
        console.error("Failed to fetch user profile in header:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <View style={styles.headerSection}>
      <Text style={TYPOGRAPHY.screenTitle}>Hello, {userName}! 👋</Text>
      <Text style={TYPOGRAPHY.subText}>Ready for today's STEMM adventure?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerSection: {
    paddingTop: 48,
    marginBottom: 24,
  },
});
