import React from 'react'
import { Tabs } from 'expo-router'

const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen name='index' options={{headerTitle:"Yooo"}}/>
      <Tabs.Screen name = "AdoptionPage" options={{title:"Adoption"}}/>
    </Tabs>
  )
}

export default _layout