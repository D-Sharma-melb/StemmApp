import { router } from "expo-router";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { AppButton, AppInput, ScreenContainer } from "../../components/shared";
import { COLORS } from "../../styles/colors";
import { TYPOGRAPHY } from "../../styles/typography";

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [className, setClassName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        router.back();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Registration Error", errorMessage);
      });
  };

  return (
    <ScreenContainer>
      {/* <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      > */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="none"
      >
        <View style={styles.header}>
          <Text style={TYPOGRAPHY.screenTitle}>Create Account</Text>
          <Text style={[TYPOGRAPHY.body, styles.subtitle]}>
            Join the STEMM community
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.row}>
            <View style={styles.flexItem}>
              <AppInput
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
            <View style={{ width: 16 }} />
            <View style={styles.flexItem}>
              <AppInput
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
          </View>
          <View style={{ height: 16 }} />

          <AppInput
            placeholder="Class"
            value={className}
            onChangeText={setClassName}
          />
          <View style={{ height: 16 }} />

          <AppInput
            placeholder="Team Name"
            value={teamName}
            onChangeText={setTeamName}
          />
          <View style={{ height: 16 }} />

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
            <AppButton title="Register" onPress={handleRegister} />
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={TYPOGRAPHY.subText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.linkText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* </KeyboardAvoidingView> */}
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flexItem: {
    flex: 1,
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
