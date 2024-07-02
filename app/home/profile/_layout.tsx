import { Stack } from 'expo-router';

export default function ProfileLayout() {

  return (
    
    <Stack screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="client" options={{ headerShown: false, contentStyle: {backgroundColor: "white"} }} />
      <Stack.Screen name="lawyer" options={{ headerShown: false }} />
    </Stack>
  );
}
