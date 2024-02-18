import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const Post = ({ title, photoUrl, likes, comments }) => {
  return (
    <View className="bg-white rounded-lg shadow-lg p-4 mb-4">
      <Text className="text-lg font-bold mb-2">{title}</Text>
      <Image source={{ uri: photoUrl }} style={{ width: '100%', height: 200, marginBottom: 8, borderRadius: 8 }} />
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
