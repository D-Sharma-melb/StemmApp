import React from "react";
import { StyleSheet, View } from "react-native";
import {
    BannerAd,
    BannerAdSize,
    TestIds,
} from "react-native-google-mobile-ads";

// Use Google's Test ID for development to prevent account bans
const adUnitId = __DEV__
  ? TestIds.BANNER
  : "ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyy";

export function AdBanner() {
  return (
    <View style={styles.container}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    width: "100%",
  },
});
