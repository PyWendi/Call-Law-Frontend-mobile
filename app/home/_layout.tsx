import { Stack } from 'expo-router';

// import LogoHeaderComponent from '@/components/LogoHeaderComponent';
import HeaderComponent from '@/components/header/HeaderComponent';

export default function RootLayout() {
  // const colorScheme = useColorScheme();

  return (
    
    <Stack screenOptions={{
      headerShown: false,
      contentStyle: {backgroundColor: "white"},
      header(props) {
        return (<HeaderComponent/>)
      },
    }}>
      <Stack.Screen name="lawyer" options={{ headerShown: true }} />
      <Stack.Screen name="client" options={{ headerShown: true }} />
      <Stack.Screen name="profile" options={{ headerShown: true }} />
      <Stack.Screen name="utils" options={{ headerShown: true }} />
    </Stack>
  );
}
