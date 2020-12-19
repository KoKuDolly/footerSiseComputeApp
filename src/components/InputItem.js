import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Controller} from 'react-hook-form';
import {ErrorInfo} from './ErrorInfo';
import {Input} from './Input';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const InputItem = ({name, control, errors, required}) => {
  return (
    <>
      <View style={styles.flexContainer}>
        <Text style={styles.sectionTitle}>
          {name}
          {required ? '（必填项）' : '（可选项）'}
        </Text>
        <Controller
          control={control}
          render={Input}
          name={name}
          rules={{required}}
          defaultValue=""
        />
      </View>
      <ErrorInfo errors={errors} name={name} />
    </>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.black,
    flex: 2,
    height: 32,
    lineHeight: 32,
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    // marginTop: 8,
  },
});
