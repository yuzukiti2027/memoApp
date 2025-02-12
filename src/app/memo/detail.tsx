import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { onSnapshot, doc } from 'firebase/firestore';
import { useState, useEffect } from 'react';

import Header from '../../components/Header';
import CircleButton from '../../components/CircleButton';
import { auth, db } from '../../config';
import { type Memo } from '../../../types/memo';

const handlePress = (id: string): void => {
  router.push({ pathname: '/memo/edit', params: { id } });
};

const Detail = (): JSX.Element => {
  const id = String(useLocalSearchParams().id);
  const [memo, setMemo] = useState<Memo | null>(null);
  useEffect(() => {
    if (auth.currentUser === null) {
      return;
    }
    const ref = doc(db, `users/${auth.currentUser.uid}/memos`, String(id));
    const unsubscribe = onSnapshot(ref, (memoDoc) => {
      const { bodyText, updatedAt } = memoDoc.data() as Memo;
      setMemo({
        id: memoDoc.id,
        bodyText: bodyText,
        updatedAt: updatedAt,
      });
    });
    return unsubscribe;
  });
  return (
    <View style={styles.container}>
      <View style={styles.memoHeader}>
        <Text style={styles.memoTitle} numberOfLines={1}>
          {memo?.bodyText}
        </Text>
        <Text style={styles.memoDate}>
          {memo?.updatedAt?.toDate().toLocaleString('ja-JP')}
        </Text>
      </View>
      <ScrollView style={styles.memoBody}>
        <Text style={styles.memoBodyText}>{memo?.bodyText}</Text>
      </ScrollView>
      <CircleButton
        onPress={() => {
          handlePress(id);
        }}
        style={{ top: 60, bottom: 'auto' }}
      >
        <Entypo name="pencil" size={40} />
      </CircleButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  memoHeader: {
    backgroundColor: '#33b251',
    height: 96,
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 19,
  },
  memoTitle: {
    color: '#ffffff',
    fontSize: 20,
    lineHeight: 32,
    fontWeight: 'bold',
  },
  memoDate: {
    color: '#ffffff',
    fontSize: 12,
    lineHeight: 16,
  },
  memoBody: {
    paddingHorizontal: 27,
  },
  memoBodyText: {
    paddingVertical: 32,
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
  },
});

export default Detail;
