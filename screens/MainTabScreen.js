import React from 'react';
import {TouchableOpacity, Text, View, Pressable} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icons from 'react-native-vector-icons/Ionicons';
import {IconButton} from 'react-native-paper';

import HomeScreen from './HomeScreen';
import OrderScreen from './OrderScreen';
import WishlistScreen from './WishlistScreen';
import DetailScreen from './DetailScreen';
import AccountScreen from './AccountScreen';
import LoginScreen from './LoginScreen';
import ProfileScreen from './accounts/ProfileScreen';
import AddressScreen from './accounts/AddressScreen';
import ChangePasswordScreen from './accounts/ChangePasswordScreen';
import SplashScreen from './SplashScreen';

const HomeStack = createStackNavigator();
const DetailStack = createStackNavigator();
const AccountStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabScreen = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Tabs" component={TabScreen} />
      <Stack.Screen name="Detail" component={DetailStackScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default MainTabScreen;

const TabScreen = () => (
  <Tab.Navigator
    initialRouteName="Home"
    activeColor="#e87c80"
    inactiveColor="#dedede"
    barStyle={{backgroundColor: '#fff'}}>
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Beranda',
        tabBarIcon: ({color}) => <Icons name="home" color={color} size={24} />,
      }}
    />
    <Tab.Screen
      name="Order"
      component={OrderScreen}
      options={{
        tabBarLabel: 'Pesanan',
        tabBarIcon: ({color}) => (
          <Icons name="receipt" color={color} size={24} />
        ),
      }}
    />
    <Tab.Screen
      name="Wishlist"
      component={WishlistScreen}
      options={{
        tabBarLabel: 'Wishlist',
        tabBarIcon: ({color}) => <Icons name="heart" color={color} size={24} />,
      }}
    />
    <Tab.Screen
      name="Account"
      component={AccountStackScreen}
      options={{
        tabBarLabel: 'Akun',
        tabBarIcon: ({color}) => (
          <Icons name="person" color={color} size={24} />
        ),
      }}
    />
  </Tab.Navigator>
);

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#fff', elevation: 2},
        headerTintColor: '#000',
      }}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'HI VALEEQA',
          headerTitleStyle: {fontWeight: '700'},
          headerRightContainerStyle: {
            paddingEnd: 20,
          },
        }}
      />
    </HomeStack.Navigator>
  );
};

const DetailStackScreen = () => (
  <DetailStack.Navigator
    screenOptions={{
      headerStyle: {backgroundColor: '#fff', elevation: 2},
      headerTintColor: '#000',
    }}>
    <DetailStack.Screen
      name="DetailScreen"
      component={DetailScreen}
      options={{
        title: 'Detail',
      }}
    />
  </DetailStack.Navigator>
);

const AccountStackScreen = () => (
  <AccountStack.Navigator
    screenOptions={{
      headerStyle: {backgroundColor: '#e87c80', elevation: 0},
      headerTintColor: '#fff',
    }}>
    <AccountStack.Screen
      name="AccountScreen"
      component={AccountScreen}
      options={{
        title: 'Akun',
      }}
    />
    <AccountStack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        title: 'Profil',
        headerRightContainerStyle: {
          marginEnd: 20,
        },
      }}
    />
    <AccountStack.Screen
      name="Address"
      component={AddressScreen}
      options={{
        title: 'Alamat Pengiriman',
        headerRight: () => (
          <TouchableOpacity>
            <Text style={{color: '#fff'}}>Simpan</Text>
          </TouchableOpacity>
        ),
        headerRightContainerStyle: {
          marginEnd: 20,
        },
      }}
    />
    <AccountStack.Screen
      name="ChangePassword"
      component={ChangePasswordScreen}
      options={{
        title: 'Ganti Password',
        headerRightContainerStyle: {
          marginEnd: 20,
        },
      }}
    />
  </AccountStack.Navigator>
);
