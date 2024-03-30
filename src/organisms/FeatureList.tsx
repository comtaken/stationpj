import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import {
  checkIfDatabaseExists,
  createItemsFromDatabase,
  dropItemsFromDatabase,
  getItemsFromDatabase,
  insertItemsFromDatabase,
  selectcount,
} from './ItemService';
import * as FileSystem from 'expo-file-system';
import tw from 'twrnc';
import { useContext } from 'react';
import React from 'react';

interface Props {
  sharedState: [];
}
const FeatureList: React.FC<Props> = ({ sharedState }) => {
  const [items, setItems] = useState<any>([]);
  const [code, setCode] = useState<string>(sharedState.length.toString());
  useEffect(() => {
    checkIfDatabaseExists()
      .then((result) => {
        if ('0' == result) {
          createItemsFromDatabase();
          insertItemsFromDatabase();
        }
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      });

    getItemsFromDatabase()
      .then((items) => {
        setItems(items);
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      });

    selectcount()
      .then((result) => {
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      });
  }, []);

  const renderItem = ({
    item,
    index,
  }: {
    item: {
      line_cd: number;
      line_name: string;
      station_cd: number;
      station_name: string;
    };
    index: number;
  }) => (
    <View style={styles.rowItem}>
      <View>
        <Text style={styles.rowId}>{index + 1}</Text>
      </View>

      <View style={styles.column}>
        <Text style={[styles.rowId, { fontSize: 10 }]}>{item.line_name}</Text>
      </View>

      <View style={styles.column}>
        <Text style={styles.rowId}>{item.station_name}</Text>
      </View>
    </View>
  );
  return (
    <View style={{ height: 600 }}>
      <Text>{code}</Text>
      {sharedState.length !== 0 ? (
        <FlatList
          data={sharedState}
          renderItem={renderItem}
          nestedScrollEnabled={true}
        />
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          nestedScrollEnabled={true}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  rowItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  column: {
    flex: 1,
  },
  rowId: {
    marginRight: 30,
    fontSize: 16,
  },
});

export default FeatureList;
