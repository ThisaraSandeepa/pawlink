import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ref, push, onValue, remove } from "firebase/database";
import { FIREBASE_AUTH, FIREBASE_REALTIME_DB } from "../../FirebaseConfig";
import { Icon } from "react-native-elements";

function CommentBox() {
  const postId = useLocalSearchParams()["postId"];
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const user = FIREBASE_AUTH.currentUser;
  
  const handleCommentSubmit = () => {
    if (comment.trim() !== "") {
      const commentsRef = ref(FIREBASE_REALTIME_DB, `comments/${postId}`);
      push(commentsRef, {
        text: comment,
        user: user.displayName,
        profilePicture: user.photoURL,
      });
      console.log("Comment Submitted");
      setComment("");
    }
  };

  const deleteComment = (commentId, commentUser) => {
    if (user && commentUser === user.displayName) {
      const commentRef = ref(
        FIREBASE_REALTIME_DB,
        `comments/${postId}/${commentId}`
      );

      Alert.alert(
        "Confirm Deletion",
        "Are you sure you want to delete this comment?",
        [
          {
            text: "Yes",
            onPress: () => {
              remove(commentRef);
              console.log("Comment Deleted");
            },
          },
          {
            text: "Cancel",
          },
        ]
      );
    }
  };

  useEffect(() => {
    const commentsRef = ref(FIREBASE_REALTIME_DB, `comments/${postId}`);
    onValue(commentsRef, (snapshot) => {
      const commentsData = snapshot.val() ? Object.entries(snapshot.val()) : [];
      const formattedComments = commentsData.map(([id, data]) => ({
        id,
        ...data,
      }));
      setComments(formattedComments);
    });
  }, [postId]);

  return (
    <View className= "flex-1">
      <ScrollView className= "flex-1">
        <View className="items-start justify-start mx-3 mt-8">
          {comments.map((comment) => (
            <View key={comment.id} className="flex-row items-start mb-2">
              <Image
                source={{ uri: comment.profilePicture }}
                className="w-7 h-7 rounded-full mr-2 mt-1"
              />
              <View className="flex-1 border border-gray-300 rounded-lg p-2 ml-2">
                <Text>
                  <Text className="font-bold">{comment.user}</Text>{" "}
                  {comment.text}
                </Text>
                {user && comment.user === user.displayName && (
                  <TouchableOpacity
                    onPress={() => deleteComment(comment.id, comment.user)}
                    className="absolute top-2 right-2"
                  >
                    <Icon name="delete" size={20} color={"red"} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View className="flex-row items-center justify-between w-full border border-gray-300 rounded-lg p-2">
        <TextInput
          placeholder="Write a comment..."
          value={comment}
          onChangeText={setComment}
          multiline
          className="flex-1 mr-2"
        />
        <TouchableOpacity onPress={handleCommentSubmit} className="ml-2">
          <Icon name="send" size={20} color={"#385dff"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CommentBox;
