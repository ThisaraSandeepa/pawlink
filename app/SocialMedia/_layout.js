import React from 'react'
import { Tabs } from 'expo-router'
import Icon from 'react-native-vector-icons/Ionicons';

const _layout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'LandingPage') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'AddPost') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'AdoptionPage') {
            iconName = focused ? 'paw' : 'paw-outline';
          } else if (route.name === 'ProfilePage') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name='LandingPage' options={{ title: "Landing Page", headerBackVisible: false}}/>
      <Tabs.Screen name='AddPost' options={{title:"Add Post"}}/>
      <Tabs.Screen name='AdoptionPage' options={{href:"../Adoption/LandingPage", title:"Adoption"}} />
      <Tabs.Screen name='ProfilePage' options={{title:"Profile"}}/>
    </Tabs>
  )
}

export default _layout