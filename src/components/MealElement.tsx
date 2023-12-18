import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {FoodFormInterface} from './AddFoodModal';
import {Button} from '@rneui/themed';
import {useFoodStorage} from '../hooks/useFoodStorage';

interface MealElementProps {
  mealElement: FoodFormInterface;
  isAbleToAdd: boolean;
  itemPosition?: number;
  handleCompleteAddOrRemoveItem?: () => void;
}

export const MealElement = ({
  mealElement,
  isAbleToAdd,
  itemPosition,
  handleCompleteAddOrRemoveItem,
}: MealElementProps) => {
  const {handleSaveTodayFood, handleRemoveTodayFood} = useFoodStorage();

  const handleAddOrRemoveTodayItem = async () => {
    try {
      if (isAbleToAdd) {
        await handleSaveTodayFood({...mealElement});
        Alert.alert('The food has been saved correctly for today ⚡✅');
      } else {
        /* se hace esa validación para que no se rompa un poco el código o no nos de warnings pero igual si no viene el itemPosition es que se agregará un elemento y si viene entonces se eliminará */
        await handleRemoveTodayFood(itemPosition ?? -1);
        Alert.alert('The food has been removed correctly for today 💥✅');
      }

      /* si no viene definida (por arriba se está colocando como opcional) entonces no se ejecuta */
      handleCompleteAddOrRemoveItem?.();
    } catch (error) {
      console.error(error);
      Alert.alert('The food has not been saved correctly for today ❌');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.infoName}>{mealElement.name}</Text>
        <Text style={styles.infoPortion}>Portion: {mealElement.portion}</Text>
        <Text style={styles.infoPortion}>Calories: {mealElement.calories}</Text>
      </View>

      <View style={styles.btnContainer}>
        <Button
          radius={'lg'}
          type="clear"
          color={'#4ECB71'}
          activeOpacity={0.7}
          onPress={() => handleAddOrRemoveTodayItem()}
          buttonStyle={{width: 50}}>
          <Icon
            name={isAbleToAdd ? 'add-circle-outline' : 'close-outline'}
            size={30}
            color="#333"
          />
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    backgroundColor: '#ADE8AF',
    borderRadius: 25,
  },
  infoContainer: {
    flex: 2.5,
  },
  infoName: {
    // letterSpacing: 1,
    fontSize: 24,
    textTransform: 'capitalize',
    color: '#333',
    fontWeight: 'bold',
  },
  infoPortion: {
    letterSpacing: 1,
    fontSize: 16,
    textTransform: 'capitalize',
    color: 'rgba(0,0,0,0.5)',
  },
  btnContainer: {
    justifyContent: 'center',
  },
});
