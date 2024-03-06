import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../FirebaseConfig'; 
import Post from '../components/Post';  

const MyComponent = () => {
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      const postDoc = await getDoc(doc(FIRESTORE_DB, 'socialMediaPosts', '3WTcvr8uyRVoQqzjuitc'));
      if (postDoc.exists()) {
        setPostData(postDoc.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchPostData();
  }, []);

  return (
    <View>
      <ScrollView>
        {postData && (
          <Post
            user={postData.user}
            image={{ uri: postData.image }}
            likes={postData.likes}
            comments={postData.comments}
          />
        )}

        <Post
          user="User2"
          image={require("../../assets/images/dog2.jpg")}
          likes={10}
          comments={2}
        />

        <Post
          user="User3"
          image={require("../../assets/images/dog3.jpg")}
          likes={15}
          comments={5}
        />
      </ScrollView>
    </View>
  );
};

export default MyComponent;