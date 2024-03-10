import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ref, push, onValue } from "firebase/database";
import { FIREBASE_AUTH, FIREBASE_REALTIME_DB } from "../../FirebaseConfig";

function CommentBox() {
  // Get the postId
  const postId = useLocalSearchParams()["postId"];
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // Get the current user
  const user = FIREBASE_AUTH.currentUser;

  // Send the comments to the firebase realtime database
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
      <View className="items-center justify-center flex-1 my-7">
        {comments.map((comment) => (
          <View key={comment.id} className=" items-start p-3 w-80">
            <Text className="py-2">
              <Text className="font-bold">{comment.user}</Text> {comment.text}
            </Text>
          </View>
        ))}

        <TextInput
          placeholder="Write a comment..."
          value={comment}
          onChangeText={setComment}
          multiline
        />
        <TouchableOpacity onPress={handleCommentSubmit} className="bg-blue-600 p-2 rounded-md mt-2">
          <Text className="text-white">Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default CommentBox;
