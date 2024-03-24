import React, { useState, useEffect } from "react";
import {
  
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import { useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { Icon } from "react-native-elements";


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
  
      <View className="flex-1 items-center mt-12  ">
        {/* Profile Content */}

        
        <View className="flex items-center h-screen w-full  bg-white shadow-black shadow-md ">
        <ScrollView>
          <View className="bg-white border border-blue-800 mt-12 w-[350px] h-[300px] flex items-center rounded-3xl">
            <Image
              source={{ uri: slotData.VeterinarianPhoto }}
              className="rounded-lg  w-[100px] h-[100px] -top-4 -mt-1"
            ></Image>

            <View className="flex flex-col items-center justify center -mt-1">
              <Text className="font-extrabold text-lg">{slotData.veterinarian}</Text>
              <Text className="font-bold text-base text-blue-900  ">Veterinarian</Text>
            </View>

            <Text className="font-bold text-base items-center mb-3 mt-2">  Contact Number</Text>
            <View className="flex flex-col items-center -mt-1">
              <View className=" rounded-lg border-2  w-64 h-9  border-blue-400  ">
                <Text className="text-center text-black font-semibold mt-1">
                  {" "}
                  {slotData.VeterinarianContact}{" "}
                </Text>
              </View>
              <Text className="font-bold text-base items-center mt-2 -mb-1"> Vet Location</Text>
              <View className="flex flex-col items-center">
                <View className=" rounded-lg border-2  w-64 h-9 border-blue-400 mt-2 ">
                  <Text className="text-center mt-1 text-black font-semibold  ">
                    {" "}
                    {slotData.VeterinarianLocation}{" "}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="bg-white border border-blue-800 mt-4 w-[350px] h-[600px] flex items-center rounded-3xl mb-6 ">
            <View className="mt-4 flex flex-col items-center justify center ">

              <Text className="font-bold text-base items-center "> Identifier Contact Information</Text>
              <View className="flex flex-col items-center mt-2">
                <View className=" rounded-lg border-2  w-64 h-9 border-blue-400">
                  <Text className="text-center mt-1 text-black font-semibold ">
                    {" "}
                    {post.contactInfo}{" "}
                  </Text>
                </View>
              </View>

            </View>
            <View className="flex flex-col items-center mt-2">
              <Text className="font-bold text-base items-center "> Identifier Name</Text>
              <View className=" rounded-lg border-2  w-64 h-9 border-blue-400  mt-2">
                <Text className="text-center mt-1 text-black font-semibold ">
                  {" "}
                  {post.postedUser}{" "}
                </Text>
              </View>
            </View>
            <View className="w-full flex items-center  mt-2">
              <Text className="font-semibold text-black text-base items-center">Pickup Location</Text>
            </View>
            <View className=" flex-row rounded-lg border-2 w-64 h-9  border-blue-400 mt-2 ">
              <Icon
                name="location"
                type="evilicon"
                color="red"
                size={30}
                className="mt-1 ml-6"
              />
              <Text className="text-center mt-1 text-black font-semibold"> {post.location}</Text>
            </View>
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

            <View className="mt-4 flex justify-center items-center ">
              <TouchableOpacity className="flex justify-center items-center w-[200px] h-[40px] bg-blue-700 rounded-md mb-12">
                <Link href={"../Adoption/LandingPage"}>
                  <Text className="text-base font-extrabold text-white text-center leading-loose ">Return To Main Menu</Text>
                </Link>
              </TouchableOpacity>
            </View>

          </View>
          </ScrollView>
        </View>
        
      </View>
    
  );
}
