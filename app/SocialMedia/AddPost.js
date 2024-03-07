import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// AddPost component
const AddPost = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');


  // Pick image from gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
// Upload image to Firebase Storage
  const uploadImage = async () => {
// Get the Firebase Storage instance
    try {
      const storage = getStorage();
      const imageRef = ref(storage, `images/${Date.now()}`);
  
      const response = await fetch(image);
      const blob = await response.blob();
  
      await uploadBytes(imageRef, blob);
  
      const downloadURL = await getDownloadURL(imageRef);
      console.log('Image uploaded:', downloadURL);
      
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
// Render the AddPost component
  return (
    <View className="my-auto">
      <View className="items-center gap-3">
        <Text> Description </Text>
        <TextInput
          placeholder="Type Here!"
          multiline={true}
          value={description}
          onChangeText={(text) => setDescription(text)}
          className="border border-gray-800 rounded w-80 p-20"
        />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        <TouchableOpacity onPress={pickImage} className="bg-blue-700 rounded p-2 text-center">
          <Text className="text-white"> Add Image </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={uploadImage} className="bg-green-700 rounded p-2 text-center">
          <Text className="text-white"> Upload Image </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddPost;
