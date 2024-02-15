import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import Home from './screens/Home';
import TestPage1 from './screens/TestPage1';
import TestPage2 from './screens/TestPage2';
import TestPage3 from './screens/TestPage3';

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={'Home'}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            
            let iconName;

            if (route.name === 'Community') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === 'Create Post') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            } else if (route.name === 'TestPage2') {
              iconName = focused ? 'paw' : 'paw-outline';
            } else if (route.name === 'TestPage3') {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          
          tabBarLabel: () => null, 
        })}
        tabBarOptions={{
          activeTintColor: '#0373fc',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Community" component={Home} />
        <Tab.Screen name="Create Post" component={TestPage1} />
        <Tab.Screen name="TestPage2" component={TestPage2} />
        <Tab.Screen name="TestPage3" component={TestPage3} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
