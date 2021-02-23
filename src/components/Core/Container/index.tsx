import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../../styles/colors';

import { Container as ContainerWrapper } from './styles';
import { IProps } from './types';

const Container: React.FC<IProps> = ({
  title,
  children,
  actionLabelText,
  actionButtonText,
  onPressActionButton,
}) => {
  return (
    <ContainerWrapper>
      {title && (
        <Text
          style={{
            fontSize: 12,
            color: colors.white,
            marginBottom: 10,
          }}
        >
          {title}
        </Text>
      )}
      {children}

      {actionLabelText || actionButtonText ? (
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          {actionLabelText && (
            <Text
              style={{
                flex: 1,
                fontSize: 12,
                color: colors.white,
              }}
            >
              {actionLabelText}
            </Text>
          )}
          {actionButtonText && (
            <TouchableOpacity
              style={{ flexDirection: 'row' }}
              onPress={onPressActionButton}
            >
              <Icon
                name="insert-chart"
                style={{ color: colors.white, marginTop: 3, marginRight: 2 }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: colors.white,
                }}
              >
                {actionButtonText}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ) : null}
    </ContainerWrapper>
  );
};

export default Container;
