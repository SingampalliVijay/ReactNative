import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontIcon from 'react-native-vector-icons/Ionicons';

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mailVerify, setMailVerify] = useState(false);
  const [passwordVerify, setPasswordVerify] = useState(false);
  const onChangeEmail = (text: string) => {
    setEmail(text);
    const pattern = /^[a-z0-9]+@[a-z]+\.[a-z]{2,4}/;
    setMailVerify(!pattern.test(text));
  };

  const onChangePassword = (password: string) => {
    setPassword(password);
    const checkName = /^[a-zA-Z]/;
    if (checkName.test(password) && password.length >= 5) {
      setPasswordVerify(false);
    } else {
      setPasswordVerify(true);
    }
  };

  const onLoginPress = (email: any, password: any) => {
    if (email && password) {
      navigation.navigate('Home');
      setEmail('');
      setPassword('');
    } else {
      Alert.alert('Login Unsuccessful', 'Enter Correct Details', [{ text: 'Try Again' }]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.viewContainer}>
          <FontIcon name='person-circle-outline' style={styles.fontIcon}></FontIcon>
          <View style={styles.inputContainer}>
            <Icon name='mail' style={styles.icon} />
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder='Enter Your Email'
                placeholderTextColor="#A2A8D3"
                keyboardType="email-address"
                value={email}
                onChangeText={onChangeEmail}
              />
            </View>
          </View>
          {mailVerify ? <Text style={styles.error}>Enter valid email</Text> : null}

          <View style={styles.inputContainer}>
            <Icon name='key' style={styles.icon} />
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder='Enter Your Password'
                placeholderTextColor="#A2A8D3"
                secureTextEntry={true}
                value={password}
                onChangeText={onChangePassword}
              />
            </View>
          </View>
          {passwordVerify ? <Text style={styles.error}>Enter valid Password</Text> : null}

          <TouchableOpacity style={styles.loginButton} onPress={() => onLoginPress(email, password)}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5EDED',
  },
  fontIcon: {
    fontSize: 80,
    color: '#1E201E',
    paddingBottom: 20,
  },
  viewContainer: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowRadius: 3,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
    borderColor: '#D1D5DE',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  icon: {
    fontSize: 20,
    color: '#333',
    marginRight: 10,
  },
  inputWrapper: {
    flex: 1,
    position: 'relative',
  },
  input: {
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: '#FF3E3E',
    fontSize: 14,
    marginBottom: 10,
  },
});

export default Login;