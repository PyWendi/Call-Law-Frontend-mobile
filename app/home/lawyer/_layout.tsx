import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View } from 'react-native';
import { styles } from '@/styles/mainstyle';


export default function LawyerLayout() {
	let routeData = [
		{
			name: "appointment",
			title: "Appointment",
			icon: "calendar"
		},

		{
			name: "index",
			title: "Home",
			icon: "home"
		},

		{
			name: "search",
			title: "Search Lawyer",
			icon: "users"
		},
	]

  return (
    <Tabs screenOptions={{
		tabBarActiveTintColor: "#dac518",
		tabBarInactiveTintColor: "#6d6d6d" ,
		tabBarLabel: "",
		headerShown: false
      }}>
		{routeData.map((route) => (
			<Tabs.Screen 
				key={route.name}
				name={route.name} 
				options={{
				title: route.title,
				tabBarIcon: ({color, focused}) => 
				<View>
				{(focused)? (
						<View style={{
							paddingBottom: 30
						}}>
							<View style={styles.tab_elevate_style}>
								<FontAwesome size={28} name={route.icon} color={color}/>
							</View>
						</View>
					) : (
						<FontAwesome size={28} name={route.icon} color={color}/>
					)
				}
				</View>,
			}}/>


		))}

    </Tabs>
  );
}

