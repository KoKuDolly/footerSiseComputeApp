import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ErrorInfo = ({errors, name}) => (
  <View style={styles.flexContainer}>
    <Text style={styles.flexItem} />
    <Text style={styles.errorText}>
      {errors[name] && <Text>{`${name}必填`}</Text>}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    flex: 5,
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexItem: {
    flex: 2,
  },
});
export {ErrorInfo};
