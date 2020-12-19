import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Header = () => {
  return (
    <>
      <Text style={styles.title}>足迹测量</Text>
    </>
  );
};
const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: Colors.white,
  },
});
export default Header;
