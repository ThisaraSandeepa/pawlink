import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const AddPost = () => {

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  };

  return (
    <View className = "my-auto">
      <View className = "items-center gap-3">
        <Text> Description </Text>
        <TextInput placeholder= "Type Here!" multiline={true} className = "border border-gray-800 rounded w-80 p-20"/>
        <TouchableOpacity 
          onPress={pickImage}
          className="bg-blue-700 rounded  p-2 text-center">
          <Text className = "text-white"> Add Image </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddPost;


