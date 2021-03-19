import AsyncStorage from '@react-native-community/async-storage';

export const isInitialized = async (): Promise<boolean> => {
  const openingBalance = await AsyncStorage.getItem('openingBalance');
  return openingBalance !== null && openingBalance === 'true';
};

export const setInialized = async (): Promise<void> => {
  await AsyncStorage.setItem('openingBalance', 'true');
};

export const cleanInialized = async (): Promise<void> => {
  await AsyncStorage.removeItem('openingBalance');
};
