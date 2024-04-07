import React from 'react';
import PageTemplate from '../templates/PageTemplate';
import { StyleSheet, Text, View } from 'react-native';
import HeaderTemplate from '../templates/HeaderTemplate';
import { RouteProp, useRoute } from '@react-navigation/native';
type RootParamList = {
  DetailPage: {message: string};
};
const DetailPage: React.FC = () => {

   const route = useRoute<RouteProp<RootParamList, 'DetailPage'>>();
  return (
    <View style={styles.container}>
      <Text>DetailPage</Text>
      <Text>{route.params.message}</Text>
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
