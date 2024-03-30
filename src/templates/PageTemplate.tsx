import React, { useState } from 'react';
import FeatureList from '../organisms/FeatureList';
import { StyleSheet, Text, View } from 'react-native';
import SearchLineName from '../organisms/SearchLineName';

const PageTemplate = ({}) => {
  const [sharedState, setSharedState] = useState<any>([]);
  const handleChange = (newValue: any) => {
    setSharedState(newValue);
  };
  return (
    <View style={{ width: 340 }}>
      <SearchLineName onChange={handleChange}></SearchLineName>
      <FeatureList sharedState={sharedState}></FeatureList>
    </View>
  );
};

export default PageTemplate;
