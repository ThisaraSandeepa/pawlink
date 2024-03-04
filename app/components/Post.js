import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Link } from "expo-router";

const Post = (props) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <View className="bg-white rounded-lg shadow-lg p-4 mb-4">
      <Text className="text-lg font-bold mb-2">{props.user}</Text>
      <Image className="w-11/12 h-72" source={props.image} />
      <View className="flex-row justify-start mb-8 gap-2.5">

        {/* Like Button */}
        <TouchableOpacity className="flex-row gap-0 pt-2" onPress={handleLike}>
          <Icon
            color="red"
            name={liked ? "heart" : "heart-outline"}
            size={20}
          />
          <Text className="text-gray-700"> {props.likes} </Text>
        </TouchableOpacity>

        {/* Comment Button */}
        <Link href={'../components/CommentBox'} className="flex-row gap- pt-2">
          <Icon
            name="comment-text-outline"
            size={20}
          >
          </Icon>

          <Text className="text-gray-700"> {props.comments} </Text>
        </Link>
      </View>
    </View>
  );
};

export default Post;
