import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { onValue, ref, getDatabase } from "firebase/database";
import Post from "../components/Post";
import { Icon } from "react-native-elements";

const LandingPage = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const [showSearch, setShowSearch] = useState(false);  // State to show/hide search bar
  const [refreshing, setRefreshing] = useState(false); // State to indicate refresh state

  // Fetch all the social media posts from the Realtime Database
  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to fetch posts from Realtime Database
  const fetchPosts = () => {
    const postsRef = ref(getDatabase(), "socialMediaPosts");                   // Reference to socialMediaPosts node in the database
    onValue(postsRef, (snapshot) => {
      const postsData = snapshot.val() ? Object.entries(snapshot.val()) : [];  // Convert posts data to an array
      const formattedPosts = postsData.map(([id, data]) => ({
        id,
        ...data,
      }));
      setPosts(formattedPosts);
      setRefreshing(false); // Reset refreshing state after fetching posts
    });
  };

  // Refresh the posts
  const onRefresh = () => {
    console.log("Refreshing...");
    setRefreshing(true); // Set refreshing state to true when refreshing starts
    fetchPosts(); // Fetch posts again
  };

  // Function to filter posts based on user name
  const filterPostsByUser = (user) => {
    return posts.filter((post) =>
      post.user.toLowerCase().includes(user.toLowerCase())
    );
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <View className="bg-slate-200 ">
      <Text className="font-bold text-3xl left-4 text-blue-600  tracking-wider mt-14">
        PawLink
      </Text>
      <TouchableOpacity onPress={toggleSearch} className="left-40 -top-8 ">
        <Icon name="search" type="ionicon" color="black" size={30} />
      </TouchableOpacity>

      {/* Search bar */}
      {showSearch && (
        <TextInput
          placeholder="Search by user name"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          className=" border-2  w-80 rounded-lg p-1 px-3 ml-8 text-center bg-slate-200 border-white -mt-2 mb-2"
        />
      )}
      <ScrollView
        className=" mb-32"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
