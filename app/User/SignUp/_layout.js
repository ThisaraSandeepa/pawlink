import React from 'react'
import { Tabs } from 'expo-router'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const _layout = () => {

  return (
    <Tabs
      initialRouteName='SignUpUser'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'SignUpUser') {
            iconName = focused ? 'account-group' : 'account-group-outline';
          } else if (route.name === 'SignUpVet') {
            iconName = focused ? 'doctor' : 'doctor';
          }
          return <Icon name={iconName} size={20} color={color} />;
        },
      })}
    >
        <Tabs.Screen name='SignUpUser' options={{ title: "Pet Owner", headerShown:false}}/>
        <Tabs.Screen name='SignUpVet' options={{title:"Veterinarian", headerShown:false}}/>
    </Tabs>
  )
}

export default _layout