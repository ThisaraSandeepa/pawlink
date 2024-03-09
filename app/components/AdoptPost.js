import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Link } from "expo-router";

const Post = (props) => {
 
  return (
      <View className="bg-white rounded-lg shadow-lg p-4 mb-4">
          <Image className="w-11/12 h-72" source={props.image} />
          <Text className="text-lg font-bold mb-2">{props.location}</Text>
        
      </View>
  );
};

export default Post;

