import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button} from '@rneui/themed';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigators/StackNavigator';
import {HeaderComponent} from '../components/HeaderComponent';
import {useFoodStorage} from '../hooks/useFoodStorage';
import {useFocusEffect} from '@react-navigation/native';
import {FoodFormInterface} from '../components/AddFoodModal';
import {TodayCalories, TodayCaloriesProps} from '../components/TodayCalories';
import {MealElement} from '../components/MealElement';

interface HomeScreenProps
  extends StackScreenProps<RootStackParams, 'HomeScreen'> {}

const totalCaloriesPerDay = 2000;

export const HomeScreen = ({navigation}: HomeScreenProps) => {
  const insets = useSafeAreaInsets();
  const [todayFoods, setTodayFoods] = useState<FoodFormInterface[]>([]);
  const [todayStatitics, setTodayStatitics] = useState<TodayCaloriesProps>({
    totalCalories: totalCaloriesPerDay,
    consumedCalories: 0,
    remainingCalories: 0,
    percentaje: 0,
  });
  const {handleGetTodayFoods, ClearItemAsyncStorage} = useFoodStorage();

  const calculateTodayStatitics = (foods: FoodFormInterface[]) => {
    try {
      const consumedCalories = foods.reduce(
        (acumulator, currentValue) =>
          acumulator + Number(currentValue.calories),
        0,
      );

      const remainingCalories = totalCaloriesPerDay - consumedCalories;

      const percentaje = (consumedCalories / totalCaloriesPerDay) * 100;

      setTodayStatitics({
        totalCalories: totalCaloriesPerDay,
        consumedCalories,
        remainingCalories,
        percentaje,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const loadTodayFoods = useCallback(async () => {
    try {
      const todayFoodResponse =
        (await handleGetTodayFoods()) as FoodFormInterface[];

      calculateTodayStatitics(todayFoodResponse);
      setTodayFoods(todayFoodResponse);
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

      <TodayCalories {...todayStatitics} />

      <ScrollView>
        {todayFoods?.map((element, index) => (
          <MealElement
            key={element.name + element.calories + index}
            mealElement={element}
            isAbleToAdd={false}
            handleCompleteAddOrRemoveItem={() => loadTodayFoods()}
            itemPosition={index}
          />
        ))}
      </ScrollView>
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
