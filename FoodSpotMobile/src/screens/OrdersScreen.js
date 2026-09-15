import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import axiosClient from "../api/axiosClient";

export default function OrdersScreen() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  const downloadReceipt = (orderId) => {
    Alert.alert(
      "Downloading Invoice",
      `Your receipt for Order #${orderId.substring(0, 8)} is downloading via background pipeline.`,
    );
    // In production, use expo-file-system to download: `https://foodspot-backend.onrender.com/api/orders/${orderId}/receipt`
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <Text style={styles.orderId}>
              Order ID: #{item._id.substring(0, 10)}
            </Text>
            <Text style={styles.status}>Status: {item.status}</Text>
            <Text style={styles.total}>Total: ${item.totalAmount}</Text>
            <TouchableOpacity
              style={styles.receiptBtn}
              onPress={() => downloadReceipt(item._id)}
            >
              <Text style={styles.receiptText}>Download Receipt PDF</Text>
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
    padding: 20,
    paddingTop: 40,
  },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  orderCard: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#EAEDED",
  },
  orderId: { fontWeight: "bold", color: "#2C3E50" },
  status: { color: "#7F8C8D", marginVertical: 4 },
  total: { fontWeight: "600", color: "#27AE60" },
  receiptBtn: {
    marginTop: 10,
    borderHorizontalColor: "#E74C3C",
    borderWidth: 1,
    borderColor: "#E74C3C",
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  receiptText: { color: "#E74C3C", fontWeight: "600" },
});
