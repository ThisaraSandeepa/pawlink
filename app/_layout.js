import React from 'react'
import { Stack } from 'expo-router'
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens'

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{headerShown: false}}/>
      <Stack.Screen name='User/SignIn' options={{headerShown: false}}/>
      <Stack.Screen name='User/SignUp' options={{headerTitle:"Sign Up", headerTitleAlign:'center',headerShadowVisible:true}}/>
      <Stack.Screen name='SocialMedia/LandingPage' options={{headerTitle:"Social Media",headerShadowVisible:true, headerSearchBarOptions:true}}/>
    </Stack>
  )
}

export default StackLayout