/*import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { getDatabase, ref as dbRef, push } from "firebase/database";
import { FIREBASE_APP, FIREBASE_AUTH } from "../../FirebaseConfig";
import { router } from "expo-router";
import { Icon } from "react-native-elements";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { sendPushNotification } from "../components/pushNotifications";

const dbStorage = getStorage(FIREBASE_APP);
const dbFirestore = getFirestore(FIREBASE_APP);
const dbRealtime = getDatabase(FIREBASE_APP);

const user = FIREBASE_AUTH.currentUser;
console.log(user);

const UploadMediaFile = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [contactInfo, setContactInfo] = useState("");
  const [location, setLocation] = useState(null);
  const [manualLocation, setManualLocation] = useState("");
  const [city, setCity] = useState("");
  const [showMap, setShowMap] = useState(false); // New state for map visibility
  const [age, setAge] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");

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

  useEffect(() => {
    getLocationPermission();
    getCurrentLocation();
  }, []);

  const getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
    }
  };

  const getCurrentLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      fetchLocationNameFromCoordinates(
        location.coords.latitude,
        location.coords.longitude
      );
    } catch (error) {
      console.error(error);
      Alert.alert("Error getting location");
    }
  };

  const fetchLocationNameFromCoordinates = async (latitude, longitude) => {
    try {
      const locationAddress = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      const name = locationAddress[0].name || "";
      setManualLocation(name);
      setCity(locationAddress[0].city || "");
    } catch (error) {
      console.error(error);
    }
  };

  const onLocationIconPress = () => {
    setShowMap(true);
    getCurrentLocation();
  };

  const onCancel = () => {
    setContactInfo("");
    setLocation(null);
    setManualLocation("");
    setAge("");
    setColor("");
    setDescription("");
    setImage(null);
    router.replace("./LandingPage");
  };

  const UploadMedia = async () => {
    setUploading(true);
  
    try {
      const { uri } = await FileSystem.getInfoAsync(image);
      const response = await fetch(uri);
      const blob = await response.blob();
      const filename = image.substring(image.lastIndexOf("/") + 1);
      const storageRef = ref(dbStorage, "Adoption/" + filename);
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
  
      const selectedLocation = manualLocation
        ? manualLocation
        : location
        ? {
            latitude: location.latitude,
            longitude: location.longitude,
          }
        : null;
  
      // Save data to Firestore
      const postRef = await addDoc(collection(dbFirestore, "strayPosts"), {
        contactInfo: contactInfo,
        location: selectedLocation,
        age: age,
        color: color,
        description: description,
        image: url,
      });
  
      // Save data to Realtime Database
      const databaseRef = dbRef(dbRealtime, "strayPosts");
      await push(databaseRef, {
        contactInfo: contactInfo,
        location: selectedLocation, // Include latitude and longitude directly
        age: age,
        color: color,
        description: description,
        image: url,
        postedUser: user.displayName,
        postedUserPhoto: user.photoURL
      });
  
      console.log("Photo uploaded successfully!");
  
      // Send a push notification
      sendPushNotification("New Post", "The post has successfully added!");
  
      // reset the state
      setUploading(false);
      setImage(null);
  
      // Navigate to landing page
      router.replace("./LandingPage");
      
    } catch (error) {
      console.error(error);
      setUploading(false);
      Alert.alert("An error occurred while uploading the photo");
    }
  };
  
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}> Found Location</Text>
          <View style={styles.locationContainer}>
            <TextInput
              style={styles.locationInput}
              placeholder="Enter location manually"
              value={manualLocation}
              onChangeText={(text) => setManualLocation(text)}
            />
            <TouchableOpacity
              style={styles.locationIcon}
              onPress={onLocationIconPress}
            >
              <Text>📍</Text>
            </TouchableOpacity>
          </View>
          {showMap && location && (
            <MapView
              style={styles.mapContainer}
              region={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              }}
            >
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                title="Found Location"
              />
            </MapView>
          )}
        </View>

        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Color</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setColor(text)}
          />
        </View>

        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Age</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setAge(text)}
          />
        </View>

        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Description</Text>
          <TextInput
            style={styles.descriptioninput}
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => setDescription(text)}
          />
        </View>

        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Contact Info</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setContactInfo(text)}
          />
        </View>

        
        <TouchableOpacity onPress={pickImage}>
            <View className="flex-row gap-1 bg-blue-400 rounded p-2">
              <Icon name="add-a-photo" size={24} color="black" />
              <Text> Select a picture </Text>
            </View>
          </TouchableOpacity>
        <View style={styles.imageContainer}>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 300, height: 300 }}
            />
          )}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.uploadButton} onPress={UploadMedia}>
              <Text style={styles.buttonText}> Post </Text>
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
  input: {
    height: 40,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  selectButton: {
    borderRadius: 10,
    width: 300,
    height: 40,
    backgroundColor: "#6391db",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  labelContainer: {
    marginBottom: 15,
  },
  descriptioninput: {
    height: 100,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  labelText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
    marginTop: 20,
  },
  cancelButton: {
    borderRadius: 10,
    width: 140,
    height: 50,
    backgroundColor: "#c5cfde",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
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
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginRight: 10,
  },
  locationIcon: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#c5cfde",
  },
  mapContainer: {
    height: 200,
    width: 300,
    borderRadius: 10,
    overflow: "hidden",
  },
});

export default UploadMediaFile;*/
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { getDatabase, ref as dbRef, push } from "firebase/database";
import { FIREBASE_APP, FIREBASE_AUTH } from "../../FirebaseConfig";
import { router } from "expo-router";
import { Icon } from "react-native-elements";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { sendPushNotification } from "../components/pushNotifications";

