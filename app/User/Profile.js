import React, { useEffect, useState } from "react";
import {View,Text,TouchableOpacity,StyleSheet,Alert,Image,} from "react-native";
import { ref, uploadBytes, getDownloadURL,getStorage } from "firebase/storage";
import { getDatabase,ref as dbRef, get } from 'firebase/database';
import { FIREBASE_APP, FIREBASE_AUTH } from "../../FirebaseConfig";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system"; // Import FileSystem]
import { update } from "firebase/database";
import { updateProfile } from "firebase/auth";

const dbStorage = getStorage(FIREBASE_APP);
const dbRealtime = getDatabase(FIREBASE_APP);

const ProfileScreen = () => {

  const [userData, setUserData] = useState(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

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
  };

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

      const url = await getDownloadURL(storageRef);
  
      // Update the user's photoURL in Firebase Authentication
      const user = FIREBASE_AUTH.currentUser;
      await updateProfile(user, {
        photoURL: `${url}`
      });

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
  
  // Fetch the user data from the Realtime Database
  const fetchUserData = async () => {
    try {
      const userId = FIREBASE_AUTH.currentUser.uid;
      const userRef = dbRef(dbRealtime, `Users/${userId}`);
      const userSnapshot = await get(userRef);
  
      // If the user data exists, set the state
      if (userSnapshot.exists()) {
        const userData = userSnapshot.val();
        setUserData(userData);
      } else {
        console.log("User data not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };
  
  // Log out the user
  const handleLogout = () => {
    Alert.alert("Confirm Logout", "Are you sure you want to log out?", [
      { text: "Yes", onPress: () => logout() },
      { text: "Cancel", style: "cancel" }
    ]);
  };

  // Take them back to sign up page by routing method
  const logout = () => {
    router.replace("../User/SignIn");
  };

  return (
    <View style={styles.container}>
      {/* If the user has a profile picture, show it */}
      <TouchableOpacity onPress={pickImage}>
        {userData?.profilePicture && (
          <Image
            source={{ uri: userData.profilePicture }}
            style={styles.selectedImage}
          />
        )}
        {/* If the user does not have a profile picture, show the placeholder */}
        {!userData?.profilePicture && <View style={styles.placeholderImage} />}
      </TouchableOpacity>
      
      {/* If the user has a profile picture, show the "Update Profile Picture" button */}
      <View className = 'flex-row gap-6 mb-8'>
        <TouchableOpacity onPress={UploadMedia} className = "items-center bg-blue-600 rounded-xl px-6 py-2">
          <Text className = "text-white"> Update Profile Picture </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileBox}>
        <Text style={styles.label}>Your Account Name:</Text>
        <Text style={styles.userData}>
          {userData?.firstName} {userData?.lastName}
        </Text>

        <Text style={styles.label}>Your Email:</Text>
        <Text style={styles.userData}>{userData?.email}</Text>

        <View style={styles.userTypeContainer}>
          <View style={styles.userTypeBox}>
            <Text style={styles.userType}>{userData?.UserType}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  selectedImage: {
    top: -40,
    width: 150,
    height: 150,
    resizeMode: "cover",
    borderRadius: 100,
  },
  placeholderImage: {
    top: -70,
    width: 150,
    height: 150,
    backgroundColor: "#ccc", // Placeholder color
    borderRadius: 100,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  profileBox: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333", // Dark gray text color
  },
  userData: {
    fontSize: 16,
    marginTop: 5,
    color: "#666", // Medium gray text color
  },
  userTypeContainer: {
    marginTop: 20,
  },
  userTypeBox: {
    backgroundColor: "#FFD700", // Gold color
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  userType: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#333", // Dark gray text color
  },
  logoutButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    position: "absolute",
    bottom: 20,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default ProfileScreen;









//Rochana Godigamuwa
//Start Date : 2024-02-18