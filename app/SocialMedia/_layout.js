import React from 'react';
import { Tabs } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const _layout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'LandingPage') {
            iconName = focused ? 'account-group' : 'account-group-outline';
          } else if (route.name === 'AddPost') {
            iconName = focused ? 'plus-circle' : 'plus-circle-outline';
          } else if (route.name === 'AdoptionPage') {
            iconName = focused ? 'paw' : 'paw-outline';
          } else if (route.name === 'ProfilePage') {
            iconName = focused ? 'account-circle' : 'account-circle-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name='LandingPage' options={{ title: "Landing Page"}}/>
      <Tabs.Screen name='AddPost' options={{title:"Add Post"}}/>
      <Tabs.Screen name = "AdoptionPage" options={{href:"../Adoption/LandingPage"}} />
      <Tabs.Screen name='ProfilePage' options={{title:"Profile"}}/>
      <Tabs.Screen name='CommentBox' options={{title:"Comments", href:null}}/>
    </Tabs>
  )
}

export default _layout