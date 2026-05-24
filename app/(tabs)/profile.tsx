import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ProfileDetails } from "../../components/profile/ProfileDetails";
import { ProfileHeader } from "../../components/profile/ProfileHeader";
import { AppButton } from "../../components/shared/AppButton";
import { AppHeader } from "../../components/shared/AppHeader";
import { LoadingSpinner } from "../../components/shared/LoadingSpinner";
import { ScreenContainer } from "../../components/shared/ScreenContainer";
import { auth } from "../../config/firebase";
import { logoutUser } from "../../services/firebase/auth";
import { getUserProfile } from "../../services/firebase/users";
import { COLORS } from "../../styles/colors";
import { SPACING } from "../../styles/spacing";

export default function ProfileScreen() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userProfile = await getUserProfile(user.uid);
          setProfile(userProfile);
        }
      } catch (error) {
        console.error("Failed to load profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSignOut = async () => {
    try {
      await logoutUser();
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Sign out fail", error);
    }
  };

  if (loading) {
    return (
      <ScreenContainer style={styles.loadingContainer}>
        <LoadingSpinner />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <AppHeader title="My Profile" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {profile ? (
          <>
            <ProfileHeader
              firstName={profile.firstName}
              lastName={profile.lastName}
            />

            <ProfileDetails
              className={profile.className}
              teamId={profile.teamId}
              email={profile.email}
            />

            <View style={styles.buttonContainer}>
              <AppButton
                title="Sign Out"
                onPress={handleSignOut}
                variant="secondary"
                style={styles.signOutButton}
              />
            </View>
          </>
        ) : (
          <View style={styles.errorContainer}>
            <AppButton title="Sign Out & Return" onPress={handleSignOut} />
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: SPACING.screenPadding * 2,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  buttonContainer: {
    padding: SPACING.screenPadding,
    marginTop: SPACING.sectionGap,
  },
  signOutButton: {
    borderColor: COLORS.danger,
  },
  errorContainer: {
    padding: SPACING.screenPadding * 1.5,
    alignItems: "center",
  },
});
