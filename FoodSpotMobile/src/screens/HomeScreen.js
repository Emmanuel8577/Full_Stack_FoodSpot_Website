import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axiosClient from "../api/axiosClient";
import { CartContext } from "../context/CartContext";

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchLiveInventory();
  }, []);

  const fetchLiveInventory = async () => {
    try {
      const response = await axiosClient.get("/products"); // Maps directly to your Render backend
      setProducts(response.data);
    } catch (err) {
      console.error("Error syncing platform data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <ActivityIndicator size="large" color="#E74C3C" style={styles.centered} />
    );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.brand}>FoodSpot Marketplace</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <Text style={styles.cartIcon}>🛒 View Cart</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <Text style={styles.title} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => addToCart(item)}
            >
              <Text style={styles.addBtnText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 10,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  brand: { fontSize: 22, fontWeight: "bold", color: "#2C3E50" },
  cartIcon: { fontSize: 16, fontWeight: "600", color: "#E74C3C" },
  card: {
    flex: 1,
    backgroundColor: "#FFF",
    margin: 6,
    borderRadius: 12,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    backgroundColor: "#EAEDED",
  },
  title: { fontSize: 15, fontWeight: "600", marginTop: 10, color: "#34495E" },
  price: {
    fontSize: 14,
    color: "#27AE60",
    fontWeight: "bold",
    marginVertical: 4,
  },
  addBtn: {
    backgroundColor: "#E74C3C",
    width: "100%",
    paddingVertical: 8,
    borderRadius: 6,
    marginTop: 5,
    alignItems: "center",
  },
  addBtnText: { color: "#FFF", fontWeight: "600", fontSize: 13 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
