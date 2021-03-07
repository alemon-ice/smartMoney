import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, Modal, FlatList } from 'react-native';

import { getCategories } from '../../services/Categories';
import { isCreditOrDebit } from '../../util/checkNumber';
import { ICategory } from '../../interfaces/category';
import ActionFooter, { ActionButton } from '../Core/ActionFooter';
import { colors } from '../../styles/colors';
import { ModalContainer } from './styles';
import { IProps } from './types';

const CategoryModal: React.FC<IProps> = ({
  debit = null,
  modalIsVisible,
  onClose,
  onChangeCategory,
}) => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    (async () => {
      let categoriesList = [];
      if (!debit) {
        categoriesList = await getCategories();
      } else {
        const entryType = isCreditOrDebit(debit);
        categoriesList = await getCategories(entryType);
      }
      setCategories(categoriesList);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debit]);

  return (
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
        <ActionFooter>
          <ActionButton
            type="primary"
            title="Fechar"
            onPress={() => onClose(!modalIsVisible)}
          />
        </ActionFooter>
      </ModalContainer>
    </Modal>
  );
};

export default CategoryModal;
