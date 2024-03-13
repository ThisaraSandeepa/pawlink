import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { update, ref, remove, onValue } from "firebase/database";
import { FIREBASE_REALTIME_DB, FIREBASE_AUTH } from "../../FirebaseConfig";
import { Link } from "expo-router";

const Post = (props) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(parseInt(props.likes));
  const [currentUser, setCurrentUser] = useState(null);
  const [commentsCount, setCommentsCount] = useState(props.comments);
  const postId = props.id;

  useEffect(() => {
    const user = FIREBASE_AUTH.currentUser;
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLike = () => {
    setLiked(!liked);
    const newLikes = liked ? likes - 1 : likes + 1;
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
    <TouchableOpacity>
      <Icon name="delete" size={20} onPress={DeletePost} />
    </TouchableOpacity>
  ) : null;

  return (
    <View className="bg-white rounded-lg shadow-lg p-4 mb-4">
      <View className="flex-row justify-between">
        <View className = "flex-row">
          <Image
            source={{ uri: props.userProfilePicture }}
            style={{ width: 50, height: 50, borderRadius: 25 }}
          />
          <Text className = "font-bold text-lg ml-3 mt-3">{props.user}</Text>
        </View>
        <View>{deleteButton}</View>
      </View>

      <Text className="my-4 ml-3">{props.description}</Text>
      <Image className="w-11/12 h-72 ml-3" source={{ uri: props.image }} />
      <View className="flex-row justify-start mb-8 gap-2.5">

        {/* Like Button */}
        <TouchableOpacity className="flex-row gap-0 pt-3" onPress={handleLike}>
          <Icon
            color="red"
            name={liked ? "heart" : "heart-outline"}
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
    </View>
  );
};

export default Post;
