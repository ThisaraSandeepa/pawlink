import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AddPost = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

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

  const submitImage = async () => {
    if (!image) {
      // Ensure an image is selected
      Alert.alert('Error', 'Please select an image.');
      return;
    }

    const filename = image.substring(image.lastIndexOf('/') + 1);

    try {
      setUploading(true);

      const storageRef = ref(getStorage(), filename);
      await uploadBytes(storageRef, image);

      const downloadURL = await getDownloadURL(storageRef);

      setUploading(false);
      Alert.alert(
        'Image uploaded!',
        'Your image has been uploaded to the Firebase Cloud Storage successfully.'
      );

      //  use the downloadURL or perform other actions
      console.log('Download URL:', downloadURL);
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploading(false);
    }

    setImage(null);
  };

  return (
    <View className="my-auto">
      <View className="items-center gap-3">
        <Text> Description </Text>
        <TextInput
          placeholder="Type Here!"
          multiline={true}
          className="border border-gray-800 rounded w-80 p-20"
        />
        <TouchableOpacity
          onPress={submitImage}
          className="bg-blue-700 rounded p-2 text-center"
        >
          <Text className="text-white"> Add Image </Text>
        </TouchableOpacity>

        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: 100, height: 100, borderRadius: 10, marginTop: 10 }}
          />
        )}

        {uploading && <Text>Uploading...</Text>}

        {/* Add any other UI elements you need */}
      </View>
    </View>
  );
};

export default AddPost;
