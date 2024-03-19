import React from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { remove, ref } from "firebase/database";
import { FIREBASE_AUTH,FIREBASE_REALTIME_DB } from "../../FirebaseConfig";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Post = (props) => {

  const DeletePost = () => {
    const postRef = ref(FIREBASE_REALTIME_DB, `strayPosts/${props.id}`);

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
        },
      ]
    );
  };
  const currentUser = FIREBASE_AUTH.currentUser;

  const isCurrentUser = currentUser && props.user === currentUser.displayName;
  const deleteButton = isCurrentUser ? (
    <TouchableOpacity className = "items-end">
      <Icon name="delete" size={20} onPress={DeletePost} />
    </TouchableOpacity>
  ) : null;

  return (
    <View className="bg-white rounded-lg shadow-lg p-4 mb-4">
      {deleteButton} 
      <Image className="w-11/12 h-72" source={props.image} />
      <Text className="text-lg font-bold mb-2">{props.location}</Text>
    </View>
  );
};

export default Post;
