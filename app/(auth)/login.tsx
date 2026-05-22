import { router } from "expo-router";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import React, { useState } from "react";

import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  AppButton,
  AppInput,
  ScreenContainer,
} from "../../components/shared";

import {
  auth,
  db,
} from "../../config/firebase";

import { COLORS } from "../../styles/colors";
import { TYPOGRAPHY } from "../../styles/typography";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert(
          "Error",
          "Please fill all fields"
        );
        return;
      }

      // 1. Login
      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = userCredential.user;

      // 2. Get Firestore User Data
      const userDoc = await getDoc(
        doc(db, "users", user.uid)
      );

      if (!userDoc.exists()) {
        Alert.alert(
          "Error",
          "User profile not found"
        );
        return;
      }

      const userData = userDoc.data();

      console.log("Logged In User:");
      console.log(userData);

      router.replace("/(tabs)");

    } catch (error: any) {
      Alert.alert(
        "Login Error",
        error.message
      );
    }
  };

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        <ScrollView
          contentContainerStyle={
            styles.scrollContent
          }
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={TYPOGRAPHY.screenTitle}>
              Welcome Back
            </Text>

            <Text
              style={[
                TYPOGRAPHY.body,
                styles.subtitle,
              ]}
            >
              Login to your STEMM account
            </Text>
          </View>

          <View style={styles.form}>
            <AppInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <View style={{ height: 16 }} />

            <AppInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <View style={styles.buttonContainer}>
              <AppButton
                title="Login"
                onPress={handleLogin}
              />
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={TYPOGRAPHY.subText}>
              Don't have an account?
            </Text>

            <TouchableOpacity
              onPress={() =>
                router.push(
                  "/(auth)/register"
                )
              }
            >
              <Text style={styles.linkText}>
                Register
              </Text>
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