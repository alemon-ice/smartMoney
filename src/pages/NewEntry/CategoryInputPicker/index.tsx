import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { colors } from '../../../styles/colors';
import { ICategory } from '../../../interfaces/category';
import CategoryModal from '../../../components/CategoryModal';

import { Container } from './styles';
import { IProps } from './types';

const CategoryInputPicker: React.FC<IProps> = ({
  debit,
  category,
  changeCategory,
}) => {
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);

  function onChangeCategory(newCategory: ICategory | null) {
    changeCategory(newCategory);
    onCloseModal();
  }

  function onCloseModal() {
    setModalIsVisible(!modalIsVisible);
  }

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
      <CategoryModal
        debit={debit}
        modalIsVisible={modalIsVisible}
        onClose={setModalIsVisible}
        onChangeCategory={onChangeCategory}
        hasSelectedCategory={!!category.id}
      />
    </Container>
  );
};

export default CategoryInputPicker;
