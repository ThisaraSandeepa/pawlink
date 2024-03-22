
import React, { useState, useEffect } from "react";
import {  View, Text, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import { useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { Icon } from "react-native-elements";

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
      <View className=" shadow" style="box-shadow: 0px 3px 4.65px 0px rgba(0,0,0,0.27);">
        <Image
          source={{ uri: post.postedUserPhoto }}
          className="rounded-full  w-[150px] h-[150px]  bg-gray-300 mt-10 right-24 "
        />
      </View>

      {/* User Information */}
      <View className="mb-20">
        <Text className="font-extralight text-lg ml-36 -top-24 text-blue-700   ">{post.postedUser} </Text>
        <Text className=" -top-24 ml-36 mt-1 font-extraboldbold text-gray-500">Identifier</Text>
        <Text className="-mt-6 text-center text-lg text-blue-400 font-extrabold">Contact Information</Text>
      </View>
      <View className="rounded-lg  bg-slate-300 w-[350px] h-[50px]   -mt-16 ">
        <Text className="text-center  text-black text-lg  mb-2 mt-2 font-bold">{post.contactInfo}</Text>
      </View>

      <Text className = "font-semibold mt-5 mb-4 text-lg text-blue-400" >Pickup Location</Text>
      <TouchableOpacity className="rounded-lg  w-[350px] h-[50px] mb-1  bg-slate-300 flex-row justify-center" >
        <Icon name="location" type="evilicon" color="red" size={30} className="mt-2"/>
        <Text className="text-center text-lg mt-3 text-black font-extrabold"> {post.location}</Text>
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
        <TouchableOpacity className="w-[350px] h-[50px] bg-blue-500 rounded-3xl px-20 mb-20">
          <Link href={"../Adoption/LandingPage"}>
            <Text className="text-lg font-extrabold text-white justify-center leading-10 ">Return To Main Menu</Text>
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
}

