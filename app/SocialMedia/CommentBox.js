import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
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

  console.log(postId);

  const handleCommentSubmit = () => {
    if (comment.trim() !== "") {
      const commentsRef = ref(FIREBASE_REALTIME_DB, `comments/${postId}`);
      push(commentsRef, {
        text: comment,
        user: user.displayName,
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
    <ScrollView>
      <View className="items-start justify-start flex-1 my-7 mx-6">
        {comments.map((comment) => (
          <View key={comment.id} className = "flex-row">
            
            <View className = "mr-10 w-10/12">
              <Text className="py-4">
                <Text className="font-bold">{comment.user}</Text> {comment.text}
              </Text>
            </View>

            <View>
              {user && comment.user === user.displayName && (
                <TouchableOpacity
                  onPress={() => deleteComment(comment.id, comment.user)}
                >
                  <Icon
                    name="delete"
                    size={20}
                    color={"red"}
                    className = "mt-4"
                  />
                </TouchableOpacity>
              )}
            </View>

          </View>
        ))}
        <View className = "flex-row justify-between w-80 ml-3">
          <TextInput
            placeholder="Write a comment..."
            value={comment}
            onChangeText={setComment}
            multiline
          />
          <TouchableOpacity
            onPress={handleCommentSubmit}
          >
            <Icon name="send" size={20} color={"#385dff"} className = "mt-2"/>
          </TouchableOpacity>
        </View>
        
      </View>
    </ScrollView>
  );
}

export default CommentBox;
