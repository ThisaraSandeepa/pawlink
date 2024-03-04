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
          } else if (route.name === 'AddStrayPost') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'AdoptionNotification') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'AdoptMe') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name='LandingPage' options={{title:"Adoption"}}/>
      <Tabs.Screen name='AddStrayPost' options={{title:"Stray Animal Info"}}/>
      <Tabs.Screen name='AdoptionNotification' options={{headerShown:false}}/>
      <Tabs.Screen name='AdoptMe' options={{href:null}}/> 
    </Tabs>
  )
}

export default _layout