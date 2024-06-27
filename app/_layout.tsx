import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

// Store system
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/stores/store';
import { Provider as AntProvider } from '@ant-design/react-native';

import LogoHeaderComponent from '@/components/LogoHeaderComponent';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    "mexican-font": require('../assets/fonts/mexican/PlaywriteMX-VariableFont_wght.ttf'),
    "mexican-thin-font": require('../assets/fonts/mexican/static/PlaywriteMX-Thin.ttf'),
    "dm-sans": require('../assets/fonts/dm_sans/DMSans-VariableFont_opsz,wght.ttf'),
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
            <Stack.Screen name="index" options={{ headerShown: false, contentStyle: {backgroundColor: "white"} }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} /> {/* /login /client /lawyer /choice */}
            <Stack.Screen name="home" options={{ headerShown: false }} /> {/* /home/ | client lawyer */}
            {/* <Stack.Screen name="modal" options={{headerShown:true }} /> */}
            <Stack.Screen name="+not-found" options={{ headerShown: false }}/>
            {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
          </Stack>
          
        </AntProvider>

      </PersistGate>

    </Provider>
  );
}
