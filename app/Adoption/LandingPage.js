import React, { useState, useEffect } from "react";
import { View, ScrollView, Image, Text, TouchableOpacity , TextInput, ImageBackground} from "react-native";
import { onValue, ref } from "firebase/database";
import Post from "../components/AdoptPost";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_REALTIME_DB } from "../../FirebaseConfig";

const LandingPage = () => {

  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState("");

  // Display the stray posts from the Firebase Realtime Database
  useEffect(() => {
    const postsRef = ref(FIREBASE_REALTIME_DB, "strayPosts");
    onValue(postsRef, (snapshot) => {
      const postsData = snapshot.val() ? Object.entries(snapshot.val()) : [];
      const formattedPosts = postsData.map(([id, data]) => ({
        id,
        ...data,
      }));
      setPosts(formattedPosts);
    });
  }, []);

  // Function to filter posts based on location
  const filterPostsByLocation = (location) => {
    return posts.filter((post) =>
      post.location ? post.location.toLowerCase().includes(location.toLowerCase()) : false
    );
  };

  // Pass the post object to the AdoptMe component
  const goToAdoptMe = (post) => {
    navigation.navigate("AdoptMe", { post });
  };

  return (
    <View className=" h-full bg-white ">
      <ImageBackground source={require("../../assets/images/Puppy.jpeg")}  />
      <ScrollView>
        <Image
          source={require("../../assets/images/pawlink1.png")}
          className="w-1/3 h-32 mb-2 rounded-lg ml-32 mt-2"
        />
        {/* Search bar */}
        <TextInput
          placeholder="Search by location"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          className = " border-2 border-gray-300 rounded-xl w-80 h-10 mb-4 text-center left-10 mt-2 bg-white"
        />
        
        <View className="w-80 h-24 border-2 border-gray-100 mb-8 rounded-md justify-center items-center ml-8 mt-3">
          <Image
            source={require("../../assets/images/Component.png")}
            className="w-80 h-24 rounded-md"
          />
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("SocialMedia", { screen: "LandingPage" })
          }
          className="w-20 bg-white h-7 rounded-md -top-16 ml-10 -mt-1 " >
          <Text className="text-start ml-2 mt-1 font-semibold text-blue-800">Check out</Text>
        </TouchableOpacity>

        <View className = "  " >
        {filterPostsByLocation(searchQuery).map((post) => (
            <TouchableOpacity key={post.id} onPress={() => goToAdoptMe(post)} >
              <Post
                image={{ uri: post.image }}
                location={post.location ? post.location.toLowerCase() : ''}
                contactInfo={post.contactInfo}
                user={post.postedUser}
                id = {post.id}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};



export default LandingPage;
