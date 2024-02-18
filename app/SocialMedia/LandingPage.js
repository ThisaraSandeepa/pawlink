import { View, ScrollView } from 'react-native'
import React from 'react'
import Post from './components/Post'
import { Link } from 'expo-router';

const LandingPage = () => {
  return (
    <View>
      <ScrollView>
        <Post/>
        <Link href="../Adoption/LandingPage" className ="bg-blue-700 rounded text-white p-2"> Adoption </Link>
        <Link href="../User/Profile" className ="bg-blue-700 rounded text-white p-2"> Profile </Link>
      </ScrollView>
    </View>
  );
}

export default LandingPage