import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  Button,
} from 'react-native';
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
  sharedState: ArrayLike<{
    line_cd: number;
    line_name: string;
    station_cd: number;
    station_name: string;
  }>;
}
const FeatureList: React.FC<Props> = ({ sharedState }) => {
  // console.log("FileSystem; " + FileSystem.documentDirectory);
  const [getAllNum, setGetAllNum] = useState<string>();
  const [items, setItems] = useState<any>([]);
  const [code, setCode] = useState<string>();
  useEffect(() => {
    /**
     * テーブル削除
     */
    // dropItemsFromDatabase();
    /**
     * テーブル存在チェック
     * なければcreate、insert
     */
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
    /**
     * 全件取得
     */
    getItemsFromDatabase()
      .then((items) => {
        setItems(items);
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      });
    /**
     * 件数表示用
     */
    selectcount()
      .then((result) => {
        setGetAllNum(result);
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      });
  }, []);

  useEffect(() => {
    if (sharedState.length === 0) {
      setCode(getAllNum);
    } else {
      setCode(sharedState.length.toString());
    }
  }, [sharedState]);

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
      <View style={styles.column}>
        <Button title="下車" onPress={() => alert('おりました')} />
      </View>
    </View>
  );
  return (
    <View style={{ height: 550 }}>
      <Text style={{ fontSize: 22 }}>{code}件</Text>
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
    backgroundColor: '#cde',
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc',
    marginTop: 3,
    height: 49,
  },
  column: {
    paddingTop: 8,
    paddingRight: 4,
    flex: 1,
  },
  rowId: {
    marginRight: 30,
    fontSize: 16,
  },
});

export default FeatureList;
