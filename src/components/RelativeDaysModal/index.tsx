import React from 'react';
import { FlatList, Modal, View, TouchableOpacity, Text } from 'react-native';

import { colors } from '../../styles/colors';
import ActionFooter, { ActionButton } from '../Core/ActionFooter';
import { IProps } from './types';

const RelativeDaysModal: React.FC<IProps> = ({
  isVisible,
  onChange,
  setModalIsVisible,
}) => {
  const relativeDays = [1, 3, 7, 15, 21, 30, 45, 60, 90, 180, 365];

  return (
    <Modal animationType="slide" transparent={false} visible={isVisible}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
      >
        <FlatList
          data={relativeDays}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item: numberOfDays }) => (
            <TouchableOpacity
              style={{
                backgroundColor: colors.asphalt,
                borderRadius: 15,
                marginVertical: 10,
                marginHorizontal: 20,
                paddingVertical: 20,
                paddingHorizontal: 20,
              }}
              onPress={() => onChange(numberOfDays)}
            >
              <Text
                style={{
                  fontSize: 22,
                  color: colors.white,
                  textAlign: 'center',
                }}
              >
                {`${numberOfDays} dias`}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <ActionFooter>
        <ActionButton
          type="primary"
          title="Fechar"
          onPress={() => setModalIsVisible(false)}
        />
      </ActionFooter>
    </Modal>
  );
};

export default RelativeDaysModal;
