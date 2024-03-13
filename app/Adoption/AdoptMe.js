import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

const AdoptMe = () => {
  const route = useRoute();
  const { post } = route.params;
  console.log(post);

  return (
    <View>
      <Text>{post.age}</Text>
      <Text>{post.color}</Text>
      <Text>{post.contactInfo}</Text>
      <Text>{post.description}</Text>
      <Text>{post.location}</Text>
    </View>
  );
};

export default AdoptMe;
