import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

export interface TodayCaloriesProps {
  totalCalories: number | string;
  consumedCalories: number | string;
  remainingCalories: number | string;
  percentaje: number;
}

export const TodayCalories = ({
  totalCalories = 2000,
  consumedCalories = 0,
  remainingCalories = 0,
  percentaje = 0,
}: TodayCaloriesProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calories</Text>

      <View style={styles.caloriesProgressContainer}>
        <View style={styles.progressContainer}>
          <CircularProgress
            value={percentaje}
            radius={70}
            duration={500}
            progressValueColor={'#4ECB71'}
            valueSuffix={'%'}
            // title={'Calories'}
            // titleColor={'#4ECB71'}
            // titleStyle={{fontWeight: 'bold'}}
          />
        </View>

        <View style={styles.caloriesContainer}>
          <Text style={styles.caloriesTitle}>Today Calories</Text>
          <View style={styles.caloriesInfoContainer}>
            <Text style={styles.caloriesInfoTitle}>Total:</Text>
            <Text style={styles.caloriesInfo}>{totalCalories}</Text>
          </View>

          <View style={styles.caloriesInfoContainer}>
            <Text style={styles.caloriesInfoTitle}>Consumed:</Text>
            <Text style={styles.caloriesInfo}>{consumedCalories}</Text>
          </View>

          <View style={styles.caloriesInfoContainer}>
            <Text style={styles.caloriesInfoTitle}>Remaining:</Text>
            <Text style={styles.caloriesInfo}>{remainingCalories}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
  },
  title: {
    fontSize: 26,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  caloriesProgressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
  },
  progressContainer: {
    flex: 1,
    alignItems: 'center',
  },
  caloriesContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  caloriesTitle: {
    alignSelf: 'center',
    fontSize: 22,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  caloriesInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  caloriesInfoTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  caloriesInfo: {
    fontSize: 18,
    color: '#333',
  },
});
