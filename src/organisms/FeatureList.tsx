import { StyleSheet, View, Text, FlatList, Button } from 'react-native';
import { useEffect, useState } from 'react';
import {
  checkIfDatabaseExists,
  chooseToLineName,
  createItemsFromDatabase,
  dropItemsFromDatabase,
  getItemsFromDatabase,
  insertItemsFromDatabase,
  selectcount,
  updateCancelFlg,
  updateGetOffFlg,
} from './ItemService';
import * as FileSystem from 'expo-file-system';
import tw from 'twrnc';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  sharedState: string | undefined;
}
interface Props {
  onChange: (newValue: any) => void;
}
const FeatureList: React.FC<Props> = ({ sharedState, onChange }) => {
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
    // getItemsFromDatabase()
    //   .then((items) => {
    //     setItems(items);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching items:', error);
    //   });
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
    if (sharedState != undefined) {
      if (sharedState == '全件取得') {
        getItemsFromDatabase()
          .then((items) => {
            setItems(items);
          })
          .catch((error) => {
            console.error('Error fetching items:', error);
          });
        setCode(getAllNum);
      } else {
        chooseToLineName(sharedState)
          .then((items) => {
            setItems(items);
            setCode(items.length.toString());
          })
          .catch((error) => {
            console.error('Error fetching items:', error);
          });
      }
    }
  }, [sharedState]);
  /**
   * 下車ボタン押下
   * @param station_cd
   */
  const getOffPress = (station_cd: number, station_name: string) => {
    updateGetOffFlg(station_cd, station_name);
    if (sharedState != undefined) {
      if (sharedState == '全件取得') {
        getItemsFromDatabase()
          .then((items) => {
            setItems(items);
          })
          .catch((error) => {
            console.error('Error fetching items:', error);
          });
        setCode(getAllNum);
      } else {
        chooseToLineName(sharedState)
          .then((items) => {
            setItems(items);
            setCode(items.length.toString());
          })
          .catch((error) => {
            console.error('Error fetching items:', error);
          });
      }
    }
  };

  /**
   * 取消ボタン押下
   * @param station_cd
   */
  const cancelPress = (station_cd: number, station_name: string) => {
    updateCancelFlg(station_cd, station_name);
    if (sharedState != undefined) {
      if (sharedState == '全件取得') {
        getItemsFromDatabase()
          .then((items) => {
            setItems(items);
          })
          .catch((error) => {
            console.error('Error fetching items:', error);
          });
        setCode(getAllNum);
      } else {
        chooseToLineName(sharedState)
          .then((items) => {
            setItems(items);
            setCode(items.length.toString());
          })
          .catch((error) => {
            console.error('Error fetching items:', error);
          });
      }
    }
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: {
      line_cd: number;
      line_name: string;
      station_cd: number;
      station_name: string;
      get_off_flg: number;
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
      <View>
        {item.get_off_flg == 1 ? (
          <Ionicons style={{marginTop:12, marginRight:12}} name="flag" size={32} color="orange" />
        ) : (
          <Ionicons style={{marginTop:12, marginRight:12}} name="flag" size={32} color="white" />
        )}
      </View>
      <View style={styles.onPressbtn}>
        <Button
          title="下車"
          onPress={() => getOffPress(item.station_cd, item.station_name)}
        />
      </View>
      <View style={styles.cancelbtn}>
        <Button
          title="取消"
          onPress={() => cancelPress(item.station_cd, item.station_name)}
        />
      </View>
    </View>
  );
  return (
    <View style={{ height: 550 }}>
      <Text style={{ fontSize: 22 }}>{code}件</Text>

      <FlatList
        data={items}
        renderItem={renderItem}
        nestedScrollEnabled={true}
      />
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
    height: 62,
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
  onPressbtn: {
    paddingTop: 8,
    paddingRight: 4,
  },
  cancelbtn: {
    paddingTop: 8,
    paddingRight: 4,
    color: 'red',
  },
});

export default FeatureList;
