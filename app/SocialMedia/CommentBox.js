import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { ref, push } from "firebase/database";
import { FIREBASE_REALTIME_DB } from "../../FirebaseConfig";

const CommentBox = ({ route, navigation }) => {
  const { postId } = route.params;
  const [comment, setComment] = useState("");

  const handleCommentSubmit = () => {
    const commentsRef = ref(FIREBASE_REALTIME_DB, `socialMediaPosts/${postId}/comments`);
    push(commentsRef, {
      text: comment,
      user: 'Anonymous'
    });
    setComment('');
  };

  return (
    <View>
      <TextInput
        placeholder="Write a comment..."
        value={comment}
        onChangeText={setComment}
      />
      <Button
        title="Submit"
        onPress={handleCommentSubmit}
      />
    </View>
  );
};

export default CommentBox;
