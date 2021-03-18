import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import PhotoInfo from './src/App';

export default class App extends React.Component {
  render() {
    return (
        <View style={styles.container}>
          <PhotoInfo/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
