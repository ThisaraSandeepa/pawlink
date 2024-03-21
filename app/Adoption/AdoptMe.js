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
      <View className="bg-white  text-white p-2 text-center rounded-lg  border-l border-white">
        
        <Image
          source={{ uri: post.image }}
          resizeMode="cover"
          className="flex-1  h-[350px] rounded-t-3xl justify-center "
        />
          
        

        
        <View className="flex flex-row flex-wrap justify-between w-full p-10 border-3 border-gray-200 border-r-14 shadow-lg h-96 bg-white -mt-7 rounded-md rounded-t-3xl">
          <View className="flex-row items-center right-4">
            
            <View className="w-2/5 h-28 w border border-gray-300 mb-20 mx-5 justify-center rounded-2xl shadow">
              <Text className="text-blue-500 text-base font-semibold text-center -top-4">
                {post.color}
              </Text>
              <Text className=" text-slate-500 text-center -mt-5 -my-1 text-lg font-bold">
                Color
              </Text>
            </View>
            <View className="w-2/5 h-28 border border-gray-300 mb-20 mx-5 justify-center rounded-2xl shadow">
              <Text className="text-blue-500 text-base font-semibold text-center -top-4 ">
                {post.age}
              </Text>
              <Text className="  text-slate-500 text-center -mt-5 -my-1 text-lg font-bold">
                Age
              </Text>
            </View>
          </View>
          <View className="flex flex-col  items-center  mx-10 px-14  -mt-12   ">
            <View className="flex-row justify-center text-center ">
              <Icon name="location" type="evilicon" color="red" size={30} />
              <Text className="text-slate-600 text-lg font-extrabold  text-center ">
                {post.location}
              </Text>
            </View>
            
          </View>
          <Text className="  text-slate-500 text-gtext-base font-bold fixed text-base text-center left-10 top-2 mb-5 mx-10">{post.description}</Text> 
          <TouchableOpacity
            className="bg-blue-700 rounded-3xl text-white p-3  l mx-20  text-center  px-20 flex right-14 justify-items-center transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-gray-500 duration-400"
            onPress={goToDetails}
          >
            <Text className="text-white text-center text-xl w-full ">Adopt Me</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AdoptMe;
