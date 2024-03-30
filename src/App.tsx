import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainPage from './pages/MainPage';
import Constants from 'expo-constants';

function App() {
  return (
    <View style={styles.container}>
      <Text>
        <MainPage></MainPage>
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default registerRootComponent(App);
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight || 0,
  },
});
