import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, Text } from 'react-native';
import { FIREBASE_REALTIME_DB } from '../../FirebaseConfig';
import { onValue, ref } from 'firebase/database';
import Post from '../components/AdoptPost';  
import { Link } from 'expo-router';

const LandingPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postsRef = ref(FIREBASE_REALTIME_DB, "strayPosts");
    onValue(postsRef, (snapshot) => {
      const postsData = snapshot.val() ? Object.entries(snapshot.val()) : [];
      const formattedPosts = postsData.map(([id, data]) => ({
        id,
        ...data
      }));
      setPosts(formattedPosts);
    });
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
      <Link href = "../SocialMedia/LandingPage" className = "w-20 bg-white h-6 rounded-md -mt-16 ml-10 text-center font-bold"> Check Out </Link>
      
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
