import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useForm} from 'react-hook-form';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Header from '../components/Header';
import {InputItem} from '../components/InputItem';

const App = () => {
  const {control, errors, getValues, setValue, trigger} = useForm({
    mode: 'all',
  });
  const [modelType, changeModelType] = useState('left');
  const [sabd, setsabd] = useState(0);
  const [sbcd, setsbcd] = useState(0);
  const [abcd, setabcd] = useState(0);
  const [s1, sets1] = useState(0);
  const [s2, sets2] = useState(0);
  const [selectedValue, changeSelectedValue] = useState('left');

  const handlePickerChange = (itemValue) => {
    changeSelectedValue(itemValue);

    trigger().then((res) => {
      if (res) {
        const value = getValues();
        const {AB, AD, BD} = value;
        if (itemValue === 'left') {
          const s = 131.959 + +AB * 2.384 + +AD * 0.572 + +BD * 2.466;
          // CD值默认按照最优模型L1计算
          const cd = (s - 132.216) / 3.125;
          // BC值默认按照最优模型SABCD计算
          const bc =
            (s - (113.179 + +AB * 1.307 + +AD * 1.448 + cd * 2.349)) / 0.385;
          setValue('CD', `${cd}`);
          setValue('BC', bc + '');
        }
        if (itemValue === 'right') {
          const s = 129.012 + +AB * 2.269 + +AD * 0.504 + +BD * 2.916;
          // CD值默认按照最优模型L1计算
          const cd = (s - 133.107) / 3.03;
          // BC值默认按照最优模型SABCD计算
          const bc =
            (s - (116.592 + +AB * 1.181 + +AD * 1.069 + cd * 1.389)) / 1.297;
          setValue('CD', `${cd}`);
          setValue('BC', bc + '');
        }
        if (itemValue === 'average') {
          const s = 125.455 + +AB * 2.595 + +AD * 0.63 + +BD * 2.969;
          // CD值默认按照最优模型L1计算
          const cd = (s - 124.328) / 3.702;
          // BC值默认按照最优模型SABCD计算
          const bc =
            (s - (109.404 + +AB * 1.204 + +AD * 1.405 + cd * 2.572)) / 0.494;
          setValue('CD', `${cd}`);
          setValue('BC', bc + '');
        }
      }
    });
  };
  const handleChangeModelType = (model) => {
    console.log(model);
    changeModelType(model);
    trigger().then((res) => {
      if (res) {
        const value = getValues();
        const {AB, AD, BD, BC, CD} = value;
        if (model === 'left') {
          setsabd(131.959 + +AB * 2.384 + +AD * 0.572 + +BD * 2.466);
          setsbcd(119.283 + +BD * 1.842 + +BC * 0.031 + +CD * 2.741);
          setabcd(
            113.179 + +AB * 1.307 + +AD * 1.448 + +BC * 0.385 + +CD * 2.349,
          );
          sets1(132.216 + +CD * 3.125);
          sets2(113.777 + +CD * 2.814 + +AD * 1.932);
        }
        if (model === 'right') {
          setsabd(129.012 + +AB * 2.269 + +AD * 0.504 + +BD * 2.916);
          setsbcd(118.395 + +BD * 1.655 + +BC * 0.962 + +CD * 1.831);
          setabcd(
            116.592 + +AB * 1.181 + +AD * 1.069 + +BC * 1.297 + +CD * 1.389,
          );
          sets1(133.107 + +CD * 3.03);
          sets2(117.789 + +CD * 2.484 + +AD * 1.949);
        }
        if (model === 'average') {
          setsabd(125.455 + +AB * 2.595 + +AD * 0.63 + +BD * 2.969);
          setsbcd(112.658 + +BD * 1.842 + +BC * 0.191 + +CD * 3.038);
          setabcd(
            109.404 + +AB * 1.204 + +AD * 1.405 + +BC * 0.494 + +CD * 2.572,
          );
          sets1(124.328 + +CD * 3.702);
          sets2(109.332 + +CD * 3.136 + +AD * 1.935);
        }
      } else {
        setValue('CD', '');
        setValue('BC', '');
        setsabd(0);
        setsbcd(0);
        setabcd(0);
        sets1(0);
        sets2(0);
      }
    });
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Header />
            <View style={styles.body}>
              <Text style={styles.sectionTitle}>输入项</Text>
              <View style={styles.sectionContainer}>
                <InputItem
                  name="AB"
                  control={control}
                  errors={errors}
                  required={true}
                />
                <InputItem
                  name="AD"
                  control={control}
                  errors={errors}
                  required={true}
                />
                <InputItem
                  name="BD"
                  control={control}
                  errors={errors}
                  required={true}
                />
              </View>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedValue}
                  onValueChange={(itemValue) => handlePickerChange(itemValue)}>
                  <Picker.Item label="左足推算的BC与CD" value="left" />
                  <Picker.Item label="右足推算的BC与CD" value="right" />
                  <Picker.Item label="左右足推算的BC与CD" value="average" />
                </Picker>
              </View>
              <View style={styles.sectionContainer}>
                <InputItem
                  name="BC"
                  control={control}
                  errors={errors}
                  required={false}
                />
                <InputItem
                  name="CD"
                  control={control}
                  errors={errors}
                  required={false}
                />
              </View>
              <Text style={styles.sectionTitle}>生成身高推测值</Text>
              <View style={[styles.flex, styles.sectionContainer]}>
                <TouchableOpacity
                  style={
                    modelType === 'left'
                      ? [
                          styles.TouchableOpacityStyle,
                          styles.activeTouchableOpacityStyle,
                        ]
                      : [styles.TouchableOpacityStyle]
                  }
                  title="左足估算"
                  onPress={() => handleChangeModelType('left')}>
                  <Text
                    style={
                      modelType === 'left'
                        ? styles.activeButtonStyle
                        : styles.disactiveButtonStyle
                    }>
                    左足估算
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    modelType === 'right'
                      ? [
                          styles.TouchableOpacityStyle,
                          styles.activeTouchableOpacityStyle,
                        ]
                      : [styles.TouchableOpacityStyle]
                  }
                  title="右足估算"
                  onPress={() => handleChangeModelType('right')}>
                  <Text
                    style={
                      modelType === 'right'
                        ? styles.activeButtonStyle
                        : styles.disactiveButtonStyle
                    }>
                    右足估算
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    modelType === 'average'
                      ? [
                          styles.TouchableOpacityStyle,
                          styles.activeTouchableOpacityStyle,
                        ]
                      : [styles.TouchableOpacityStyle]
                  }
                  title="左右足估算"
                  onPress={() => handleChangeModelType('average')}>
                  <Text
                    style={
                      modelType === 'average'
                        ? styles.activeButtonStyle
                        : styles.disactiveButtonStyle
                    }>
                    左右足估算
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.sectionContainer}>
                <Text>SABD={sabd}</Text>
                <Text>SBCD={sbcd}</Text>
                <Text>SABCD={abcd}</Text>
                <Text>S1最优模型={s1}</Text>
                <Text>S2最优模型={s2}</Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
    display: 'flex',
    flexDirection: 'column',
  },
  sectionContainer: {
    marginTop: 16,
    paddingHorizontal: 24,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
  },
  TouchableOpacityStyle: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  activeTouchableOpacityStyle: {
    backgroundColor: Colors.primary,
  },
  activeButtonStyle: {
    color: 'white',
  },
  disactiveButtonStyle: {
    color: 'black',
  },
  sectionTitle: {
    marginTop: 16,
    fontSize: 16,
    paddingLeft: 10,
  },
  pickerContainer: {
    paddingHorizontal: 24,
  },
});

export default App;
