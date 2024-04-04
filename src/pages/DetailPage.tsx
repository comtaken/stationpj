import React from 'react';
import PageTemplate from '../templates/PageTemplate';
import { StyleSheet, Text, View } from 'react-native';
import HeaderTemplate from '../templates/HeaderTemplate';

const DetailPage = () => {
  return (
    <View style={styles.container}>
      <Text>DetailPage</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    flex: 1,
  },
});

export default DetailPage;
