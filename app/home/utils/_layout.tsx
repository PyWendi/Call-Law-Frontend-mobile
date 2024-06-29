import { Stack } from 'expo-router';

// import LogoHeaderComponent from '@/components/LogoHeaderComponent';
import HeaderComponent from '@/components/header/HeaderComponent';

export default function RootLayout() {
  // const colorScheme = useColorScheme();

  return (
    
    <Stack screenOptions={{
      headerShown: false,
    //   header(props) {
    //     return (<HeaderComponent/>)
    //   },
    }}>
      <Stack.Screen name="archive"  />
      <Stack.Screen name="notification"  />
      <Stack.Screen name="setting"  />
    </Stack>
  );
}
