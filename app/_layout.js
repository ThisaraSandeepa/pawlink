import React from 'react'
import { Stack } from 'expo-router'

// Import the components
const StackLayout = () => {
  
  return (
    <Stack>
      <Stack.Screen name = 'index' options={{headerShown:false}}/>
      <Stack.Screen name = 'Adoption' options={{headerShown:false}}/>
      <Stack.Screen name = 'SocialMedia' options={{headerShown:false}}/>
      <Stack.Screen name = 'User/SignUp' options={{headerShown:false}}/>
      <Stack.Screen name = 'User/SignIn' options={{headerShown:false}}/>
      <Stack.Screen name = 'Veterinarian' options={{headerShown:false}}/>
    </Stack>
  )
}

export default StackLayout