import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {useIsFocused} from '@react-navigation/core';
import {Input} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';

function FocusAwareStatusBar() {
  const isFocused = useIsFocused();

  return isFocused ? (
    <StatusBar barStyle="light-content" backgroundColor="#e87c80" />
  ) : null;
}

function AddressScreen() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: '#e87c80'}}>
      <FocusAwareStatusBar />
      <View style={{height: 40}} />
      <View style={styles.curves} />
      <View style={styles.container}>
        <Input
          label="Provinsi"
          labelStyle={{color: '#dedede'}}
          inputContainerStyle={{
            borderBottomColor: '#dedede',
          }}
          value="Jawa Timur"
        />
      </View>
      <View style={styles.container}>
        <Input
          label="Kabupaten"
          labelStyle={{color: '#dedede'}}
          inputContainerStyle={{
            borderBottomColor: '#dedede',
          }}
          value="Jember"
        />
      </View>
      <View style={styles.container}>
        <Input
          label="Kecamatan"
          labelStyle={{color: '#dedede'}}
          inputContainerStyle={{
            borderBottomColor: '#dedede',
          }}
          value="Jember"
        />
      </View>
      <View style={styles.container}>
        <Input
          label="Kelurahan"
          labelStyle={{color: '#dedede'}}
          inputContainerStyle={{
            borderBottomColor: '#dedede',
          }}
          value="Jember"
        />
      </View>
      <View style={styles.container}>
        <Input
          label="Alamat Lengkap"
          labelStyle={{color: '#dedede'}}
          inputContainerStyle={{
            borderBottomColor: '#dedede',
          }}
          value="Jember"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    paddingBottom: 16,
  },
  container1: {
    paddingVertical: 16,
    backgroundColor: '#fff',
    paddingBottom: 16,
  },
  containerAvatar: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: 'bold',
    color: '#dedede',
  },
  curves: {
    height: 40,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});

export default AddressScreen;
