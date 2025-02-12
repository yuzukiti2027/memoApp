import { View, TextInput, StyleSheet, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';

import Header from '../../components/Header';
import CircleButton from '../../components/CircleButton';
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { auth, db } from '../../config';
import KeyboardAvoidingView from '../../components/KeyboardAvoidingView';

const handlePress = (id: string, bodyText: string): void => {
  if (auth.currentUser === null) {
    return;
  }
  const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id);
  setDoc(ref, {
    bodyText: bodyText,
    updatedAt: Timestamp.fromDate(new Date()),
  })
    .then(() => {
      router.back();
    })
    .catch((error) => {
      console.log(error);
      Alert.alert('更新に失敗しました。');
    });
};

const Edit = (): JSX.Element => {
  const id = String(useLocalSearchParams().id);
  const [bodyText, setBodyText] = useState('');
  useEffect(() => {
    if (auth.currentUser === null) {
      return;
    }
    const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id);
    getDoc(ref)
      .then((docRef) => {
        console.log(docRef.data());
        const RemoteBodyText = docRef?.data()?.bodyText;
        setBodyText(RemoteBodyText);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
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
          handlePress(id, bodyText);
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
    flex: 1,
    backgroundColor: '#ffffff',
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24,
    paddingVertical: 32,
    paddingHorizontal: 27,
  },
});

export default Edit;
