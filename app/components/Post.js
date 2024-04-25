import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Alert, Modal,Linking } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { update, ref, remove, onValue, set } from "firebase/database";
import { FIREBASE_REALTIME_DB, FIREBASE_AUTH } from "../../FirebaseConfig";
import { Link } from "expo-router";
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

const Post = (props) => {
  const [likes, setLikes] = useState(parseInt(props.likes));
  const [currentUser, setCurrentUser] = useState(null);
  const [commentsCount, setCommentsCount] = useState(props.comments);
  const [userLiked, setUserLiked] = useState(false);
  const postId = props.id;
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const user = FIREBASE_AUTH.currentUser;
    if (user) {
      setCurrentUser(user);
      const likesRef = ref(
        FIREBASE_REALTIME_DB,
        `likes/${user.uid}/${props.id}`
      );
      onValue(likesRef, (snapshot) => {
        setUserLiked(snapshot.exists());
      });
    }
  }, []);

  const handleLike = () => {
    let newLikes = likes;
    if (userLiked) {
      // User has already liked the post, remove the like
      setUserLiked(false);
      newLikes--;
      remove(ref(FIREBASE_REALTIME_DB, `likes/${currentUser.uid}/${props.id}`));
    } else {
      // User has not liked the post, add the like
      setUserLiked(true);
      newLikes++;
      set(
        ref(FIREBASE_REALTIME_DB, `likes/${currentUser.uid}/${props.id}`),
        true
      );
    }

    setLikes(newLikes);

    // Update the Realtime Database with the new likes count
    update(ref(FIREBASE_REALTIME_DB, `socialMediaPosts/${props.id}`), {
      likes: newLikes.toString(),
    });
  };

  // Get the comments count from the Realtime Database
  useEffect(() => {
    const commentsRef = ref(FIREBASE_REALTIME_DB, `comments/${postId}`);
    onValue(commentsRef, (snapshot) => {
      const commentsData = snapshot.val();
      if (commentsData) {
        setCommentsCount(Object.keys(commentsData).length);
      }
    });
  }, [postId]);

  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        const likesRef = ref(
          FIREBASE_REALTIME_DB,
          `likes/${user.uid}/${props.id}`
        );
        onValue(likesRef, (snapshot) => {
          setUserLiked(snapshot.exists());
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Delete a post
  const DeletePost = () => {
    const postRef = ref(FIREBASE_REALTIME_DB, `socialMediaPosts/${props.id}`);

    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this post?",
      [
        {
          text: "Yes",
          onPress: () => {
            remove(postRef);
            console.log("Post Deleted");
          },
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
      ]
    );
  };

  const isCurrentUser = currentUser && props.user === currentUser.displayName;
  const deleteButton = isCurrentUser ? (
    <TouchableOpacity className="mt-3">
      <Icon name="delete" size={20} onPress={DeletePost} />
    </TouchableOpacity>
  ) : null;
  
  const handleDownload = async () => {
    try {
      const confirmed = await new Promise((resolve) => {
        Alert.alert(
          'Confirm Download',
          'Are you sure you want to download this image?',
          [
            {
              text: 'No',
              onPress: () => resolve(false),
              style: 'cancel',
            },
            { text: 'Yes', onPress: () => resolve(true) },
          ]
        );
      });
  
      if (!confirmed) {
        // User canceled the download
        return;
      }
  
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        const downloadResumable = FileSystem.createDownloadResumable(
          props.image,
          FileSystem.documentDirectory + 'image.jpg'
        );
        const { uri } = await downloadResumable.downloadAsync();
        await MediaLibrary.saveToLibraryAsync(uri);
        console.log('Downloaded and saved to', uri);
        Alert.alert('Image Downloaded!', '(Image has been saved to your gallery)');
      } else {
        console.error('Permission to access media library was denied');
        // Handle permission denied scenario, e.g., show an error message to the user
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      
    }
  };


  return (
    <View className="bg-white rounded-lg p-3 mb-2 border border-gray-300 shadow-xl">
      <View className="flex-row justify-between">
        <View className="flex-row">
          <Image
            source={{ uri: props.userProfilePicture }}
            className="w-12 h-12 rounded-full"
          />
          <View>
            <Text className="font-bold text-lg ml-3 mt-3 mb-4">{props.user}</Text>
          </View>
        </View>
        <View>{deleteButton}</View>
      </View>
  
      <Text className="my-3 ml-2 font-normal text-sm mt-1">{props.description}</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image
          className="w-82 h-72 ml rounded-lg border-b-1"
          source={{ uri: props.image }}
        />
      </TouchableOpacity>
      <Text className="text-center mt-1 text-gray-500">
        {" "}
        ───────────────────────────────────{" "}
      </Text>
      {/* <Hr></Hr> */}
      <View className="flex-row -top-2 left-1 mb-2 gap-2.5">
        {/* Like Button */}
        <TouchableOpacity className="flex-row gap-0 pt-3" onPress={handleLike}>
          <Icon
            color={userLiked ? "red" : "black"}
            name={userLiked ? "heart" : "heart-outline"}
            size={20}
          />
          <Text className="text-gray-700"> {likes} </Text>
        </TouchableOpacity>
  
        {/* Comment Button */}
        <Link
          href={{
            pathname: "../SocialMedia/CommentBox",
            params: { postId },
          }}
          className="flex-row gap- pt-3"
        >
          <Icon name="comment-text-outline" size={20} />
          <Text className="text-gray-700"> {commentsCount} </Text>
        </Link>
      </View>
  
      {/* Modal for displaying the image */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex flex-1 justify-center items-center bg-black bg-opacity-70">
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Image
              className="w-96 h-80 object-contain rounded-lg"
              source={{ uri: props.image }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDownload}
            className="mt-5 left-36 bg-blue-500 p-2 rounded-full  "
           >
            <Icon name="download" size={24} color="white"    />
          </TouchableOpacity>
        </View>
       
        
      </Modal>
    </View>
  );};
  

export default Post;
