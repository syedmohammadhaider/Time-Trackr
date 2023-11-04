import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';

import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import Timer from './screens/Timer';
import Logs from './screens/Logs';

/* TODO */
/* - Save data to array */
/* - Redo the UI of LogCard.js */

const Tab = createBottomTabNavigator();

export default function App() {
  NavigationBar.setBackgroundColorAsync("black");
  NavigationBar.setButtonStyleAsync("light");


  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#000',
          elevation: 0,
          shadowOffset: 0,
          shadowOpacity: 0, 
          shadowColor: 'transparent',
          borderColor: 'transparent',
          borderWidth: 0,
        },
        headerTintColor: 'white',
        tabBarStyle: {
          backgroundColor: '#000',
          elevation: 0,
          shadowOffset: 0, 
          shadowColor: 'transparent',
          borderColor: 'transparent',
          borderWidth: 0,
          border: 0,
        },
        tabBarActiveTintColor: '#2659ff',
        tabBarInactiveTintColor: '#ffffff77'
      }}>
        <Tab.Screen component={Timer} name="Timer" options={{
          tabBarIcon: (focused, color, size) => <MaterialCommunityIcons name="clock" color={focused.color} size={24} />
        }} />
        <Tab.Screen component={Logs} name="Logs" options={{
          tabBarIcon: (focused, color, size) => <MaterialIcons name="analytics" color={focused.color} size={24} />
        }} />
      </Tab.Navigator>
      <StatusBar backgroundColor="black" style='light' />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
