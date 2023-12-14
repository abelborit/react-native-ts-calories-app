import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button} from '@rneui/themed';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigators/StackNavigator';
import {HeaderComponent} from '../components/HeaderComponent';

interface HomeScreenProps
  extends StackScreenProps<RootStackParams, 'HomeScreen'> {}

export const HomeScreen = ({navigation}: HomeScreenProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        ...styles.container,
        top: insets.top + 5,
        bottom: insets.bottom + 5,
      }}>
      <HeaderComponent />

      <View style={styles.caloriesContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleContent}>Check Calories</Text>
        </View>

        <View style={styles.btnContainer}>
          <Button
            radius={'lg'}
            type="solid"
            color={'#4ECB71'}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('AddFoodScreen')}>
            <Text style={styles.btnText}>Add Food</Text>
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
  caloriesContainer: {
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
  btnContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  btnText: {
    paddingHorizontal: 10,
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
});
