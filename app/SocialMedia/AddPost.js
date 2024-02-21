import React from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const AddPost = () => {

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    });
  };

  return (
    <View className = "my-auto">
      <View className = "items-center gap-1">
        <Text> Description </Text>
        <TextInput placeholder= "Type Here!" multiline={true} className = "border border-gray-800 rounded w-80 p-20"/>
        <Button title="Upload Picture" onPress={pickImage}/>
      </View>
    </View>
  );
};

export default AddPost;
