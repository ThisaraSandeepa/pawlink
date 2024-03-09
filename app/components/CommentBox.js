import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../FirebaseConfig'; 

const CommentBox = () => {
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = async () => {
    if (commentText.trim() !== '') {
      // Add the new comment to the Firestore collection
      try {
        const docRef = await addDoc(collection(FIRESTORE_DB, 'comments'), {
          user: 'User1', // Assuming a fixed user for this example
          text: commentText,
        });
        console.log('Comment added with ID: ', docRef.id);
        setCommentText('');
      } catch (error) {
        console.error('Error adding comment: ', error);
      }
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Write a comment..."
        value={commentText}
        onChangeText={setCommentText}
      />
      <Button title="Submit" onPress={handleCommentSubmit} />
    </View>
  );
};

export default CommentBox;
