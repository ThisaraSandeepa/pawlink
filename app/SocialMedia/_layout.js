import React from 'react'
import { Tabs } from 'expo-router'


const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen name='LandingPage' options={{ title: "Landing Page", headerBackVisible: false}}/>
      <Tabs.Screen name='AddPost' options={{title:"Add Post"}}/>
      <Tabs.Screen name='AdoptionPage' options={{title:"Adoption"}}/>
      <Tabs.Screen name='ProfilePage' options={{title:"Profile"}}/>
    </Tabs>
  )
}

export default _layout