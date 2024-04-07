import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Button,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
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
import {
  NavigationContainer,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

interface Props {
  sharedState: string | undefined;
}
interface Props {
  onChange: (newValue: any) => void;
}
interface Props {
  navigation: any;
}
const FeatureList: React.FC<Props> = ({ sharedState, navigation }) => {
  // console.log("FileSystem; " + FileSystem.documentDirectory);

  const [getAllNum, setGetAllNum] = useState<string>();
  const [items, setItems] = useState<any>([]);
  const [code, setCode] = useState<string>();

  /**
   * コンポーネントマウント時サイドデータ取得
   */
  useFocusEffect(
    React.useCallback(() => {
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
    }, [sharedState]),
  );
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
      detail_message: string;
    };
    index: number;
  }) => (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('詳細情報', {
          station_cd: item.station_cd,
          message: item.detail_message,
        });
      }}
    >
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
            <Ionicons
              style={{ marginTop: 12, marginRight: 12 }}
              name="flag"
              size={32}
              color="orange"
            />
          ) : (
            <Ionicons
              style={{ marginTop: 12, marginRight: 12 }}
              name="flag"
              size={32}
              color="#f5f5f5"
            />
          )}
        </View>
        <View style={styles.onPressbtn}>
          {item.get_off_flg == 1 ? (
            <TouchableOpacity
              style={styles.cancelbuttonContainer}
              onPress={() => cancelPress(item.station_cd, item.station_name)}
            >
              <Text style={styles.cancelbuttonText}>取消</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.getoffbuttonContainer}
              onPress={() => getOffPress(item.station_cd, item.station_name)}
            >
              <Text style={styles.getoffbuttonText}>下車</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    backgroundColor: '#f0ffff',
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
  cancelbuttonContainer: {
    backgroundColor: '#E9546B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 18,
  },
  cancelbuttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
  getoffbuttonContainer: {
    backgroundColor: '#AACF52',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 18,
  },
  getoffbuttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default FeatureList;
