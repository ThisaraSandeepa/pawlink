import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { getDatabase, ref as dbRef, push } from "firebase/database";
import { FIREBASE_APP, FIREBASE_AUTH } from "../../FirebaseConfig";
import * as FileSystem from "expo-file-system"; // Import FileSystem]
import { Icon } from "react-native-elements"; // Import Icon
import { router } from "expo-router"; // Import Router
import { sendPushNotification } from "../components/pushNotifications";

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
      allowsEditing: true, // Allow editing
      aspect: [4, 3], // Aspect ratio
      quality: 1, // Quality
    });
    if (!result.cancelled) {
      setImage(result.assets[0].uri); // Set the image
    }
  };

  // Cancel the upload
  const onCancel = () => {
    Alert.alert("Are you sure you want to cancel the upload?", "", [
      // Show an alert
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
    // Upload the media
    setUploading(true);

    try {
      const { uri } = await FileSystem.getInfoAsync(image); // Get the image info
      const response = await fetch(uri); // Fetch the image
      const blob = await response.blob(); // Convert the image to a blob

      const filename = image.substring(image.lastIndexOf("/") + 1); // Get the filename
      const storageRef = ref(dbStorage, "ProfilePictures/" + filename); // Create a storage reference
      await uploadBytes(storageRef, blob); // Upload the image to the storage

      const url = await getDownloadURL(storageRef); // Get the download URL

      // Get the current user
      const user = FIREBASE_AUTH.currentUser;

      // Save data to Firestore
      const postRef = await addDoc(
        collection(dbFirestore, "socialMediaPosts"), // Get the collection database extension
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
        // Add a new document in collection "socialMediaPosts"
        image: url,
        likes: "0",
        comments: "0",
        description: description,
        user: user.displayName,
        userProfilePicture: user.photoURL,
      });

      // Show an alert and reset the state
      console.log("Photo Uploaded Successfully! ");
      setUploading(false);

      // Reset the state
      setImage(null);
      setDescription("");

      // Show an alert
      Alert.alert("Success", "The post has been added successfully!");

      // Send a push notification
      sendPushNotification("New Post", "The post has successfully added!");

      // Redirect to the landing page
      router.push("./LandingPage");
    } catch (error) {
      console.error(error);
      setUploading(false);
      Alert.alert(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <View>
        <Image
          source={require("../../assets/images/Dogpaw.png")}
          className="w-40 h-40 mb-2 rounded-lg ml-1 mt-1"
        />
      </View>
      <ScrollView
        contentContainerclassName="item-center justify-center pb-20"
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Image
            source={require("../../assets/images/Dogpaw.png")}
            className="justify-center w-40 h-40 mb-2 rounded-lg ml-1 mt-1"
          />
        </View>
        <View className="mt-30 mb-50 items-center">
          {image ? (
            <Image
              source={{ uri: image }}
              className="w-[300px] h-[300px] rounded-md mb-20"
            />
          ) : (
            // Show the image
            <TouchableOpacity onPress={pickImage}>
              <View className="w-[300px] h-[300px] bg-slate-200 rounded-3xl mb-2 justify-center items-center">
                <View className="flex-row gap-1 shadow-2xl rounded-2xl p-2">
                  <Icon name="add-a-photo" size={24} color="black" />
                  <Text> Select a picture </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        </View>

        <TextInput
          // Description input
          className="border-2 border-gray-300 rounded-3xl w-72 h-24 mb-5 text-center ml-2"
          placeholder="Description"
          multiline={true}
          value={description}
          onChangeText={(text) => setDescription(text)}
        />

        <View className="flex-row justify-between gap-6 pt-8">
          <TouchableOpacity
            className="items-center bg-blue-700 rounded-xl px-10 py-2"
            onPress={UploadMedia}
          >
            <Text className="text-center font-bold text-white text-base">
              Post
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="items-center bg-red-600 rounded-xl px-6 py-2"
            onPress={onCancel}
          >
            <Text className="text-center font-bold text-base text-white">
              {" "}
              Cancel{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UploadMediaFile;

//Rochana Godigamuwa
//Start Date : 2024-03-18
