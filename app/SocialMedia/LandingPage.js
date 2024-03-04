import { View, ScrollView } from 'react-native'
import React from 'react'
import Post from '../components/Post';

const LandingPage = () => {
  return (
    <View>
      <ScrollView>
        <Post
          user="User1"
          image={require('../../assets/images/dog1.jpg')}
          likes = {5}
          comments = {10}
        />
        <Post
          user="User2"
          image={require('../../assets/images/dog2.jpg')}
          likes = {7}
          comments = {2}
        />
        <Post
          user="User3"
          image={require('../../assets/images/dog3.jpg')}
          likes = {10}
          comments = {5}
        />
      </ScrollView>
    </View>
  );
}

export default LandingPage