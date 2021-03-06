import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  Alert,
  Linking,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {Input} from 'react-native-elements';
import {Button} from 'react-native-paper';
import {CommonActions} from '@react-navigation/routers';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import url from '../global/url';
import {FocusAwareStatusBar} from '../global/component';

const resetAction = CommonActions.reset({
  index: 1,
  routes: [
    {
      name: 'Tabs',
    },
  ],
});

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      try {
        const isLoggedIn = async () => {
          const value = await AsyncStorage.getItem('isLoggedIn');
          if (value !== null) {
            navigation.dispatch(resetAction);
          }
        };
        isLoggedIn();
      } catch (error) {
        console.log(error);
      }
    });
    return unsubscribe;
  }, [navigation]);

  const submitData = () => {
    const data = {
      userEmail: username,
      password: password,
    };
    axios.post(url + '/api/login', data).then(res => {
      if (res.data.msg == 'user') {
        AsyncStorage.setItem(
          'user_id',
          JSON.stringify(res.data.userdata.user_id),
        );
        AsyncStorage.setItem('email', res.data.userdata.email);
        AsyncStorage.setItem('password', res.data.userdata.password);
        AsyncStorage.setItem('role', JSON.stringify(res.data.userdata.role));
        AsyncStorage.setItem('isLoggedIn', '1');

        // Reset route
        navigation.reset({
          index: 0,
          routes: [{name: 'Tabs'}],
        });
      } else if (res.data.msg == 'error-verification') {
        Alert.alert('Login Failed', 'Email belum diverifikasi');
      } else {
        Alert.alert('Login Failed', 'Username/Password salah');
      }
    });
  };

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 50,
        }}>
        <Image
          style={{width: 43, height: 34, marginEnd: 12}}
          source={require('../images/hi-valeeqa.png')}
        />
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>HI VALEEQA</Text>
      </View>
      {/*<Text style={styles.title}>Masuk!</Text>*/}
      <Input
        inputContainerStyle={styles.input}
        placeholder="Username/Email"
        leftIcon={<Icon name="person" size={20} color="#ccc" />}
        onChangeText={value => setUsername(value)}
      />
      <Input
        inputContainerStyle={styles.input}
        secureTextEntry={true}
        placeholder="Password"
        leftIcon={
          <Icon
            name="lock-closed"
            size={20}
            color="#ccc"
            secureTextEntry={true}
          />
        }
        onChangeText={value => setPassword(value)}
      />
      <Button
        mode="contained"
        color="#e87c80"
        labelStyle={{color: '#fff'}}
        style={{elevation: 0}}
        onPress={submitData}>
        Login
      </Button>
      <View style={{marginTop: 50}}>
        <TouchableOpacity
          style={{
            marginBottom: 8,
            alignItems: 'center',
          }}
          onPress={() => Linking.openURL(url + '/forgot-password')}>
          <Text style={{color: '#e87c80'}}>Lupa Password?</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Text>Belum Punya Akun? </Text>
          <TouchableOpacity onPress={() => Linking.openURL(url + '/register')}>
            <Text style={{color: '#e87c80'}}>Daftar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 90,
    color: '#e87c80',
  },
  input: {
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 16,
  },
});

export default LoginScreen;
