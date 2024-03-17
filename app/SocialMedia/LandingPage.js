import React, { useState, useEffect } from "react";
import { View, ScrollView, TextInput } from "react-native"; // Import TextInput
import { onValue, ref, getDatabase } from "firebase/database";
import Post from "../components/Post";
import { FIREBASE_REALTIME_DB, FIREBASE_AUTH } from "../../FirebaseConfig";

const LandingPage = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query

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

  return (
    <View>
      {/* Search bar */}
      <TextInput
        placeholder="Search by user name"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        style={{ paddingHorizontal: 10, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
      />
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
