import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { CheckBox, Icon } from "react-native-elements";
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
      <View className="text-center rounded-lg">
        <Image
          source={{ uri: post.image }}
          resizeMode="cover"
          className="flex-1  h-[350px] justify-center "
        />

        <View className="flex flex-row flex-wrap justify-between p-10 border-3 border-gray-200 border-r-14 shadow-lg  bg-white -mt-7 rounded-t-3xl ">
          <View className="flex-row items-center right-4">
            <View className="w-1/4 h-28 w border-2 border-blue-800 mb-20 mx-5 justify-center rounded-2xl shadow  ">
              <Text className="text-blue-500 text-base font-semibold text-center -top-3 ">
                {post.color}
              </Text>
              
              <Text className=" text-slate-500 text-center -mt-5 -my-1 text-md font-bold">
                Color
              </Text>
            </View>
            <View className="w-1/4 h-28 border-2 border-blue-800 mb-20 mx-3 justify-center rounded-2xl shadow bg-white">
              <Text className="text-blue-500 text-md font-semibold text-center -top-4 ">
                {post.wounded}
              </Text>
              <Text className="  text-slate-500 text-center -mt-5 -my-2 text-md font-bold">
                Injuries
              </Text>
            </View>
            
            <View className="w-1/4 h-28 border-2 border-blue-800 mb-20 mx-5 justify-center rounded-2xl shadow bg-white " >
            <Text className="text-blue-500 text-base font-semibold text-center -top-4 ">
                {post.gender}
              </Text>
              <Text className="  text-slate-500 text-center -mt-5 -my-1 text-md font-bold">
                Gender
              </Text>

            </View>
          </View>
          <View className =" border-2 rounded-2xl h-12 w-56 bg- border-blue-800 items-center left-12 mb-6 -mt-10  ">
          <Text className="  text-slate-500  font-semibold fixed text-base text-center  top-2 mb-5 items-center mr-2  ">
            Age : <Text className="text-blue-500">{post.age}</Text>
          </Text>
          </View>
          <View className="flex justify-center w-full ml-16 ">
            <View className="flex-row justify-center   ">
              <Icon name="location" type="evilicon" color="red" size={30} />
              <Text className="text-slate-600 text-base font-extrabold  w-80  ">
                {post.location}
              </Text>
            </View>
          </View>
          <View className = "border-2 border-blue-200 fixed  mb-4 mt-4 rounded-xl bg-white items-center justify-center h-24 w-80   ">
          <Text className="  text-black  font-semibold fixed text-base text-left  top-2 mb-5 ml-2 mr-2   ">
            {post.description}

          </Text>
        
          </View>
         
         
         

          <TouchableOpacity
            className="bg-blue-700 rounded-lg text-white p-2  mx-20  text-center  px-4 flex left-4 justify-items-center transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-gray-500 duration-400 "
            onPress={goToDetails}
          >
            <Text className="text-white text-center text-lg w-full font-medium ">
              Adopt Me
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AdoptMe;
