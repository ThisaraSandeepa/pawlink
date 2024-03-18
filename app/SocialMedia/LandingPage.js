import React, { useState, useEffect } from "react";
import { View, ScrollView, TextInput,Text,TouchableOpacity } from "react-native"; // Import TextInput
import { onValue, ref, getDatabase } from "firebase/database";
import Post from "../components/Post";
import { FIREBASE_REALTIME_DB, FIREBASE_AUTH } from "../../FirebaseConfig";
import { Icon } from "react-native-elements";


const LandingPage = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const [showSearch, setShowSearch] = useState(false);
  

  // Fetch all the social media posts from the Realtime Database
  useEffect(() => {
    const postsRef = ref(getDatabase(), "socialMediaPosts");
    onValue(postsRef, (snapshot) => {
      const postsData = snapshot.val() ? Object.entries(snapshot.val()) : [];
      const formattedPosts = postsData.map(([id, data]) => ({
        id,
        ...data
      }));
      setPosts(formattedPosts);
    });
  }, []);

  // Function to filter posts based on user name
  const filterPostsByUser = (user) => {
    return posts.filter(post => post.user.toLowerCase().includes(user.toLowerCase()));
  };
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <View className = "bg-white">
      <Text className = "font-bold text-3xl left-4 text-blue-600 tracking-wider">
       PawLink
      </Text>
      <TouchableOpacity onPress={toggleSearch} className="left-40 -top-7 ">
        <Icon name="search" type="ionicon" color="black" size={30} />
      </TouchableOpacity>

      {/* Search bar */}
      {showSearch && (
      <TextInput
        placeholder="Search by user name"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        className = " border-2 border-gray-300 rounded-xl w-80 h-10 mb-4 text-center left-10 mt-2 bg-white -top-3 "
      />
      )}
      <ScrollView>
        {/* Render filtered posts */}
        {filterPostsByUser(searchQuery).map((post) => (
          <Post
            key={post.id}
            id={post.id}
            user={post.user}
            description={post.description}
            image={post.image}
            likes={post.likes}
            comments={post.comments}
            userProfilePicture={post.userProfilePicture}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default LandingPage;
