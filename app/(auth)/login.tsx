import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { AppButton, AppInput, ScreenContainer } from "../../components/shared";
import { COLORS } from "../../styles/colors";
import { TYPOGRAPHY } from "../../styles/typography";

export default function LoginScreen() {
  const [teamName, setTeamName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Navigate to tabs
    router.replace("/(tabs)");
  };

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={TYPOGRAPHY.screenTitle}>Welcome Back</Text>
            <Text style={[TYPOGRAPHY.body, styles.subtitle]}>
              Login to your STEMM account
            </Text>
          </View>

          <View style={styles.form}>
            <AppInput
              placeholder="Team Name"
              value={teamName}
              onChangeText={setTeamName}
            />
            <View style={{ height: 16 }} />
            <AppInput placeholder="ID" value={id} onChangeText={setId} />
            <View style={{ height: 16 }} />
            <AppInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <View style={styles.buttonContainer}>
              <AppButton title="Login" onPress={handleLogin} />
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={TYPOGRAPHY.subText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
              <Text style={styles.linkText}>Register</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 32,
  },
  header: {
    marginBottom: 32,
  },
  subtitle: {
    color: "#757575",
    marginTop: 8,
  },
  form: {
    marginBottom: 32,
  },
  buttonContainer: {
    marginTop: 24,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
  },
  linkText: {
    ...TYPOGRAPHY.subText,
    color: COLORS.primary,
    fontFamily: "Poppins_600SemiBold",
  },
});
