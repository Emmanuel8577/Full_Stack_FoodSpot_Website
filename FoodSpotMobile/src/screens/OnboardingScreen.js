import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const SLIDES = [
  {
    id: "1",
    title: "Welcome to FoodSpot",
    desc: "Your favorite local delicacies delivered right to your doorstep instantly.",
  },
  {
    id: "2",
    title: "Seamless Web & Mobile Ecosystem",
    desc: "Browse dishes and vendors synchronizing in real-time with our web applications.",
  },
  {
    id: "3",
    title: "Vendor Control Center",
    desc: "Admin panel changes immediately add or remove items across both web and mobile app views.",
  },
  {
    id: "4",
    title: "Secure Checkouts",
    desc: "Pay safely via native Stripe. Access, view, and instantly download PDF invoices for all your past orders.",
  },
];

export default function OnboardingScreen({ navigation }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const flatListRef = useRef();

  const completeOnboarding = async () => {
    await AsyncStorage.setItem("@viewed_onboarding", "true");
    navigation.replace("Home");
  };

  const nextSlide = () => {
    const nextIndex = currentSlideIndex + 1;
    if (nextIndex < SLIDES.length) {
      flatListRef.current.scrollToIndex({ index: nextIndex });
      setCurrentSlideIndex(nextIndex);
    } else {
      completeOnboarding();
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) =>
          setCurrentSlideIndex(
            Math.round(e.nativeEvent.contentOffset.x / width),
          )
        }
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
          </View>
        )}
      />
      <View style={styles.footer}>
        <TouchableOpacity onPress={completeOnboarding}>
          <Text style={styles.btnText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextBtn} onPress={nextSlide}>
          <Text style={[styles.btnText, { color: "#FFF" }]}>
            {currentSlideIndex === SLIDES.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  slide: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  desc: { fontSize: 16, color: "#666", textAlign: "center", lineHeight: 24 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    height: 100,
  },
  nextBtn: {
    backgroundColor: "#E74C3C",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  btnText: { fontSize: 16, fontWeight: "600", color: "#333" },
});