const dbStorage = getStorage(FIREBASE_APP);
const dbFirestore = getFirestore(FIREBASE_APP);
const dbRealtime = getDatabase(FIREBASE_APP);

const UploadMediaFile = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [contactInfo, setContactInfo] = useState("");
  const [location, setLocation] = useState(null);
  const [manualLocation, setManualLocation] = useState("");
  const [city, setCity] = useState("");
  const [showMap, setShowMap] = useState(false); // New state for map visibility
  const [age, setAge] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false); // Track if the form has been submitted

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

  const handlePhoneNumberChange = (text) => {
    setContactInfo(text);
    // Regular expression to validate a phone number
    const phoneRegex = /^[0-9]{10}$/;
    setIsValidPhone(phoneRegex.test(text));
  };

  useEffect(() => {
    getLocationPermission();
    getCurrentLocation();
  }, []);

  const getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
    }
  };

  const getCurrentLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      fetchLocationNameFromCoordinates(
        location.coords.latitude,
        location.coords.longitude
      );
    } catch (error) {
      console.error(error);
      Alert.alert("Error getting location");
    }
  };

  const fetchLocationNameFromCoordinates = async (latitude, longitude) => {
    try {
      const locationAddress = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      const name = locationAddress[0].name || "";
      setManualLocation(name);
      setCity(locationAddress[0].city || "");
    } catch (error) {
      console.error(error);
    }
  };

  const onLocationIconPress = () => {
    setShowMap(true);
    getCurrentLocation();
  };

  const onCancel = () => {
    setContactInfo("");
    setLocation(null);
    setManualLocation("");
    setAge("");
    setColor("");
    setDescription("");
    //setAttemptedSubmit(false);
    setImage(null);
    router.replace("./LandingPage");
  };

  const UploadMedia = async () => {
    if (!contactInfo || !age || !color || !description || !image) {
      setAttemptedSubmit(true); // Set attempted submit to true when the form is submitted without all required fields
      Alert.alert("All fields are required");
      return; // Exit the function early if any required field is empty
    }
    setUploading(true);
  
    try {
      const { uri } = await FileSystem.getInfoAsync(image);
      const response = await fetch(uri);
      const blob = await response.blob();
      const filename = image.substring(image.lastIndexOf("/") + 1);
      const storageRef = ref(dbStorage, "Adoption/" + filename);
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
    
  
      const selectedLocation = manualLocation
        ? manualLocation
        : location
        ? {
            latitude: location.latitude,
            longitude: location.longitude,
          }
        : null;

      const user = FIREBASE_AUTH.currentUser;
  
      // Save data to Firestore
      const postRef = await addDoc(collection(dbFirestore, "strayPosts"), {
        contactInfo: contactInfo,
        location: selectedLocation,
        age: age,
        color: color,
        description: description,
        image: url,
      });
  
      // Save data to Realtime Database including latitude and longitude
      const databaseRef = dbRef(dbRealtime, "strayPosts");
      
      await push(databaseRef, {

        contactInfo: contactInfo,
        location: selectedLocation, // Include latitude and longitude directly
        age: age,
        color: color,
        description: description,
        image: url,
        postedUser: user.displayName,
        postedUserPhoto: user.photoURL
      });
  
      console.log("Photo uploaded successfully!");
  
      // Send a push notification
      sendPushNotification("New Post", "The post has successfully added!");
  
      // reset the state
      setUploading(false);
      setImage(null);
  
      // Navigate to landing page
      router.replace("./LandingPage");
      
    } catch (error) {
      console.error(error);
      setUploading(false);
      Alert.alert("An error occurred while uploading the photo");
    }
  };
  
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}> Found Location</Text>
          <View style={styles.locationContainer}>
            <TextInput
              style={styles.locationInput}
              placeholder="Enter location manually"
              value={manualLocation}
              onChangeText={(text) => setManualLocation(text)}
            />
            <TouchableOpacity
              style={styles.locationIcon}
              onPress={onLocationIconPress}
            >
              <Text>📍</Text>
            </TouchableOpacity>
          </View>
          {showMap && location && (
            <MapView
            style={styles.mapContainer}
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="Found Location"
              onPress={() => console.log(`Clicked location: ${location.latitude}, ${location.longitude}`)}
            />
          </MapView>
        )}

        </View>

        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Color</Text>
          <TextInput
            style={[styles.input, attemptedSubmit && !color && styles.invalidInput]}
            onChangeText={(text) => setColor(text)}
            required
          />
          {attemptedSubmit && !color && <Text style={styles.errorMessage}>Color is required</Text>}
        </View>

        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Age</Text>
          <TextInput
            style={[styles.input, attemptedSubmit && !age && styles.invalidInput]}
            onChangeText={(text) => setAge(text)}
            required
          />
          {attemptedSubmit && !age && <Text style={styles.errorMessage}>Age is required</Text>}
        </View>

        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Description</Text>
          <TextInput
            style={[styles.descriptioninput, attemptedSubmit && !description && styles.invalidInput]}
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => setDescription(text)}
            required
          />
          {attemptedSubmit && !description && <Text style={styles.errorMessage}>Description is required</Text>}
        </View>

        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Contact Info</Text>
          <TextInput
            style={[styles.input, attemptedSubmit && !contactInfo && styles.invalidInput]}
            onChangeText={(text) => {
              setContactInfo(text);
              handlePhoneNumberChange(text);
            }}
            required
            keyboardType="phone-pad"
            maxLength={10}
          />
          {attemptedSubmit && !contactInfo && <Text style={styles.errorMessage}>Contact Info is required</Text>}
          {!isValidPhone && <Text style={styles.errorMessage}>Contact Info must have 10 digits</Text>}
        </View>
      
        
        <TouchableOpacity onPress={pickImage}>
            <View className="flex-row gap-1 bg-blue-400 rounded p-2">
              <Icon name="add-a-photo" size={24} color="black" />
              <Text> Select a picture </Text>
            </View>
          </TouchableOpacity>
        <View style={styles.imageContainer}>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 300, height: 300 }}
            />
          )}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.uploadButton} onPress={UploadMedia}>
              <Text style={styles.buttonText}> Post </Text>
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
  input: {
    height: 40,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  selectButton: {
    borderRadius: 10,
    width: 300,
    height: 40,
    backgroundColor: "#6391db",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  labelContainer: {
    marginBottom: 15,
  },
  descriptioninput: {
    height: 100,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  labelText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
    marginTop: 20,
  },
  cancelButton: {
    borderRadius: 10,
    width: 140,
    height: 50,
    backgroundColor: "#c5cfde",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
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
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginRight: 10,
  },
  locationIcon: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#c5cfde",
  },
  mapContainer: {
    height: 200,
    width: 300,
    borderRadius: 10,
    overflow: "hidden",
  },
  errorMessage: {
    color: "red",
    fontSize: 12,
    marginLeft: 10,
  },
  invalidInput: {
    borderColor: "red",
  },
});

export default UploadMediaFile;




