import React from 'react';
import PageTemplate from '../templates/PageTemplate';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderTemplate from '../templates/HeaderTemplate';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { updateMessageText } from '../organisms/ItemService';
type RootParamList = {
  DetailPage: { message: string; station_cd: number };
};
const DetailPage: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootParamList, 'DetailPage'>>();
  const [message, onChangeText] = React.useState(route.params.message);

  const stationCd = route.params.station_cd;

  const updateMessage = (station_cd: number, message: string) => {
    updateMessageText(station_cd, message);

    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={(message) => onChangeText(message)}
          multiline={true}
        />
        <TouchableOpacity
          style={styles.editbuttonContainer}
          onPress={() => {
            updateMessage(stationCd, message);
          }}
        >
          <Text style={styles.editbuttonText}>更新</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  content: {
    backgroundColor: '#f9f9f9',
    flex: 1,
  },
  input: {
    height: 520,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  editbuttonContainer: {
    backgroundColor: '#F6AD3C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 18,
    marginTop: 10,
    marginBottom: 10,
  },
  editbuttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DetailPage;
