import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const checkOnboarding = async () => {
      const viewed = await AsyncStorage.getItem("@viewed_onboarding");
      setTimeout(() => {
        if (viewed === "true") {
          navigation.replace("Home");
        } else {
          navigation.replace("Onboarding");
        }
      }, 2000);
    };
    checkOnboarding();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>FoodSpot</Text>
      <ActivityIndicator
        size="large"
        color="#E74C3C"
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#E74C3C",
    letterSpacing: 1,
  },
});
