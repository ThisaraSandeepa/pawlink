import React from 'react'
import { Tabs, router } from 'expo-router'
import LandingPage from '../Adoption/LandingPage'

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