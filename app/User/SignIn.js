import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';

const SignIn = () => {
  return (
    <View className = "justify-center items-center pt-36 gap-24">
      <Text className = "font-thin text-6xl"> Welcome! </Text>
      <View className = "gap-6 mr-5 items-center">
        <TextInput placeholder = "UserName" className = "border border-gray-800 rounded w-72 p-2"/>
        <TextInput placeholder='Password' secureTextEntry className = "border border-gray-800 rounded w-72 p-2"/>
        <Link href="../SocialMedia/LandingPage" className='bg-blue-700 rounded text-white p-2 w-20 text-center'> Log In </Link>
      </View>
      <Link href="./SignUp" className='rounded text-blue-600 p-2 pt-24'> Don't Have An Account? <Text className = "text-blue-700 font-bold">Sign Up Now! </Text> </Link>
    </View>
  )
}

export default SignIn