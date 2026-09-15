import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StripeProvider } from '@stripe/stripe-react-native';
import { CartProvider } from './src/context/CartContext';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <StripeProvider
        publishableKey="pk_test_your_actual_stripe_publishable_key_here" // Replace with your live or test Stripe key from your dashboard
        merchantIdentifier="merchant.com.foodspot.mobileapp" // Matches the identifier in your app.json
      >
        <CartProvider>
          <RootNavigator />
          <StatusBar style="auto" />
        </CartProvider>
      </StripeProvider>
    </SafeAreaProvider>
  );
}