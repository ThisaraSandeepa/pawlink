import React from 'react'
import { Stack } from 'expo-router'

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{headerShown: false}}/>
      <Stack.Screen name='User/SignIn' options={{headerShown: false}}/>
    </Stack>
  )
}

export default StackLayout