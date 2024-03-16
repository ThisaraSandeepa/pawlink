import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { onValue, ref, getDatabase, get, child } from "firebase/database";
import Post from "../components/Post";
import { FIREBASE_REALTIME_DB, FIREBASE_AUTH } from "../../FirebaseConfig";

const LandingPage = () => {

  const [posts, setPosts] = useState([]);

  // Fetch all the social media posts from the Realtime Database
  useEffect(() => {
    const postsRef = ref(FIREBASE_REALTIME_DB, "socialMediaPosts");
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
        {posts.map((post) => (
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
