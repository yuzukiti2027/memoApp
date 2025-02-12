import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { Link, router } from 'expo-router';
import { auth } from '../../config';

import Header from '../../components/Header';
import Button from '../../components/Button';

const handlePress = (email: string, password: string): void => {
  // ログイン
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential.user.uid);
      router.replace('memo/list');
    })
    .catch((error) => {
      const { code, message } = error;
      console.log(code, message);
      Alert.alert(message);
    });
};

const LogIn = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Log In</Text>
        <TextInput
          onChangeText={(text) => {
            setEmail(text);
          }}
          style={styles.input}
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email Address"
          textContentType="emailAddress"
        />
        <TextInput
          onChangeText={(text) => {
            setPassword(text);
          }}
          style={styles.input}
          value={password}
          autoCapitalize="none"
          secureTextEntry
          placeholder="Password"
          textContentType="password"
        />
        <Button
          label="submit"
          onPress={() => {
            handlePress(email, password);
          }}
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Not registerd?</Text>
          <Link href="/auth/sign_up" asChild replace>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Sign up here!</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  inner: {
    paddingVertical: 24,
    paddingHorizontal: 27,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor: '#ffffff',
    height: 48,
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
  },
  footerText: {
    fontSize: 14,
    lineHeight: 24,
    marginRight: 8,
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 24,
    color: '#33b251',
  },
});

export default LogIn;
