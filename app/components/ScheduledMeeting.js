import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import { useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";

// UserProfile Component
export default function UserProfile() {
  const { post, slotData } = useRoute().params;
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  console.log(post);
  console.log(slotData);

  useEffect(() => {
    const locationParts = post.locationKey.split("_");
    const latitude = parseFloat(locationParts[0]);
    const longitude = parseFloat(locationParts[1]);
    setLatitude(latitude);
    setLongitude(longitude);
  }, []);

  return (
    // Main container
    <View className="flex-1 justify-center items-center bg-blue-400">
      <Text> {post.age} </Text>
      <Text> {post.age} </Text>
      <Text> {post.age} </Text>

      {/* MapView */}
      <MapView
        className="w-64 h-56  mt-4 mb-5 "
        initialRegion={{
          latitude: 7.8731,
          longitude: 80.7718,
          latitudeDelta: 4,
          longitudeDelta: 1,
        }}
      >
        <Marker
          coordinate={{ latitude: latitude, longitude: longitude }}
          title="Location"
          description="Selected location"
        />
      </MapView>

      {/* Below View */}
    </View>
  );
}
