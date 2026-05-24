import React from "react";

import {
  Alert,
} from "react-native";

import {
  render,
  fireEvent,
  waitFor,
} from "@testing-library/react-native"

import LoginScreen
from "../app/(auth)/login";

// Mock Expo Router
jest.mock("expo-router", () => ({
  router: {
    replace: jest.fn(),
    push: jest.fn(),
  },
}));

// Mock Firebase
jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
}));

jest.mock("../config/firebase", () => ({
  auth: {},
  db: {},
}));

describe("Login Validation", () => {

  test(
    "shows alert when fields are empty",
    async () => {

      const alertSpy =
        jest.spyOn(Alert, "alert");

      const { getByText } =
        render(<LoginScreen />);

      fireEvent.press(
        getByText("Login")
      );

      await waitFor(() => {

        expect(alertSpy)
          .toHaveBeenCalledWith(
            "Error",
            "Please fill all fields"
          );
      });
    }
  );
});