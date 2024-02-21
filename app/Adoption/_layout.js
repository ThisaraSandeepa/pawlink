import React from 'react'
import { Tabs } from 'expo-router'

const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen name='LandingPage' options={{headerShown:false}}/>
      <Tabs.Screen name='AdoptMe' options={{headerShown:false}}/>
      <Tabs.Screen name='AdoptionNotification' options={{headerShown:false}}/>
    </Tabs>
  )
}

export default _layout