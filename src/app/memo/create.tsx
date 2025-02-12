import { View, TextInput, StyleSheet } from 'react-native';

import Header from '../../components/Header';
import CircleButton from '../../components/CircleButton';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { db, auth } from '../../config';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import KeyboardAvoidingView from '../../components/KeyboardAvoidingView';

const handlePress = (bodyText: string): void => {
  if (auth.currentUser === null) {
    return;
  }
  const ref = collection(db, `users/${auth.currentUser.uid}/memos`);
  addDoc(ref, {
    bodyText: bodyText,
    updatedAt: Timestamp.fromDate(new Date()),
  })
    .then((docRef) => {
      console.log('success', docRef.id);
      router.back();
    })
    .catch((error) => {
      console.log(error);
    });
};

const Create = (): JSX.Element => {
  const [bodyText, setBodyText] = useState('');
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          multiline
          style={styles.input}
          value={bodyText}
          onChangeText={(text) => {
            setBodyText(text);
          }}
          autoFocus
        />
      </View>
      <CircleButton
        onPress={() => {
          handlePress(bodyText);
        }}
      >
        <Feather name="check" size={40} />
      </CircleButton>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  inputContainer: {
    paddingVertical: 32,
    paddingHorizontal: 27,
    flex: 1,
    backgroundColor: '#ffffff',
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24,
  },
});

export default Create;
