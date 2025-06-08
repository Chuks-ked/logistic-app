import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login/index" />
        <Stack.Screen name="signup/index" />
        <Stack.Screen name="forgot-password/index" />
        <Stack.Screen name="otp/index" />
        <Stack.Screen name="reset-password/index" />
        <Stack.Screen name="profile/index" />
      </Stack>
    </SafeAreaProvider>
  );
}
