import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { chooseToLineName, selectLineName } from './ItemService';
import RNPickerSelect, { Item } from 'react-native-picker-select';

interface Props {
  onChange: (newValue: any) => void;
}

const SearchLineName: React.FC<Props> = ({ onChange }) => {
  let formattedData: Item[];
  const [searchLineNameItems, setsearchLineNameItems] = useState<Item[]>([]);

  useEffect(() => {
    selectLineName()
      .then((result) => {
        formattedData = result.map((result) => ({
          label: result,
          value: result,
        }));
        const getAll = '全件取得';

        formattedData.unshift({
          label: getAll,
          value: getAll,
        });
        setsearchLineNameItems(formattedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (value: string) => {
    onChange(value);
  };

  return (
    <View>
      <Text>路線一覧</Text>
      <RNPickerSelect
        onValueChange={handleChange}
        items={searchLineNameItems}
        style={pickerSelectStyles}
        placeholder={{ label: '選択してください', value: '' }}
        Icon={() => (
          <Text
            style={{
              position: 'absolute',
              right: 95,
              top: 10,
              fontSize: 18,
              color: '#789',
            }}
          ></Text>
        )}
      />
    </View>
  );
};
const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    paddingVertical: 8,
    color: 'black',
    paddingRight: 10,
    backgroundColor: '#AACF52',
    marginTop: 10,
    marginBottom: 10,
  },
});

const styles = StyleSheet.create({});

export default SearchLineName;
