import React, { useState } from 'react';
import FeatureList from '../organisms/FeatureList';
import { StyleSheet, Text, View } from 'react-native';
import SearchLineName from '../organisms/SearchLineName';

const PageTemplate = ({}) => {
  const [sharedState, setSharedState] = useState<any>([]);
  
  const handleChange = (newValue: any) => {
    // console.log(newValue)
    setSharedState(newValue);
  };
  return (
    <View style={{ width: 340 }}>
      <SearchLineName onChange={handleChange}></SearchLineName>
      <FeatureList sharedState={sharedState} onChange={handleChange}></FeatureList>
    </View>
  );
};

export default PageTemplate;
