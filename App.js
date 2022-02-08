/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import ScanScreen from './src/screens/scanScreen';
import Navigation from './src/navigation';





// const App = () => {
//   return (
//     <ScanScreen />
//   );
// };


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
    backgroundColor: '#F9FBFC',
  },
});




export default App;
