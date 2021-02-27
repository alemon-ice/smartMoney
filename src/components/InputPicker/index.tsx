import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, Modal, FlatList } from 'react-native';

import { colors } from '../../styles/colors';
import { getCategories } from '../../services/Categories';
import { ICategory } from '../../interfaces/category';
import { isCreditOrDebit } from '../../util/checkNumber';

import { Container, ModalContainer } from './styles';
import { IProps } from './types';

const InputPicker: React.FC<IProps> = ({ debit, category, setCategory }) => {
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategory[]>([]);

  function onChangeCategory(categoryItem: ICategory) {
    setCategory(categoryItem);
    setModalIsVisible(!modalIsVisible);
  }

  useEffect(() => {
    (async () => {
      const typeEntry = isCreditOrDebit(debit);
      const categoriesList = await getCategories(typeEntry);
      setCategories(categoriesList);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debit]);

  return (
    <Container>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          padding: 20,
        }}
        onPress={() => setModalIsVisible(!modalIsVisible)}
      >
        <Text
          style={{
            flex: 1,
            fontSize: 28,
            color: colors.white,
            textAlign: 'center',
            paddingRight: 20,
          }}
        >
          {category.name}
        </Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={false} visible={modalIsVisible}>
        <ModalContainer>
          <FlatList
            data={categories}
            keyExtractor={item => item.id}
            renderItem={({ item: categoryItem, index }) => (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: colors.asphaltDark,
                  borderRadius: 15,
                  marginVertical: 10,
                  marginHorizontal: 20,
                  padding: 15,
                  borderLeftWidth: 10,
                  borderLeftColor: categoryItem.color,
                  borderRightWidth: 10,
                  borderRightColor: colors.asphaltDark,
                }}
                onPress={() => onChangeCategory(categoryItem)}
              >
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 22,
                    textAlign: 'center',
                  }}
                >
                  {categoryItem.name}
                </Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            onPress={() => setModalIsVisible(!modalIsVisible)}
            style={{
              borderColor: colors.green,
              backgroundColor: colors.background,
              borderWidth: 1.5,
              borderRadius: 15,
              alignSelf: 'center',
              marginVertical: 10,
              marginHorizontal: 20,
              paddingVertical: 5,
              paddingHorizontal: 10,
            }}
          >
            <Text
              style={{
                color: colors.green,
                textAlign: 'center',
                fontSize: 14,
              }}
            >
              Fechar
            </Text>
          </TouchableOpacity>
        </ModalContainer>
      </Modal>
    </Container>
  );
};

export default InputPicker;
