import React, { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  BalanceLabel,
  EntrySummary,
  EntryList,
  RelativeDaysModal,
  CategoryModal,
} from '../../components';
import ActionFooter, { ActionButton } from '../../components/Core/ActionFooter';
import { Container } from './styles';
import { colors } from '../../styles/colors';
import { ICategory } from '../../interfaces/category';

const Report: React.FC = () => {
  const { goBack } = useNavigation();

  const [
    modalRelativeDaysIsVisible,
    setModalRelativeDaysIsVisible,
  ] = useState<boolean>(false);
  const [relativeDays, setRelativeDays] = useState<number>(3);
  const [modalCategoryIsVisible, setModalCategoryIsVisible] = useState<boolean>(
    false,
  );
  const [category, setCategory] = useState<Partial<ICategory>>({
    name: 'Todas Categorias',
  });

  const handleChangeRelativeDays = useCallback(
    (relativeDaysValue: number) => {
      setRelativeDays(relativeDaysValue);
      setModalRelativeDaysIsVisible(!modalRelativeDaysIsVisible);
    },
    [modalRelativeDaysIsVisible],
  );

  const handleChangeCategory = useCallback(
    (categoryValue: ICategory) => {
      setCategory(categoryValue);
      setModalCategoryIsVisible(!modalCategoryIsVisible);
    },
    [modalCategoryIsVisible],
  );

  return (
    <Container>
      <BalanceLabel />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          paddingHorizontal: 5,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            borderColor: colors.champagneDark,
            borderWidth: 1,
            borderRadius: 150,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 5,
            paddingHorizontal: 10,
            marginHorizontal: 5,
          }}
          onPress={() => {
            setModalRelativeDaysIsVisible(!modalRelativeDaysIsVisible);
          }}
        >
          <Text
            style={{
              color: colors.champagneDark,
              textAlign: 'center',
            }}
          >
            {`Últimos ${relativeDays} dias`}
          </Text>
          <Icon
            name="keyboard-arrow-down"
            size={20}
            color={colors.champagneDark}
          />
        </TouchableOpacity>
        <RelativeDaysModal
          isVisible={modalRelativeDaysIsVisible}
          setModalIsVisible={setModalRelativeDaysIsVisible}
          onChange={handleChangeRelativeDays}
        />

        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            borderColor: colors.champagneDark,
            borderWidth: 1,
            borderRadius: 150,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 5,
            paddingHorizontal: 10,
            marginHorizontal: 5,
          }}
          onPress={() => {
            setModalCategoryIsVisible(!modalCategoryIsVisible);
          }}
        >
          <Text
            style={{
              color: colors.champagneDark,
              textAlign: 'center',
            }}
          >
            {category.name}
          </Text>
          <Icon
            name="keyboard-arrow-down"
            size={20}
            color={colors.champagneDark}
          />
        </TouchableOpacity>
        <CategoryModal
          modalIsVisible={modalCategoryIsVisible}
          onClose={setModalCategoryIsVisible}
          onChangeCategory={handleChangeCategory}
        />
      </View>

      <ScrollView>
        <EntrySummary onPressActionButton={() => console.log('')} />
        <EntryList
          days={relativeDays}
          category={category}
          onEntryPress={() => console.log('')}
          onPressActionButton={() => console.log('')}
        />
      </ScrollView>
      <ActionFooter>
        <ActionButton type="primary" title="Fechar" onPress={goBack} />
      </ActionFooter>
    </Container>
  );
};

export default Report;
