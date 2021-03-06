import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  Alert,
  Linking,
  Image,
} from 'react-native';
import {useIsFocused} from '@react-navigation/core';
import {CommonActions} from '@react-navigation/routers';
import {Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import url from '../global/url';
import {FocusAwareStatusBar} from '../global/component';

const LogoutReset = CommonActions.reset({
  index: 1,
  routes: [{name: 'Login'}],
});

function AccountScreen({navigation}) {
  const [userdata, setUserdata] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      try {
        const getUserdata = async () => {
          const user_id = await AsyncStorage.getItem('user_id');
          const data = {
            user_id: JSON.parse(user_id),
          };
          axios.get(url + '/api/profile', {params: data}).then(res => {
            setUserdata(res.data.user);
          });
        };

        getUserdata();
      } catch (e) {
        console.warn(e.message);
      }
    });
    return unsubscribe;
  }, []);

  const logout = () => {
    Alert.alert('Logout', 'Apakah anda yakin ingin Logout?', [
      {
        text: 'Batal',
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: () => {
          AsyncStorage.clear();
          navigation.dispatch(LogoutReset);
        },
      },
    ]);
  };

  return (
    <View style={{backgroundColor: '#e87c80'}}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#e87c80" />
      <View style={styles.container}>
        <Image
          resizeMode="cover"
          source={require('../images/default.png')}
          style={{
            width: 50,
            height: 50,
            borderRadius: 50 / 2,
          }}
        />
        <View style={styles.personName}>
          <Text style={{fontSize: 14, fontWeight: 'bold', color: '#fff'}}>
            {userdata.name}
          </Text>
          <Text style={{fontWeight: '400', color: '#fff'}}>
            {userdata.email}
          </Text>
        </View>
      </View>
      <View style={styles.curves} />
      <Pressable
        style={styles.list}
        onPress={() => navigation.navigate('Profile')}
        android_ripple="#eee">
        <Text>Profil</Text>
        <Icon name="chevron-forward-outline" size={22} color="#dedede" />
      </Pressable>
      <Pressable
        style={styles.list}
        onPress={() => navigation.navigate('Address')}
        android_ripple="#eee">
        <Text>Alamat Pengiriman</Text>
        <Icon name="chevron-forward-outline" size={22} color="#dedede" />
      </Pressable>
      <Pressable
        style={styles.list}
        onPress={() => navigation.navigate('ChangePassword')}
        android_ripple="#eee">
        <Text>Ganti Password</Text>
      </Pressable>
      <View style={styles.divider} />
      <Pressable
        style={styles.list2}
        onPress={() => Linking.openURL('https://wa.me/6285784197425')}
        android_ripple="#eee">
        <Icon name="logo-whatsapp" size={22} style={{marginEnd: 8}} />
        <Text>Chat Admin</Text>
      </Pressable>
      <Pressable
        style={styles.list2}
        onPress={() => Linking.openURL('https://www.instagram.com/hi.valeeqa/')}
        android_ripple="#eee">
        <Icon name="logo-instagram" size={22} style={{marginEnd: 8}} />
        <Text>Instagram</Text>
      </Pressable>
      <View style={styles.divider} />
      <Pressable style={styles.list2} onPress={logout} android_ripple="#eee">
        <Text style={{color: '#dc3545'}}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginBottom: 30,
    flexDirection: 'row',
  },
  personName: {
    marginLeft: 12,
  },
  list: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  list2: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    height: 5,
    backgroundColor: '#eee',
  },
  curves: {
    height: 40,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});

export default AccountScreen;
