import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Linking,
  ScrollView,
} from "react-native";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { getDatabase, ref as dbRef, get } from "firebase/database";
import { FIREBASE_APP, FIREBASE_AUTH } from "../../FirebaseConfig";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system"; // Import FileSystem]
import { update } from "firebase/database";
import { updateProfile } from "firebase/auth";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const dbStorage = getStorage(FIREBASE_APP);
const dbRealtime = getDatabase(FIREBASE_APP);
const user = FIREBASE_AUTH.currentUser;

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const user = FIREBASE_AUTH.currentUser;

  // Pick an image from the gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }

    // Upload the image to Firebase Storage
    Alert.alert("Upload Image", "Do you want to upload the image?", [
      { text: "Yes", onPress: () => UploadMedia() },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  // Upload the image to Firebase Storage
  const UploadMedia = async () => {
    try {
      if (!image) {
        throw new Error("No image selected. Click on the photo to select one.");
      }

      // Check if the image is empty
      const { uri } = await FileSystem.getInfoAsync(image); // Get the image info
      const response = await fetch(uri); // Fetch the image
      const blob = await response.blob(); // Convert the image to a blob

      const filename = image.substring(image.lastIndexOf("/") + 1); // Get the filename
      const storageRef = ref(dbStorage, "ProfilePictures/" + filename); // Create a storage reference
      await uploadBytes(storageRef, blob);

      // Get the download URL of the image
      const url = await getDownloadURL(storageRef);

      // Update the user's photoURL in Firebase Authentication
      const user = FIREBASE_AUTH.currentUser;
      await updateProfile(user, {
        photoURL: `${url}`,
      });

      // Reload the user
      user.reload();

      // Save data to Realtime Database
      const databaseRef = dbRef(dbRealtime, `Users/${user.uid}`);
      await update(databaseRef, {
        profilePicture: url,
      });

      // Show an alert and reset the state
      console.log("Photo Uploaded Successfully! ");
      setUploading(false);
      Alert.alert("Photo Uploaded!!!");

      // Reset the state
      setImage(null);
    } catch (error) {
      setUploading(false);
      alert(error.message);
    }
  };

  // Fetch the user's data from the Realtime Database
  useEffect(() => {
    const fetchUserData = async () => {
      const user = FIREBASE_AUTH.currentUser;
      const databaseRef = dbRef(dbRealtime, `Users/${user.uid}`);
      const snapshot = await get(databaseRef);
      setUserData(snapshot.val());
    };
    fetchUserData();
  }, []);

  // Fetch the Veterinarian's data from the Realtime Database
  useEffect(() => {
    const fetchVetData = async () => {
      const user = FIREBASE_AUTH.currentUser;
      const databaseRef = dbRef(dbRealtime, `Veterinarians/${user.uid}`);
      const snapshot = await get(databaseRef);

      // Merge the user data if the user is a Veterinarian
      if (snapshot.exists()) {
        setUserData((prevData) => ({
          ...prevData,
          ...snapshot.val(),
          UserType: "Veterinarian",
        }));
      }
    };
    fetchVetData();
  }, []);

  // Open the PawLink website
  const webpage = "https://pawlink.blog";
  const handlePress = () => {
    Alert.alert(
      "Opening PawLink Website",
      "Are you sure you want to open the website?",
      [
        { text: "Yes", onPress: () => Linking.openURL(webpage) },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  // Log out the user
  const handleLogout = () => {
    Alert.alert("Confirm Logout", "Are you sure you want to log out?", [
      { text: "Yes", onPress: () => logout() },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  // If the user is a Veterinarian, show the "Vet Bookings" button
  const VetBookings = userData?.UserType === "Veterinarian" && (
    <TouchableOpacity
      onPress={() => router.navigate("../../Veterinarian")}
      className="bg-green-500 px-4 py-2 top-3 rounded-xl"
    >
      <Text className="text-white text-center">Vet Bookings</Text>
    </TouchableOpacity>
  );

  // Take them back to sign up page by routing method
  const logout = () => {
    router.replace("../User/SignIn");
  };

  return (
    <View className="mt-7 bg-white">
      <View className="flex items-center justify-center h-2/5">
        <View className="items-center w-full ">
          <TouchableOpacity
            onPress={pickImage}
            className="flex items-center w-1/6"
          >
            {user?.photoURL && (
              <Image
                source={{ uri: user.photoURL }}
                className="w-32 h-32 first-letter:rounded-full"
              />
            )}
          </TouchableOpacity>

          <View className="flex items-center justify-center mt-4 w-4/6">
            <Text className="font-medium text-2xl"> Rochana Godigamuwa </Text>
            <Text className="font-light text-base">
              {userData?.UserType ? userData.UserType : "Veterinarian"}{" "}
            </Text>
          </View>
        </View>

        {/* Display the Vet Booking button */}
        {VetBookings}

        {/* Horizontal Line */}
        <View className="flex-row items-center top-7">
          <View className="flex-1 h-px bg-slate-500" />
          <View className="flex-row">
            <Text className="w-36 text-center text-gray-500">
              Profile Information
            </Text>
          </View>
          <View className="flex-1 h-px bg-slate-500" />
        </View>
      </View>

      {/* Second View */}
      <View className="w-screen h-3/5 flex items-center mt-5">
        {/* Email */}
        <View className="border border-gray-600 w-80 p-1 rounded-lg items-center pl-3 flex-row">
          <Icon name="email" size={25} color="orange" />
          <Text className="ml-1"> Email Address : {user.email} </Text>
        </View>
        <View className="border border-gray-600 w-80 p-1 mt-4 mb-8 rounded-lg items-center pl-3 flex-row">
          <Icon name="account" size={25} color="orange" />
          <Text className="ml-2">
            User Type :{" "}
            {userData?.UserType ? userData.UserType : "Veterinarian"}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            className="bg-red-600 p-1 px-5 rounded-lg mb-7"
            onPress={handleLogout}
          >
            <Text className="text-center text-white text-lg">Log out</Text>
          </TouchableOpacity>
        </View>

        {/* Horizontal Line */}
        <View className="flex-row items-center">
          <View className="flex-1 h-px bg-slate-500" />
          <View className="flex-row">
            <Text className="w-20 text-center text-gray-500">About Us</Text>
          </View>
          <View className="flex-1 h-px bg-slate-500" />
        </View>

        {/* About Us */}
        <Text className="text-center font-semibold text-lg mt-3"> Pawlink</Text>
        {/* <Text className="px-6 text-center font-light">
          where the love for dogs knows no bounds! Whether you’re a seasoned pet
          owner or a passionate advocate for animal welfare, you’ve come to the
          right place. Join us in our mission to celebrate, protect, and care
          for our furry companions.
        </Text> */}

        <TouchableOpacity
          className="w-50 p-1 mt-3 rounded-lg items-center pl-3 flex-row"
          onPress={handlePress}
        >
          <Icon name="paw" size={20} color="black"/>
          <Text className="ml-1 mr-2 text-slate-700">
            {" "}
            Click Here to Visit Our Website!{" "}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

//Rochana Godigamuwa
//Start Date : 2024-02-18