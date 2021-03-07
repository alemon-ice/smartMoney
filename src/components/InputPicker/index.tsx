import React, { useCallback, useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { colors } from '../../styles/colors';
import { ICategory } from '../../interfaces/category';
import CategoryModal from '../CategoryModal';

import { Container } from './styles';
import { IProps } from './types';

const InputPicker: React.FC<IProps> = ({ debit, category, setCategory }) => {
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);

  const handleChangeCategory = useCallback(
    (categoryItem: ICategory) => {
      setCategory(categoryItem);
      setModalIsVisible(!modalIsVisible);
    },
    [modalIsVisible, setCategory, setModalIsVisible],
  );

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
        onChangeCategory={handleChangeCategory}
      />
    </Container>
  );
};

export default InputPicker;
