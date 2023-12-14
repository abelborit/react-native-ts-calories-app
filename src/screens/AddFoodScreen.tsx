import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Input} from '@rneui/themed';
import Icon from 'react-native-vector-icons/Ionicons';
import {HeaderComponent} from '../components/HeaderComponent';

export const AddFoodScreen = () => {
  return (
    <View style={styles.container}>
      <HeaderComponent />

      <View style={styles.addFoodContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleContent}>Add Food</Text>
        </View>

        <View style={styles.btnContainer}>
          <Button
            radius={'lg'}
            type="solid"
            color={'#4ECB71'}
            activeOpacity={0.7}
            onPress={() => {}}>
            <Icon name="add-circle-outline" size={30} color="#fff" />
          </Button>
        </View>
      </View>

      <View style={styles.inputSearchContainer}>
        <View style={styles.inputContainer}>
          <Input placeholder="apples, pie, chicken..." />
        </View>

        <View style={styles.btnContainer}>
          <Button
            radius={'lg'}
            type="solid"
            color={'#ADE8AF'}
            activeOpacity={0.7}
            onPress={() => {}}>
            <Text style={{...styles.btnText, color: '#333'}}>Search</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  addFoodContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  titleContent: {
    fontSize: 26,
    color: '#333',
    fontWeight: 'bold',
  },
  inputSearchContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: -8,
  },
  btnContainer: {
    flex: 0.45,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  btnText: {
    paddingHorizontal: 14,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
