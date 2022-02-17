import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import { LogBox } from 'react-native';
import Navigation from './src/navigation/';


//ignore warning as gesture handler installed in this project is the latest version
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);


const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Navigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor:'F9FBFC',
  },
});

export default App;
