import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../FirebaseConfig'; 
import Post from '../components/Post';  

const MyComponent = () => {
  const [posts, setPosts] = useState([]);

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
            key={post.id}
            user={post.user}
            image={{ uri: post.image }}
            likes={post.likes}
            comments={post.comments}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default MyComponent;
