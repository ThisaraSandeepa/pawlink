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
            <View className="w-2/5 h-28 w border-4 border-gray-400 mb-20 mx-5 justify-center rounded-lg shadow">
              <Text className="text-blue-500 text-base font-semibold text-center -top-4">
                {post.color}
              </Text>
              <Text className=" text-center -mt-5 -my-1 text-lg font-bold">Color</Text>
            </View>
            <View className="w-2/5 h-28 border-4 border-gray-400 mb-20 mx-5 justify-center rounded-lg shadow">
              <Text className="text-blue-500 text-base font-semibold text-center -top-4 ">
                {post.age}
              </Text>
              <Text className=" text-center -mt-5 -my-1 text-lg font-bold">Age</Text>
            </View>
           
              
           
          </View>
          <View className="flex flex-col  items-center justify-center mx-10 my-10 -mt-12  left-8  ">
            <View className="flex-row justify-center text-center ">
              <Icon name="location" type="evilicon" color="red" size={30} />
              <Text className="text-lg font-extrabold text-justify">
                {post.location}
              </Text>
            </View>
            
          </View>
          <TouchableOpacity className="bg-blue-800 rounded text-white p-4  w-25   mx-20 -right-1 text-center flex  items-center" onPress={goToDetails}> 
            <Text className="text-white text-center text-base">Adopt Me</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AdoptMe;
