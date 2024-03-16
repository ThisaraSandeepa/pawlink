import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Link } from 'expo-router';
import { Icon } from 'react-native-elements';

const AdoptMe = () => {
  const route = useRoute();
  const { post } = route.params;
  console.log(post);

  return (

    <ScrollView>
      <View className="bg-white rounded text-white p-2 w-25 text-center">
        <Image source={{ uri: post.imageURL }} className="mt-10 w-1/4 h-24 -top-2.5 rounded-lg" />
         <View className="flex flex-row flex-wrap justify-between w-full p-10 border border-gray-400 shadow-lg h-96 bg-white mt-15 rounded-lg"> 

          <View className="flex-row alignItems: 'center'," >
            <View className="w-16 h-16 border border-gray-400 mb-20 mx-5 justify-center rounded-lg shadow">
              <Text className="text-blue-500 text-xs font-bold text-center -top-5">{post.color}</Text>
              <Text className="text-sm text-center -mt-5">Color</Text>
            </View>
            <View className="w-16 h-16 border border-gray-400 mb-20 mx-5 justify-center rounded-lg shadow">
              <Text className="text-blue-500 text-xs font-bold text-center -top-5">{post.age}</Text>
              <Text className="text-sm text-center -mt-5">Age</Text>
            </View>
            <View className="w-16 h-16 border border-gray-400 mb-20 mx-5 justify-center rounded-lg shadow">
              <Text className="text-blue-500 text-xs font-bold text-center -top-5">{post.breed}</Text>
              <Text className="text-sm text-center -mt-5">Breed</Text>
            </View>

          </View>
          <View className="flex flex-col w-screen ">
            <View className="flex-row justify-center text-center ">
              <Icon name='location' type='evilicon' color='red' size={30} />
              <Text className="text-base font-bold text-justify">{post.location}</Text>
            </View>
            {/* <Text className="text-base font-bold text-justify top-2 mx-10">{post.description}</Text> */}
            {/* <Text className="text-base font-bold text-justify top-2 mx-10">{post.contactInfo}</Text> */}
          </View>
          <Link
            href="../components/Details"
            className='bg-blue-800 rounded text-white p-2 w-25  mx-10 text-center flex  items-center'>
            Adopt Me!
          </Link>
          </View> 
        </View>
    </ScrollView>
  );
};

export default AdoptMe;
