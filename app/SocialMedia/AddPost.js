import React, { useState } from "react";
import { View,Text,StyleSheet,TouchableOpacity,SafeAreaView,Alert,Image,ScrollView,TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { getDatabase, ref as dbRef, push } from 'firebase/database';
import { FIREBASE_APP, FIREBASE_AUTH } from "../../FirebaseConfig";
import * as FileSystem from "expo-file-system"; // Import FileSystem]
import { Icon } from "react-native-elements";
import { router } from "expo-router";

const dbStorage = getStorage(FIREBASE_APP);
const dbFirestore = getFirestore(FIREBASE_APP);
const dbRealtime = getDatabase(FIREBASE_APP);

// UploadMediaFile Compenent
const UploadMediaFile = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  // Pick an image from the gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  // Cancel the upload
  const onCancel = () => {
    Alert.alert("Are you sure you want to cancel the upload?", "", [
      {
        text: "Yes",
        onPress: () => {    
          setImage(null);
          setDescription("");
          router.push("/SocialMedia/LandingPage");
        },
      },
      {
        text: "No",
        style: "cancel",
      },
    ]);

  };

  const UploadMedia = async () => {
    setUploading(true);

// Check if the image is empty

    try {
      const { uri } = await FileSystem.getInfoAsync(image);          // Get the image info
      const response = await fetch(uri);                             // Fetch the image
      const blob = await response.blob();                            // Convert the image to a blob

      const filename = image.substring(image.lastIndexOf("/") + 1);  // Get the filename
      const storageRef = ref(dbStorage, "ProfilePictures/" + filename);  // Create a storage reference
      await uploadBytes(storageRef, blob);

      const url = await getDownloadURL(storageRef);

       // Get the current user
      const user = FIREBASE_AUTH.currentUser; 

      // Save data to Firestore
      const postRef = await addDoc(
        collection(dbFirestore, "socialMediaPosts"),
        {
          // Add a new document in collection "socialMediaPosts"
          image: url,
          likes: "0",
          comments: "0",
          description: description,
          user: user.displayName,
        }
      );

      // Save data to Realtime Database
      const databaseRef = dbRef(dbRealtime, "socialMediaPosts");
      await push(databaseRef, {
        image: url,
        likes: "0",
        comments: "0",
        description: description,
        user: user.displayName,
        userProfilePicture: user.photoURL
      });
      
      // Show an alert and reset the state
      console.log("Photo Uploaded Successfully! ");
      setUploading(false);
      Alert.alert("Photo Uploaded!!!");

      // Reset the state
      setImage(null);
      setDescription("");
    } catch (error) {
      console.error(error);
      setUploading(false);
      Alert.alert(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.selectedImage} />
          ) : (
            <View style={styles.placeholderImage} />
          )}
          <TextInput
            className="border-2 border-gray-300 rounded-md w-72 h-24 mb-6 text-center"
            placeholder="Description"
            multiline={true}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
          <TouchableOpacity onPress={pickImage}>
            <View className = "flex-row gap-1 bg-blue-400 rounded p-2">
              <Icon name="add-a-photo" size={24} color="black"/>
              <Text> Select a picture </Text>
            </View>
          </TouchableOpacity>
          <View className = "flex-row justify-between gap-6 pt-8">
            <TouchableOpacity className = "items-center bg-blue-700 rounded-xl px-10 py-2" onPress={UploadMedia}>
              <Text className = "text-center font-bold text-white text-base">Post</Text>
            </TouchableOpacity>
            <TouchableOpacity  className = "items-center bg-red-600 rounded-xl px-6 py-2" onPress={onCancel}>
               <Text className = "text-center font-bold text-base text-white"> Cancel </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
  },
  selectButton: {
    borderRadius: 10,
    width: 300,
    height: 40,
    backgroundColor: "#6391db",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  uploadButton: {
    borderRadius: 10,
    width: 140,
    height: 50,
    backgroundColor: "#2557a8",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: "center",
  },
  selectedImage: {
    width: 300,
    height: 300,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 20,
  },
  placeholderImage: {
    width: 300,
    height: 300,
    backgroundColor: "#ccc", // Placeholder color
    borderRadius: 10,
    marginBottom: 20,
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "100%",
    height: 100,
    padding: 20,
    marginBottom: 20,
  },
});

export default UploadMediaFile;










//Rochana Godigamuwa
//Start Date : 2024-03-18