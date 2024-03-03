import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity,Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {getStorage,ref,uploadBytes,getDownloadURL} from 'firebase/storage';




const AddPost = () => {

  // useState to store the image
  const [image, setImage] = useState(null);
  const [uploading , setUploading] = useState(false);
  const [transferred, settransferred] = useState(0);

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

  const submitImage = async () =>{
    const uploadUrl = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/')+1);

    setUploading(true)


    try{
      await storage().ref(filename).putFile(uploadUri);

      setUploading(false);
      Alert.alert(  
        'Image uploaded!',
        'Your image has been uploaded to the Firebase Cloud Storage Successfully'
      );
      

    }
    catch(e){
      console.log(e);
    }

    setImage(null);
  }
  return (
    <View className = "my-auto">
      <View className = "items-center gap-3">
        <Text> Description </Text>
        <TextInput placeholder= "Type Here!" multiline={true} className = "border border-gray-800 rounded w-80 p-20"/>
        <TouchableOpacity 
          onPress={submitImage}
          className="bg-blue-700 rounded  p-2 text-center">
          <Text className = "text-white"> Add Image </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddPost;
