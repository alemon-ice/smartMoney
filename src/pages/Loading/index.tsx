import React, { useEffect } from 'react';
import { View, StatusBar, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { isInitialized } from '../../services/Welcome';
import { colors } from '../../styles/colors';

const Loading: React.FC = () => {
  const { navigate } = useNavigation();

  useEffect(() => {
    (async () => {
      const initialized = await isInitialized();

      if (initialized) {
        navigate('Main');
      } else {
        navigate('Welcome');
      }
    })();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <ActivityIndicator color={colors.violet} size={40} />
    </View>
  );
};

export default Loading;
