import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Input = ({onChange, onBlur, value, name}) => (
  <TextInput
    style={styles.sectionDescription}
    onBlur={onBlur}
    onChangeText={(value) => onChange(value)}
    value={value}
    placeholder={`请输入${name}相应的长度，单位cm`}
  />
);
const styles = StyleSheet.create({
  sectionDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.dark,
    flex: 5,
    borderColor: Colors.primary,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 4,
    height: 30,
  },
});
export {Input};
