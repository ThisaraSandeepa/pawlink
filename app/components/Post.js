import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { update, ref, remove } from "firebase/database";
import { FIREBASE_REALTIME_DB } from "../../FirebaseConfig";

const Post = (props) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(parseInt(props.likes));
  const [commentsCount, setCommentsCount] = useState(parseInt(props.comments));

  const handleLike = () => {
    setLiked(!liked);
    const newLikes = liked ? likes - 1 : likes + 1;
    setLikes(newLikes);

    // Update the Realtime Database with the new likes count
    update(ref(FIREBASE_REALTIME_DB, `socialMediaPosts/${props.id}`), {
      likes: newLikes.toString(),
    });
  };

  const handleComment = () => {
    const newCommentsCount = commentsCount ? commentsCount + 1 : 1;
    setCommentsCount(newCommentsCount);

    // Update the Realtime Database with the new comments count
    update(ref(FIREBASE_REALTIME_DB, `socialMediaPosts/${props.id}`), {
      comments: newCommentsCount.toString(),
    });
  };

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
        }
      ]
    );
  };

  return (
    <View className="bg-white rounded-lg shadow-lg p-4 mb-4">
      <View className="flex-row justify-between">      
        <Text className="text-lg font-bold">{props.user}</Text>
        <TouchableOpacity>
          <Icon name="dots-vertical" size={20} onPress={DeletePost} />
        </TouchableOpacity>
      </View>

      <Text className="my-4">{props.description}</Text>
      <Image className="w-11/12 h-72" source={{ uri: props.image }} />
      <View className="flex-row justify-start mb-8 gap-2.5">
        {/* Like Button */}
        <TouchableOpacity className="flex-row gap-0 pt-2" onPress={handleLike}>
          <Icon
            color="red"
            name={liked ? "heart" : "heart-outline"}
            size={20}
          />
          <Text className="text-gray-700"> {likes} </Text>
        </TouchableOpacity>

        {/* Comment Button */}
        <TouchableOpacity className="flex-row pt-2" onPress={handleComment}>
          <Icon name="comment-text-outline" size={20} />
          <Text className="text-gray-700"> {commentsCount} </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Post;
