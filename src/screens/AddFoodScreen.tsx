import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, Input} from '@rneui/themed';
import Icon from 'react-native-vector-icons/Ionicons';
import {HeaderComponent} from '../components/HeaderComponent';
import {AddFoodModal, FoodFormInterface} from '../components/AddFoodModal';
import {useFoodStorage} from '../hooks/useFoodStorage';
import {MealElement} from '../components/MealElement';

export const AddFoodScreen = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [initialFoods, setInitialFoods] = useState<FoodFormInterface[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const {handleGetFoods} = useFoodStorage();

  const loadFoods = async () => {
    try {
      const foodResponse = await handleGetFoods();

      setInitialFoods(foodResponse || []);
    } catch (error) {
      console.error(error);
      setInitialFoods([]);
    }
  };

  const handleCloseModal = async (shouldUpdate?: boolean) => {
    if (shouldUpdate) {
      Alert.alert('The food has been saved correctly ⌛✅');
      loadFoods();
    }
    setIsOpenModal(false);

    /* si la comida se ha guardado de manera exitosa entonces debe actualizarse y hacer un fetch nuevamente para traer la información actualizada */
  };

  const handleSearchFood = async () => {
    try {
      const foodResponse = await handleGetFoods();

      setInitialFoods(
        foodResponse.filter((element: FoodFormInterface) =>
          element.name
            .toLocaleUpperCase()
            .includes(searchInput.toLocaleUpperCase()),
        ),
      );
    } catch (error) {
      console.error(error);
      setInitialFoods([]);
    }
  };

  useEffect(() => {
    loadFoods();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            onPress={() => setIsOpenModal(true)}>
            <Icon name="add-circle-outline" size={30} color="#fff" />
          </Button>
        </View>
      </View>

      <View style={styles.inputSearchContainer}>
        <View style={styles.inputContainer}>
          <Input
            placeholder="apples, pie, chicken..."
            value={searchInput}
            onChangeText={(value: string) => setSearchInput(value)}
          />
        </View>

        <View style={styles.btnContainer}>
          <Button
            radius={'lg'}
            type="solid"
            color={'#ADE8AF'}
            activeOpacity={0.7}
            onPress={() => handleSearchFood()}>
            <Text style={{...styles.btnText, color: '#333'}}>Search</Text>
          </Button>
        </View>
      </View>

      <AddFoodModal
        isOpenModal={isOpenModal}
        handleCloseModal={handleCloseModal}
      />

      <ScrollView>
        {initialFoods?.map((element, index) => (
          <MealElement
            key={element.name + element.calories + index}
            mealElement={element}
            isAbleToAdd={true}
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
