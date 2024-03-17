import React from 'react'
import { Tabs } from 'expo-router'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const _layout = () => {
  return (
    <Tabs 
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'LandingPage') {
            iconName = focused ? 'paw' : 'paw-outline';
          } else if (route.name === 'AddStrayPost') {
            iconName = focused ? 'plus-circle' : 'plus-circle-outline';
          } else if (route.name === 'AdoptionNotification') {
            iconName = focused ? 'bell' : 'bell-outline';
          } else if (route.name === 'SocialMediaPage') {
            iconName = focused ? 'account-group' : 'account-group-outline';
          } else if (route.name === 'ProfilePage') {
            iconName = focused ? 'account-circle' : 'account-circle-outline';
          } 

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name='LandingPage' options={{title:"Landing Page"}}/>
      <Tabs.Screen name='AddStrayPost' options={{title:"Stray Animal Info"}}/>
      <Tabs.Screen name='SocialMediaPage' options={{href:"../SocialMedia/LandingPage"}}/>
      <Tabs.Screen name='AdoptMe' options={{href:null}}/> 
      <Tabs.Screen name='ProfilePage' options={{title:"Profile"}}/>
    </Tabs>
  )
}

export default _layout