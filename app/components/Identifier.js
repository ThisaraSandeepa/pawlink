/*import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import { useRoute } from "@react-navigation/native";

// UserProfile Component
export default function UserProfile() {

  const { post } = useRoute().params;

  return (
    <View style={styles.container}>
   
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: post.postedUserPhoto }}
          style={styles.profilePicture}
        ></Image>
      </View>


      <View style={styles.userInfo}>
        <Text style={styles.userName}>{post.postedUser}</Text>
        <Text style={styles.identifierText}>Identifier</Text>
        <Text style={styles.Contact}>Contact Information</Text>
      </View>
      <View style={styles.rectangle1}>
        <Text className="text-center mt-1 text-white">
          {" "}
          {post.contactInfo}{" "}
        </Text>
      </View>

      <Text style={styles.location}>Pickup Location</Text>
      <View style={styles.rectangle3}>
        <Text className="text-center mt-1 text-white"> {post.location} </Text>
      </View>





      <View>
        <TouchableOpacity style={styles.ctaButton}>
          <Link href={"../Adoption/LandingPage"}>
            <Text style={styles.ctaLabel}>Return To Main Menu</Text>
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5", // Add a background color
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 40,
    marginLeft: 20,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backIcon: {
    width: 24,
    height: 24,
  },

  profileContainer: {
    position: "relative",
    marginTop: 10,
    width: 370,
    height: 700,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    marginBottom: 20,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profilePicture: {
    borderRadius: 10,
    backgroundColor: "#E5E5E5",
    height: 62,
    width: 63,
    top: 200,
    left: 30,
  },
  userInfo: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#1D1D28",
    marginBottom: 10,
    top: -470,
    left: 120,
  },

  identifierText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#A4A4B2",
    top: -472,
    left: 120,
  },
  Contact: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#1D1D28",
    top: -400,
    left: 110,
    margin: 10,
    alignItems: "center",
  },

  ctaButton: {
    top: -250,
    width: 200,
    height: 40,
    backgroundColor: "#004AAD",
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  ctaLabel: {
    fontWeight: "600",
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 40,
  },
  rectangle1: {
    width: 265,
    height: 30,
    borderRadius: 10,
    backgroundColor: "gray",
    marginTop: 15,
    shadowColor: "#000",
    top: -340,
  },
  rectangle2: {
    width: 265,
    height: 30,
    borderRadius: 10,
    backgroundColor: "gray",
    marginTop: 20,
    shadowColor: "#000",
    top: -340,
  },
  location: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#1D1D28",
    top: -300,
    left: 0,
  },
  rectangle3: {
    width: 265,
    height: 30,
    borderRadius: 10,
    backgroundColor: "gray",
    marginTop: 20,
    shadowColor: "#000",
    top: -310,
  },
});*/

