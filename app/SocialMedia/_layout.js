import React from 'react'
import { Tabs } from 'expo-router'

const _layout = () => {
  return (
    <Tabs>
        {/* <Tabs.Screen name = "index" options={{headerShown:false}}/> */}
        <Tabs.Screen name = "screens/LandingPage" options={{headerShown:false, title:"Home"}} />
        <Tabs.Screen name = "screens/test" options={{headerShown:false,title:"Test"}}/>
    </Tabs>
  )
}

export default _layout