import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const Post = ({ title, photoUrl, likes, comments }) => {
  return (
    <View className="bg-white rounded-lg shadow-lg p-4 mb-4">
      <Text className="text-lg font-bold mb-2">{title}</Text>
      <Image className = "w-11/12 h-72"  source={require("../../assets/images/dog1.jpg")}/>
      <View className = "flex-row justify-start mb-8">
        <TouchableOpacity className = "flex-row justify-start">
            <Text className = "text-gray-700"> Like </Text>
        </TouchableOpacity>
        <TouchableOpacity className = "flex-row justify-start">
          <Text className = "text-gray-700"> Comment </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Post;
