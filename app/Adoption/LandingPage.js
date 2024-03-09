import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../FirebaseConfig';
import Post from '../components/AdoptPost';  
import {Link} from 'expo-router';



const LandingPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = collection(FIRESTORE_DB, 'strayPosts');
      const querySnapshot = await getDocs(postsCollection);

      const postsData = [];
      querySnapshot.forEach((doc) => {
        postsData.push({ id: doc.id, ...doc.data() });
      });
      setPosts(postsData);
    };
    fetchPosts();
  }, []);

  return (
    <View>
       <ScrollView>
      <Image
        source={require("../../assets/images/pawlink1.png")}
        className = "w-1/3 h-32 mb-2 rounded-lg ml-32 mt-2"
      />
      <View className="w-80 h-24 border-2 border-gray-100 mb-8 bg-gray-50 rounded-md justify-center items-center ml-8 mt-3">
        <Image source={require("../../assets/images/Component.png")}  
        className = "w-80 h-24 rounded-md"/>
      </View>
      <TouchableOpacity className = "w-20 bg-white h-7 rounded-md -mt-16 ml-10">
       <Text className="text-center text-lg font-bold mt-2 text-xs">Check out</Text>
      </TouchableOpacity>
      
     <View  className = "w-200 h-150 mt-3 ml-4 mr-4 ">
        {posts.map((post) => (
          <Post
            key={post.id}
            image={{ uri: post.image }}
            location={post.location}
          />
        ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default LandingPage;
