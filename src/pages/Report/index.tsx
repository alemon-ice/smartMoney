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
import { nullCategoryValue } from '../../util/NewEntryValue';
import { IEntry } from '../../interfaces/entry';

const Report: React.FC = () => {
  const { navigate, goBack } = useNavigation();

  const [
    modalRelativeDaysIsVisible,
    setModalRelativeDaysIsVisible,
  ] = useState<boolean>(false);
  const [relativeDays, setRelativeDays] = useState<number>(3);
  const [modalCategoryIsVisible, setModalCategoryIsVisible] = useState<boolean>(
    false,
  );
  const [category, setCategory] = useState<ICategory>(nullCategoryValue);

  const handleChangeRelativeDays = useCallback(
    (relativeDaysValue: number) => {
      setRelativeDays(relativeDaysValue);
      setModalRelativeDaysIsVisible(!modalRelativeDaysIsVisible);
    },
    [modalRelativeDaysIsVisible],
  );

  const handleChangeCategory = useCallback(
    (categoryValue: ICategory | null) => {
      if (categoryValue) {
        setCategory(categoryValue);
      } else {
        setCategory(nullCategoryValue);
      }
      setModalCategoryIsVisible(!modalCategoryIsVisible);
    },
    [modalCategoryIsVisible],
  );

  const onEntryPress = useCallback(
    (entry: IEntry) => {
      navigate('NewEntry', { currentEntry: entry });
    },
    [navigate],
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
            {!category.id ? 'Todas Categorias' : category.name}
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
          hasSelectedCategory={!!category.id}
        />
      </View>

      <ScrollView>
        <EntrySummary days={relativeDays} />
        <EntryList
          days={relativeDays}
          category={category}
          onEntryPress={onEntryPress}
        />
      </ScrollView>
      <ActionFooter>
        <ActionButton type="primary" title="Fechar" onPress={goBack} />
      </ActionFooter>
    </Container>
  );
};

export default Report;
