// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
// import { Link } from 'expo-router';
// import { getStorage, ref, getDownloadURL } from 'firebase/storage'; 
// import { getFirestore, collection, getDocs } from 'firebase/firestore'; 
// import { FIREBASE_APP } from '../../FirebaseConfig'; 

// const dbFirestore = getFirestore(FIREBASE_APP);
// const dbStorage = getStorage(FIREBASE_APP);

// export default function Home() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [postData, setPostData] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const postCollection = collection(dbFirestore, 'strayPosts');
//         const snapshot = await getDocs(postCollection);
//         const data = [];

//         snapshot.forEach(async (doc) => {
//           const post = doc.data();
//           const imageUrlRef = ref(dbStorage, `Adoption/${post.image}`);
//           const imageUrl = await getDownloadURL(imageUrlRef);
//           data.push({ ...post, imageUrl });
//         });

//         setPostData(data);
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   return (

//     <ScrollView>
      
//       <View style={styles.container}>
//         <Image
//           source={require("../../assets/images/pawlink1.png")}
//           style={styles.image}
//         />
//         <TextInput
//           style={styles.searchBar}
//           placeholder="Search..."
//           onChangeText={(text) => setSearchQuery(text)}
//           value={searchQuery}
//         />

//         <View style={styles.checkrectangle}>
//           <Image source={require("../../assets/images/Component.png")} style={styles.checkrectangleimage} />
//         </View>
//         <TouchableOpacity style={styles.Button}>
//           <Link href={"../SocialMedia/LandingPage"}>
//             <Text style={styles.buttonText}>Check out</Text>
//           </Link>
//         </TouchableOpacity>

//         <View style={styles.container}>
//           {postData.map((post, index) => (
//             <View key={index} style={styles.postContainer}>
//               <Image source={{ uri: post.imageUrl }} style={styles.image} />
//               <Text style={styles.location}>{post.location}</Text>
//             </View>
//           ))}
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   searchBar: {
//     width: '80%',
//     borderWidth: 1,
//     borderColor: '#888',
//     padding: 10,
//     marginBottom: 20,
//     borderRadius: 10,
//   },
//   image: {
//     width: 200, 
//     height: 100, 
//     marginBottom: 20,
//     borderRadius: 10,
//   },
//   checkrectangle: {
//     width: '80%',
//     height: 100,
//     borderWidth: 1,
//     borderColor: '#888',
//     marginBottom: 20,
//     backgroundColor: '#f6f7fb',
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   checkrectangleimage: {
//     width: '100%',
//     height: 100,
//     borderRadius: 10,
//   },
//   Button: {
//     width: 90,
//     backgroundColor: 'white',
//     height: 25,
//     borderRadius: 5,
//     top: -60,
//     right: 100,
//     paddingHorizantal: 20
//   },
//   buttonText: {
//     textAlign: 'center',
//     fontSize: 12,
//     fontWeight: 'bold',
//     marginTop: 3,
//     marginLeft: 10,
//   },
//   postContainer: {
//     marginBottom: 20,
//   },
//   location: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });
import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../FirebaseConfig';
import Post from '../components/AdoptPost';  


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
        {posts.map((post) => (
          <Post
            key = {post.id}      
            image={{ uri: post.image }}
            location = {post.location}
          />
        ))}
      
      </ScrollView>
    </View>
  );
};

export default LandingPage;