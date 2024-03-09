import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../FirebaseConfig'; 
import Post from '../components/Post';  


const MyComponent = () => {
  const [posts, setPosts] = useState([]);

  // Fetch posts from Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = collection(FIRESTORE_DB, 'socialMediaPosts');
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
        {posts.map((post) => (
          <Post
            key={post.id}            // Add key prop
            user={post.user}         // Add user prop
            image={{ uri: post.image }}
            likes={post.likes}        // Add likes prop
            comments={post.comments} // Add comments prop
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default MyComponent;