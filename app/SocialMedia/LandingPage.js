import { View, ScrollView } from 'react-native'
import React from 'react'
import Post from '../components/Post';

const LandingPage = () => {
  return (
    <View>
      <ScrollView>
        <Post/>
      </ScrollView>
    </View>
  );
}

export default LandingPage