import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button} from '@rneui/themed';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigators/StackNavigator';
import {HeaderComponent} from '../components/HeaderComponent';
import {useFoodStorage} from '../hooks/useFoodStorage';
import {useFocusEffect} from '@react-navigation/native';
import {FoodFormInterface} from '../components/AddFoodModal';

interface HomeScreenProps
  extends StackScreenProps<RootStackParams, 'HomeScreen'> {}

export const HomeScreen = ({navigation}: HomeScreenProps) => {
  const insets = useSafeAreaInsets();
  const [todayFoods, setTodayFoods] = useState<FoodFormInterface[]>([]);
  const {handleGetTodayFoods, ClearItemAsyncStorage} = useFoodStorage();

  const loadTodayFoods = useCallback(async () => {
    try {
      const todayFoodResponse = await handleGetTodayFoods();

      setTodayFoods(todayFoodResponse || []);
    } catch (error) {
      console.error(error);
      setTodayFoods([]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* es similar al useEffect() pero este useFocusEffect() es cuando se hace focus a una pantalla, por ejemplo, si yo estoy en una pantalla A y quiero que se ejecute cierta lógica y luego voy a una pantalla B y regreso a la pantalla A entonces cada vez que se haga focus a la pantalla A se disparará este useFocusEffect(). UseFocusEffect es análogo al hook useEffect de React. La única diferencia es que sólo se ejecuta si la pantalla está actualmente enfocada */
  /* Para evitar ejecutar el efecto con demasiada frecuencia, es importante ajustar la devolución de llamada en useCallback antes de pasarla a useFocusEffect */
  useFocusEffect(
    useCallback(() => {
      loadTodayFoods().catch(null);
    }, [loadTodayFoods]),
  );

  console.log(todayFoods);

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

      <View style={styles.btnClearContainer}>
        <Button
          radius={'lg'}
          type="solid"
          color={'#cb614e'}
          activeOpacity={0.7}
          onPress={() => ClearItemAsyncStorage()}>
          <Text style={styles.btnClearText}>Clear All Async Storage</Text>
        </Button>
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
  btnClearContainer: {
    marginTop: 20,
  },
  btnClearText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});
