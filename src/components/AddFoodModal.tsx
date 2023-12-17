import {Button, Input} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {useFoodStorage} from '../hooks/useFoodStorage';

interface AddFoodModalProps {
  isOpenModal: boolean;
  handleCloseModal: (shouldUpdate?: boolean) => void;
}

export interface FoodFormInterface {
  name: string;
  portion: string;
  calories: string;
  date?: string;
}

const INITIAL_STATE: FoodFormInterface = {
  name: '',
  portion: '',
  calories: '',
};

export const AddFoodModal = ({
  isOpenModal,
  handleCloseModal,
}: AddFoodModalProps) => {
  const [foodForm, setFoodForm] = useState<FoodFormInterface>(INITIAL_STATE);
  const {handleSaveFood} = useFoodStorage();

  const handleFoodForm = (value: string, field: keyof FoodFormInterface) => {
    setFoodForm(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleAddFood = async () => {
    try {
      await handleSaveFood({...foodForm});

      handleCloseModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setFoodForm(INITIAL_STATE);
  }, [isOpenModal]);

  return (
    <Modal
      animationType="fade"
      visible={isOpenModal}
      onRequestClose={() => handleCloseModal()}
      transparent>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.headerModal}>
            <Text style={styles.addFoodText}>Food Form</Text>

            <Button
              radius={'lg'}
              type="clear"
              activeOpacity={0.7}
              onPress={() => handleCloseModal()}>
              <Icon name="close-circle-outline" size={30} color="#d00" />
            </Button>
          </View>

          <View style={styles.formInputs}>
            <View style={styles.inputItem}>
              <View style={styles.inputContainer}>
                <Input
                  placeholder="chicken"
                  onChangeText={value => handleFoodForm(value, 'name')}
                  value={foodForm.name}
                />
              </View>

              <View style={styles.legendContainer}>
                <Text style={styles.legendContenet}>Name</Text>
              </View>
            </View>

            <View style={styles.inputItem}>
              <View style={styles.inputContainer}>
                <Input
                  placeholder="2"
                  onChangeText={value => handleFoodForm(value, 'portion')}
                  value={foodForm.portion}
                />
              </View>

              <View style={styles.legendContainer}>
                <Text style={styles.legendContenet}>Portion</Text>
              </View>
            </View>

            <View style={styles.inputItem}>
              <View style={styles.inputContainer}>
                <Input
                  placeholder="200"
                  onChangeText={value => handleFoodForm(value, 'calories')}
                  value={foodForm.calories}
                />
              </View>

              <View style={styles.legendContainer}>
                <Text style={styles.legendContenet}>Calories (cal)</Text>
              </View>
            </View>
          </View>

          <View style={styles.btnContainer}>
            <Button
              disabled={
                foodForm.calories.trim() === '' ||
                foodForm.name.trim() === '' ||
                foodForm.portion.trim() === ''
                  ? true
                  : false
              }
              radius={'lg'}
              type="solid"
              color={'#4ECB71'}
              activeOpacity={0.7}
              onPress={() => handleAddFood()}>
              <Text
                style={{
                  ...styles.btnText,
                  color:
                    foodForm.calories.trim() === '' ||
                    foodForm.name.trim() === '' ||
                    foodForm.portion.trim() === ''
                      ? '#aaa'
                      : '#fff',
                }}>
                Add Food
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  content: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    width: '85%',
    height: 410,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addFoodText: {
    fontSize: 35,
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  formInputs: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 12,
    paddingHorizontal: 12,
    gap: 2,
  },
  inputItem: {
    flexDirection: 'row',
    gap: 8,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  legendContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  legendContenet: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  btnContainer: {
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    paddingHorizontal: 40,
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  foodAddedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  foodAddedText: {
    fontSize: 18,
    color: '#4ECB71',
    fontWeight: 'bold',
  },
});
