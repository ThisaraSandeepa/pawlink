import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const AdoptMe = () => {
  const route = useRoute();
  const { post } = route.params;

  const navigation = useNavigation();
  const goToDetails = () => {
    navigation.navigate("components/Details", { post });
  };

  return (
    <ScrollView>
     
      <View className="bg-gray-150 rounded text-white p-2 w-25 text-center">
      <Image
            source={require("../../assets/images/pawlink1.png")}
            className="w-1/4 h-24 mb-2 rounded-lg ml-32 "
          />
        <Image
          source={{ uri: post.image }}
          className="mt-4 w-1/2 h-48 -top-2.5 rounded-lg ml-20 left-4"
        />
        <View className="flex flex-row flex-wrap justify-between w-full p-10 border-3 border-gray-200 shadow-lg h-96 bg-white mt-15 rounded-md">


          <View className="flex-row items-center right-4">
            <View className="w-16 h-16 border border-gray-400 mb-20 mx-5 justify-center rounded-lg shadow">
              <Text className="text-blue-500 text-xs font-bold text-center -top-4">
                {post.color}
              </Text>
              <Text className="text-sm text-center -mt-5">Color</Text>
            </View>
            <View className="w-16 h-16 border border-gray-400 mb-20 mx-5 justify-center rounded-lg shadow">
              <Text className="text-blue-500 text-xs font-bold text-center -top-4">
                {post.age}
              </Text>
              <Text className="text-sm text-center -mt-5">Age</Text>
            </View>
            <View className="w-16 h-16 border border-gray-400 mb-20 mx-5 justify-center rounded-lg shadow">
              <Text className="text-blue-500 text-xs font-bold text-center -top-4">
                {post.breed}
              </Text>
              <Text className="text-sm text-center -mt-5">Breed</Text>
            </View>
          </View>
          <View className="flex flex-col  items-center justify-center mx-20 my-10 mt-2  ">
            <View className="flex-row justify-center text-center ">
              <Icon name="location" type="evilicon" color="red" size={30} />
              <Text className="text-base font-bold text-justify">
                {post.location}
              </Text>
            </View>
            
          </View>
          <TouchableOpacity className="bg-blue-800 rounded text-white p-2 w-25  mx-20 left-6 text-center flex  items-center" onPress={goToDetails}> 
            <Text className="text-white text-center">Adopt Me</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AdoptMe;
