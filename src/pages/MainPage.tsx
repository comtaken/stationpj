import React from 'react';
import PageTemplate from '../templates/PageTemplate';
import { Button, StyleSheet, Text, View } from 'react-native';
import HeaderTemplate from '../templates/HeaderTemplate';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Constants from 'expo-constants';
interface Props {
  navigation: any;
}

const MainPage: React.FC<Props> = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* <HeaderTemplate></HeaderTemplate> */}
      <PageTemplate navigation={navigation}></PageTemplate>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    flex: 1,
      
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight || 0,
  },
});

export default MainPage;
