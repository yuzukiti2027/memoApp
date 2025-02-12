import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { Link, router } from 'expo-router';

import Header from '../../components/Header';
import Button from '../../components/Button';
import { auth } from '../../config';

const handlePress = (email: string, password: string): void => {
  // 会員登録
  console.log(email, password);
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential.user.uid);
      router.replace('/memo/list');
    })
    .catch((error) => {
      console.log(error);
    });
};

const SignUp = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Sign Up</Text>
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
          <Text style={styles.footerText}>already registerd?</Text>
          <Link href="/auth/log_in" asChild replace>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Log In!</Text>
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

export default SignUp;