/*import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import { useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";

// UserProfile Component
export default function UserProfile() {
  const { post } = useRoute().params;
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const openLocationOnMap = () => {
    // Access latitude and longitude from post.locationKey
  const locationParts = post.locationKey.split("_");
  const latitude = parseFloat(locationParts[0]);
  const longitude = parseFloat(locationParts[1]);
  setLatitude(latitude);
    setLatitude(latitude);
    setLongitude(longitude);
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: post.postedUserPhoto }}
          style={styles.profilePicture}
        />
      </View>

     
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{post.postedUser}</Text>
        <Text style={styles.identifierText}>Identifier</Text>
        <Text style={styles.Contact}>Contact Information</Text>
      </View>
      <View style={styles.rectangle1}>
        <Text className="text-center mt-1 text-white">{post.contactInfo}</Text>
      </View>

      <Text style={styles.location}>Pickup Location</Text>
      <TouchableOpacity style={styles.rectangle3} onPress={openLocationOnMap}>
        <Text className="text-center mt-1 text-white"> {post.locationKey}</Text>
      </TouchableOpacity>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: latitude, longitude: longitude }}
          title="Location"
          description="Selected location"
        />
      </MapView>

      <View>
        <TouchableOpacity style={styles.ctaButton}>
          <Link href={"../Adoption/LandingPage"}>
            <Text style={styles.ctaLabel}>Return To Main Menu</Text>
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5", // Add a background color
  },
  profileContainer: {
    marginBottom: 20,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profilePicture: {
    borderRadius: 10,
    backgroundColor: "#E5E5E5",
    height: 62,
    width: 63,
  },
  userInfo: {
    marginBottom: 20,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#1D1D28",
    marginBottom: 10,
  },
  identifierText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#A4A4B2",
  },
  Contact: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#1D1D28",
    margin: 10,
  },
  ctaButton: {
    width: 200,
    height: 40,
    backgroundColor: "#004AAD",
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  ctaLabel: {
    fontWeight: "600",
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 40,
  },
  rectangle1: {
    width: 265,
    height: 30,
    borderRadius: 10,
    backgroundColor: "gray",
    marginTop: 15,
    shadowColor: "#000",
  },
  rectangle3: {
    width: 265,
    height: 30,
    borderRadius: 10,
    backgroundColor: "gray",
    marginTop: 20,
    shadowColor: "#000",
  },
  location: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#1D1D28",
    marginTop: 20,
  },
  map: {
    flex: 1,
    width: 300,
    height: 300,
    marginBottom: 20,
  },
});*/
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import { useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";

// UserProfile Component
export default function UserProfile() {
  const { post } = useRoute().params;
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    const locationParts = post.locationKey.split("_");
    const latitude = parseFloat(locationParts[0]);
    const longitude = parseFloat(locationParts[1]);
    setLatitude(latitude);
    setLongitude(longitude);
  }, []);

  return (
    <View className = "flex-1 items-center justify-center bg-white">
      {/* Profile Content */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: post.postedUserPhoto }}
          className="rounded-lg  w-28 h-28  bg-gray-300 mt-4 right-24 "
        />
      </View>

      {/* User Information */}
      <View style={styles.userInfo}>
        <Text className="font-semibold text-lg ml-36 -top-24 text-blue-950   ">{post.postedUser} </Text>
        <Text className=" -top-24 ml-36 mt-1 font-normal text-gray-500">Identifier</Text>
        <Text className="-mt-10 text-center text-black font-semibold">Contact Information</Text>
      </View>
      <View className="rounded-lg border-2 border-blue-600 w-64 bg-white  ">
        <Text className="text-center  text-black  mb-2 mt-2 font-bold">{post.contactInfo}</Text>
      </View>

      <Text className = "font-semibold mt-5 mb-4">Pickup Location</Text>
      <TouchableOpacity className="rounded-lg border-2 w-64 h-9 mb-2  border-blue-600  bg-white" >
        <Text className="text-center mt-1 text-black font-bold"> {post.location}</Text>
      </TouchableOpacity>

      <MapView
        className = "w-64 h-56  mt-4 mb-5 "
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 10,
          longitudeDelta: 81,
        }}
      >
        <Marker
          coordinate={{ latitude: latitude, longitude: longitude }}
          title="Location"
          description="Selected location"
        />
      </MapView>

      <View>
        <TouchableOpacity style={styles.ctaButton}>
          <Link href={"../Adoption/LandingPage"}>
            <Text style={styles.ctaLabel}>Return To Main Menu</Text>
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5", // Add a background color
  },
  profileContainer: {
    marginBottom: 20,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profilePicture: {
    borderRadius: 10,
    backgroundColor: "#E5E5E5",
    height: 62,
    width: 63,
  },
  userInfo: {
    marginBottom: 20,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#1D1D28",
    marginBottom: 10,
  },
  identifierText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#A4A4B2",
  },
  Contact: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#1D1D28",
    margin: 10,
  },
  ctaButton: {
    width: 200,
    height: 40,
    backgroundColor: "#004AAD",
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  ctaLabel: {
    fontWeight: "600",
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 40,
  },
  rectangle1: {
    width: 265,
    height: 30,
    borderRadius: 10,
    backgroundColor: "gray",
    marginTop: 15,
    shadowColor: "#000",
  },
  rectangle3: {
    width: 265,
    height: 30,
    borderRadius: 10,
    backgroundColor: "gray",
    marginTop: 20,
    shadowColor: "#000",
  },
  location: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#1D1D28",
    marginTop: 20,
  },
  map: {
    flex: 1,
    width: 300,
    height: 300,
    marginBottom: 20,
  },
});
