import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { getDatabase, ref as dbRef, push } from "firebase/database";
import { FIREBASE_APP, FIREBASE_AUTH } from "../../FirebaseConfig";
import { router } from "expo-router";
import { CheckBox, Icon } from "react-native-elements";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { sendPushNotification } from "../components/pushNotifications";
import { Picker } from "@react-native-picker/picker";

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
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [selectedAge, setSelectedAge] = useState("below 6 months");
  const [wounded, setWounded] = useState(false);
  const [male, setMale] = useState(true);
  const [female, setFemale] = useState(false);

  const gender = male ? "Male" : female ? "Female" : "";
  const injuries = wounded ? "Yes" : "No";
  

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

  const onSearchIconPress = async () => {
    setShowMap(true);
    await handleSearch();
  };

  const onMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLocation({
      latitude,
      longitude,
    });
    fetchLocationNameFromCoordinates(latitude, longitude);
  };

  const handleSearch = async () => {
    try {
      const address = await Location.geocodeAsync(searchQuery);
      if (address.length > 0) {
        const { latitude, longitude } = address[0];
        setLocation({ latitude, longitude });
        fetchLocationNameFromCoordinates(latitude, longitude);
      } else {
        Alert.alert("Location not found");
      }
    } catch (error) {
      console.log("Error fetching location:", error);
      Alert.alert("Error", "Invalid location name!");
    }
  };

  const onCancel = () => {
    // Aler the user if they want to discard the post

    Alert.alert(
      "Discard Post",
      "Are you sure you want to discard the post?",
      [
        {
          text: "Discard",
          onPress: () => {
            // Reset the states
            setContactInfo("");
            setLocation(null);
            setManualLocation("");
            setSelectedAge("");
            setColor("");
            setDescription("");
            setImage(null);

            // Navigate to landing page
            router.replace("./LandingPage");
          },
        },
        {
          text: "Cancel",
        },
      ],
      { cancelable: false }
    );
  };

  const UploadMedia = async () => {
    // Check if all the data is entered
    if (
      !contactInfo ||
      !location ||
      !color ||
      !description ||
      !image ||
      !selectedAge ||
      !gender
    ) {
      Alert.alert("", "All the field are required!");
      return;
    }

    // Check if the phone number is valid
    if (!isValidPhone) {
      Alert.alert("", "Invalid phone number!");
      return;
    }

    try {
      // Upload image to Firebase Storage
      const { uri } = await FileSystem.getInfoAsync(image);
      const response = await fetch(uri);
      const blob = await response.blob();
      const filename = image.substring(image.lastIndexOf("/") + 1);
      const storageRef = ref(dbStorage, "Adoption/" + filename);
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);

      // Determine location key
      const locationKey = location
        ? `${location.latitude}_${location.longitude}`
        : "";

      const selectedLocation = manualLocation
        ? manualLocation
        : location
        ? {
            latitude: location.latitude,
            longitude: location.longitude,
          }
        : null;
      const user = FIREBASE_AUTH.currentUser;

      // Save data to Firestore  realtimedatabase
      const postRef = await addDoc(collection(dbFirestore, "strayPosts"), {
        contactInfo: contactInfo,
        location: selectedLocation,
        locationKey: locationKey, // Include location key
        age: selectedAge,
        color: color,
        description: description,
        image: url,
        postedUser: user.displayName,
        postedUserPhoto: user.photoURL,
        wounded: injuries,
        gender: gender,
      });

      // Save data to Realtime Database including latitude and longitude
      const databaseRef = dbRef(dbRealtime, "strayPosts");
      await push(databaseRef, {
        contactInfo: contactInfo,
        location: selectedLocation,
        locationKey: locationKey, // Include location key
        age: selectedAge,
        color: color,
        description: description,
        image: url,
        postedUser: user.displayName,
        postedUserPhoto: user.photoURL,
        wounded: injuries,
        gender: gender,
      });

      console.log("Photo uploaded successfully!");

      // Show an alert
      Alert.alert("Success", "The post has been added successfully!");

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
    <ScrollView>
      <View className="flex items-center justify-center bg-white">
        {/* Location Fetching */}
        <View className="mt-6 w-80">
          <Text className="justify-start font-bold mb-2"> Found Location </Text>
          <View className="flex-row border rounded-lg">
            <View className="justify-center ml-1">
              <Icon
                name="location"
                type="ionicon"
                color="red"
                size={25}
                onPress={onLocationIconPress}
              />
            </View>
            <TextInput
              className="w-64 p-1 ml-1"
              placeholder="Search Location"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
            <View className="justify-center">
              <Icon
                name="search"
                type="ionicon"
                color="black"
                size={25}
                onPress={onSearchIconPress}
              />
            </View>
          </View>
          <View className="flex-1 items-center">
            {showMap && location && (
              <MapView
                className="flex w-80 h-52 mt-3 items-center"
                onPress={onMapPress}
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
                  draggable
                  onDragEnd={onMapPress}
                />
              </MapView>
            )}
          </View>

          {/* Color */}
          <View className="mt-4">
            <Text className="items-start font-bold mb-2"> Color </Text>
            <TextInput
              className="border w-88 p-1 rounded-lg pl-4 items-center"
              placeholder="Enter the colour"
              onChangeText={(text) => setColor(text)}
            />
          </View>

          {/* Age */}
          <Text className="font-bold mt-4 mb-2"> Age </Text>
          <View className="border rounded-lg">
            <Picker
              selectedValue={selectedAge}
              onValueChange={(itemValue) => setSelectedAge(itemValue)}
            >
              <Picker.Item label="Below 6 months" value="Below 6 months" />
              <Picker.Item
                label="6 months - 1 year"
                value="6 months - 1 year"
              />
              <Picker.Item
                label=" More than 1 year"
                value=" More than 1 year"
              />
            </Picker>
          </View>

          {/* Contact Info */}
          <View className="mt-5">
            <Text className="font-bold mb-3"> Contact Infomation </Text>
            <TextInput
              className="border w-88 p-1 rounded-lg pl-4 items-center"
              placeholder="Phone Number"
              maxLength={10}
              keyboardType="phone-pad"
              onChangeText={(text) => {
                setContactInfo(text);
                handlePhoneNumberChange(text);
              }}
            />
          </View>

          {/* Male or Female */}
          <View className="mt-3 flex-row items-center ml-1 justify-between">
            <Text className="font-bold">Gender</Text>
            <View className="flex-row left-14">
              <CheckBox
                checked={male}
                onPress={() => {
                  setMale(!male);
                  setFemale(false);
                }}
              />
              <Text className="mt-4 -left-3">Male</Text>
            </View>
            <View className="flex-row ml-4">
              <CheckBox
                checkedColor="pink"
                checked={female}
                onPress={() => {
                  setFemale(!female);
                  setMale(false);
                }}
              />
              <Text className="mt-4 -left-3">Female</Text>
            </View>
          </View>

          {/* Wonunded or not */}
          <View className="flex-row items-center justify-between">
            <Text className="font-bold ml-1">Any Physical Wounds?</Text>
            <View className="flex-row left-3">
              <CheckBox
                checkedColor="red"
                checked={wounded}
                onPress={() => setWounded(!wounded)}
              />
              <Text className="mt-4 -left-3">Yes</Text>
            </View>
            <View className="flex-row">
              <CheckBox
                checked={!wounded}
                onPress={() => setWounded(!wounded)}
              />
              <Text className="mt-4 -left-3">No</Text>
            </View>
          </View>

          {/* Any other info */}
          <View className="mt-5 items-center">
            <Text className="font-bold mb-3 text-center">
              {" "}
              Any other Information{" "}
            </Text>
            <TextInput
              className="border w-80 p-4 rounded-lg items-center text-center"
              placeholder="Enter the description"
              multiline
              numberOfLines={4}
              onChangeText={(text) => setDescription(text)}
            />
          </View>

          {/* Upload Image */}
          <View className="items-center">
            {image ? (
              <Image
                source={{ uri: image }}
                className="w-[300px] h-[300px] rounded-md my-5"
              />
            ) : (
              // Show the image
              <TouchableOpacity onPress={pickImage}>
                <View className="w-[300px] h-[300px] bg-slate-200 rounded-3xl mb-2 justify-center items-center my-5 ">
                  <View className="flex-row gap-1 shadow-2xl rounded-2xl p-2">
                    <Icon name="add-a-photo" size={24} color="black" />
                    <Text> Select a picture </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          </View>

          {/* Discard and Post Buttons */}
          <View className="flex-row justify-center gap-10 mb-10">
            <TouchableOpacity
              onPress={UploadMedia}
              className="bg-blue-700 pt-3  text-center rounded-lg px-6 py-2"
            >
              <Text className="text-white"> Post </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onCancel}
              className="bg-red-700 pt-3  text-center rounded-lg px-6 py-2"
            >
              <Text className="text-white"> Discard </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default UploadMediaFile;
