import React from "react";
import {  View, Image, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function AdoptionDetail() {
  const route = useRoute();
  const { post } = route.params;

  const navigation = useNavigation();

  const goToIdentifier = () => {
    navigation.navigate("components/Identifier", { post });
  };

  const goToVeterinarian = () => {
    navigation.navigate("components/Vetenarian", { post });
  };

  return (
    <ScrollView>
      <View className="flex-1 items-center justify-center ">
        <Image
          source={require("../../assets/images/pawlink1.png")}
          resizeMode= "contain"
          className="w-116 h-[96px] top-0 mb-10"
        />

        <Image source={{ uri: post.image }} 
        resizeMode="cover"
        className="flex-1 w-[307px] h-[273px] rounded-lg " />

        <View className="flex-col items-center w-full p-10 border-gray-600  shadow-black h-[386px] bg-white mt-14 rounded-lg shadow-md">
          <Text className="text-base text-black text-center mb-10 font-bold mt-20">
            Do you want to have veterinarian assistance before adopting
            procedure?
          </Text>

          <TouchableOpacity
            onPress={goToVeterinarian}
            className="bg-blue-700 py-3 rounded-lg px-10 mt-5 mb-3"
          >
            <Text className="text-white text-center text-base font-bold ">Yes I need</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-red-700 py-3 rounded-lg px-10 mt-5 mb-3" onPress={goToIdentifier}>
            <Text className="text-white text-center text-base font-bold ">No I don't</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};



