import { Tabs } from 'expo-router';
import { Stack } from 'expo-router';


export default function TabLayout() {
  return (
    <Stack screenOptions={{
		headerStyle: {
			backgroundColor: 'white',
		},
		headerTintColor: 'grey',
		headerTitleStyle: {
			fontWeight: 'bold',
		},
		headerShown: true,
      }}>

		<Stack.Screen 
		name="login" 
		options={{
			title:"Sign in", 
			contentStyle: {backgroundColor: "white"},
			headerTintColor: "#108B54",
		}}/>
		<Stack.Screen 
		name="choice" 
		options={{
			title:"Register choice",
			contentStyle: {backgroundColor: "white"},
		}}/>
		<Stack.Screen 
		name="client" 
		options={{
			title:"Client Sign In",
			contentStyle: {backgroundColor: "white"},
		}}/>
		<Stack.Screen 
		name="lawyer" 
		options={{
			title:"Lawyer Signin",
			contentStyle: {backgroundColor: "white"},
		}}/>

    </Stack>
  );
}