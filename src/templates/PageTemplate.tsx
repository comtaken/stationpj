import React, { useState } from 'react';
import FeatureList from '../organisms/FeatureList';
import { StyleSheet, Text, View } from 'react-native';
import SearchLineName from '../organisms/SearchLineName';

interface Props {
  navigation: any;
}
const PageTemplate: React.FC<Props> = ({ navigation }) => {
  const [sharedState, setSharedState] = useState<string>('');

  const handleChange = (newValue: any) => {
    setSharedState(newValue);
  };
  return (
    <View style={{ width: 340 }}>
      <SearchLineName onChange={handleChange}></SearchLineName>
      <FeatureList
        sharedState={sharedState}
        onChange={handleChange}
        navigation={navigation}
      ></FeatureList>
    </View>
  );
};

export default PageTemplate;
