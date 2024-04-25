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
    <TouchableOpacity className = "items-end top-56 mr-2  ">
      <Icon name="delete" size={20} onPress={DeletePost} />
    </TouchableOpacity>
  ) : null;

  return (
    <View className="bg-slate-200 rounded-lg shadow-lg p- mb-12  mr-6 ml-3 -mt-3 w-80 h-61 left-5    ">
      {deleteButton} 
      <Image className="w-80 h-52 rounded-lg -mt-5 " source={props.image} />
      <View className="flex-row top-2 mt-2 gap-1.5 ">
        <Icon name="map-marker" size={22} className=" "  color="#203bd6"/>
      <Text className="text-base font-semibold mb-4  ml-2 ">{props.location}</Text>
      </View>
    </View>
  );
};

export default Post;
