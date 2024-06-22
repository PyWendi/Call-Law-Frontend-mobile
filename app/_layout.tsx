import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

// Store system
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/stores/store';
import { Button, Provider as AntProvider, Toast } from '@ant-design/react-native';

// import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>

      <PersistGate loading={null} persistor={persistor}>
        <AntProvider>

          <Stack screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />/
            <Stack.Screen name="(home)" options={{ headerShown: false, presentation: "modal" }} />/
            <Stack.Screen name="+not-found" options={{ headerShown: false }}/>
          </Stack>
          
        </AntProvider>

      </PersistGate>

    </Provider>
  );
}
