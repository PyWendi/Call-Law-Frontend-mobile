import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';


export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen 
        name="settings" 
        options={{
          title:"Settings",
          tabBarIcon: ({color}) => <FontAwesome size={28} name='home' color={color}/>,
          // href:"/"
      }}/>
      <Tabs.Screen 
        name="detail" 
        options={{
          title:"Go to settings",
          tabBarIcon: ({color}) => <FontAwesome size={28} name='cog' color={color}/>
      }}/>

    </Tabs>
  );
}