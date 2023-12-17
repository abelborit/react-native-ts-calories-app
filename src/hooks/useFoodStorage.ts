import AsyncStorage from '@react-native-async-storage/async-storage';
import {FoodFormInterface} from '../components/AddFoodModal';
import {isToday} from 'date-fns';

const MY_FOOD_KEY = '@MyFood:Key';
const MY_TODAY_FOOD_KEY = '@MyTodayFood:Key';

export const useFoodStorage = () => {
  const saveInfoToStorage = async (
    storageKey: string,
    foodData: FoodFormInterface,
  ) => {
    try {
      const currentSavedFood = await AsyncStorage.getItem(storageKey);

      if (currentSavedFood !== null) {
        const currentSavedFoodParsed = JSON.parse(currentSavedFood);
        currentSavedFoodParsed.push(foodData);

        await AsyncStorage.setItem(
          storageKey,
          JSON.stringify(currentSavedFoodParsed),
        );

        return Promise.resolve();
      }

      /* la primera vez que se crea ya forma el array con los valores iniciales del estado */
      await AsyncStorage.setItem(storageKey, JSON.stringify([foodData]));

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleSaveFood = async ({
    calories,
    name,
    portion,
  }: FoodFormInterface) => {
    try {
      const result = await saveInfoToStorage(MY_FOOD_KEY, {
        calories,
        name,
        portion,
      });

      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleGetFoods = async () => {
    try {
      const foodsStorage = await AsyncStorage.getItem(MY_FOOD_KEY);

      if (foodsStorage !== null) {
        const foodsStorageParsed = JSON.parse(
          foodsStorage,
        ) as FoodFormInterface[];

        return Promise.resolve(foodsStorageParsed);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleSaveTodayFood = async ({
    calories,
    name,
    portion,
  }: FoodFormInterface) => {
    try {
      const result = await saveInfoToStorage(MY_TODAY_FOOD_KEY, {
        calories,
        name,
        portion,
        date: new Date().toISOString(),
      });

      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleGetTodayFoods = async () => {
    try {
      const foodsStorage = await AsyncStorage.getItem(MY_TODAY_FOOD_KEY);

      if (foodsStorage !== null) {
        const foodsStorageParsed = JSON.parse(
          foodsStorage,
        ) as FoodFormInterface[];

        return Promise.resolve(
          foodsStorageParsed.filter(
            element => element.date && isToday(new Date(element.date)),
          ),
        );
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const ClearItemAsyncStorage = async () => {
    // Implementación de la función para limpiar el valor almacenado asincrónicamente

    try {
      await AsyncStorage.removeItem(MY_FOOD_KEY);
      await AsyncStorage.removeItem(MY_TODAY_FOOD_KEY);

      console.log('AsyncStorage cleaned');
    } catch (error) {
      /* este catch se trabaja más que todo cuando por alguna razón no se logra leer o entrar al AsyncStorage o está bloquedo o no hay almacenamiento suficiente algo por el estilo y con eso se tendría que manejar el error de forma distinta por ejemplo diciéndole al usuario que revise el almacenamiento del dispositivo o que isntale de nuevo la aplicación, etc... porque si la keyStorage existe o no existe igual leerá el espacio en memoria y pasará por el try y si no existe dará un null y si existe entonces se obtendrá el valueStorage pero igual en esos casos no pasará por el catch */
      console.error('Error al intentar remover el valor de AsyncStorage:', {
        error,
      });
      // throw new Error('No se pudo remover el valor de AsyncStorage');
    }
  };

  return {
    handleSaveFood,
    handleGetFoods,
    handleSaveTodayFood,
    handleGetTodayFoods,
    ClearItemAsyncStorage,
  };
};
