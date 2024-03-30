import React from 'react';
import PageTemplate from '../templates/PageTemplate';
import { StyleSheet, Text, View } from 'react-native';
import HeaderTemplate from '../templates/HeaderTemplate';

const MainPage = () => {
  return (
    <View style={styles.container}>
      <HeaderTemplate></HeaderTemplate>
      <PageTemplate></PageTemplate>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    flex: 1,
  },
});

export default MainPage;
