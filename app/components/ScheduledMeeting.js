import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import { useRoute } from "@react-navigation/native";

// UserProfile Component
export default function UserProfile() {

  const { post,slotData } = useRoute().params;
  console.log(post);
  console.log(slotData);

  return (
    <View style={styles.container}>
      {/* Profile Content */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: post.postedUserPhoto }}
          style={styles.profilePicture}
        ></Image>
      </View>

      {/* User Information */}
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{slotData.veterinarian}</Text>
        <Text style={styles.identifierText}>Veterinarian</Text>
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

      {/* <View className = "text-black">
        <Text> {slotData.VeterinarianContact}</Text>
        <Text> {slotData.date}</Text>
        <Text> {slotData.time}</Text>
        <Text> {slotData.VeterinarianLocation}</Text>
      </View> */}

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
});
