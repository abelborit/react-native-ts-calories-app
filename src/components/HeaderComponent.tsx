import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button} from '@rneui/themed';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootStackParams} from '../navigators/StackNavigator';

const staticUser = {
  name: 'Kanryu',
  profile:
    'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
};

export const HeaderComponent = () => {
  const {canGoBack, goBack} =
    useNavigation<StackNavigationProp<RootStackParams>>(); // forma un poco más directa usando el RootStackParams desde StackNavigator.tsx

  return (
    <View style={styles.container}>
      {canGoBack() ? (
        <View style={styles.btnContainer}>
          <Button
            radius={'lg'}
            type="clear"
            activeOpacity={0.7}
            onPress={() => goBack()}>
            <Icon name="arrow-back" size={28} color="#444" />
          </Button>
        </View>
      ) : null}

      <View style={styles.userInfoContainer}>
        <Text style={styles.userName}>{`Hello, ${staticUser.name}`}</Text>
        <Text style={styles.welcomeBackText}>
          {canGoBack()
            ? 'Add here your food information'
            : 'Welcome back to your daily goal'}
        </Text>
      </View>

      <View style={styles.userAvatarContainer}>
        <Image source={{uri: staticUser.profile}} style={styles.profileImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: -15,
  },
  userInfoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 2,
  },
  userName: {
    fontSize: 22,
    color: '#333',
    fontWeight: 'bold',
  },
  welcomeBackText: {
    fontSize: 15,
    color: '#666',
  },
  userAvatarContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  profileImage: {
    borderRadius: 50,
    width: 60,
    height: 60,
  },
});
