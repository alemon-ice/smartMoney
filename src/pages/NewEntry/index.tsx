import React, { useState } from 'react';
import { View, Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import {
  BalanceLabel,
  InputMask,
  TextInput,
  CircularButton,
} from '../../components';
import ActionFooter, { ActionButton } from '../../components/Core/ActionFooter';
import CategoryInputPicker from './CategoryInputPicker';
import DatePickerButton from './DatePickerButton';
import TakePictureButton from './TakePictureButton';
import GetLocationButton from './GetLocationButton';

import { IGeolocation } from './GetLocationButton/types';
import { IEntry } from '../../interfaces/entry';
import { ICategory } from '../../interfaces/category';
import {
  checkIfValueIsPositive,
  convertInputMaskValue,
} from '../../util/numberValues';
import { nullCategoryValue } from '../../util/NewEntryValue';
import { colors } from '../../styles/colors';
import useEntries from '../../hooks/useEntries';

import { styles } from './styles';
import { IProps } from './types';

const NewEntry: React.FC<IProps> = () => {
  const { goBack } = useNavigation();
  const { params } = useRoute();
  const { currentEntry } = params as IProps;
  const { saveEntry, removeEntry } = useEntries();

  const [amount, setAmount] = useState<string>(currentEntry.amount.toString());
  const [description, setDescription] = useState<string>(
    currentEntry.description,
  );
  const [entryAt, setEntryAt] = useState<Date>(currentEntry.entryAt);
  const [geolocation, setGeolocation] = useState<IGeolocation>({
    latitude: currentEntry.latitude,
    longitude: currentEntry.longitude,
    address: currentEntry.address,
  });
  const [category, setCategory] = useState<ICategory>(currentEntry.category);
  const [imageUri, setImageUri] = useState<string | null>(currentEntry.photo);

  const [debit, setDebit] = useState(
    checkIfValueIsPositive(Number(amount)) ? 1 : -1,
  );

  function handleChangeAmount(value: string) {
    setAmount(value);
  }

  function handleChangeDescription(value: string) {
    setDescription(value);
  }

  function handleChangeCategory(value: ICategory | null) {
    if (value) {
      setCategory(value);
    } else {
      setCategory(nullCategoryValue);
    }
  }

  function handleChangeDate(date: Date) {
    setEntryAt(date);
  }

  function handleChangeImageUri(newImageUri: string | null) {
    setImageUri(newImageUri);
  }

  function handleChangeGeolocation(newGeolocation: IGeolocation) {
    setGeolocation(newGeolocation);
  }

  function isValidForm() {
    if (parseFloat(amount) === 0) return false;
    if (!category) return false;

    return true;
  }

  async function handleSave() {
    const amountNumber = Number(amount);

    const amountisPositive = checkIfValueIsPositive(amountNumber);
    const debitIsPositive = checkIfValueIsPositive(debit);

    const shouldNotConvertTheSignal =
      amountisPositive === false && debitIsPositive === false;

    const entry: IEntry = {
      id: currentEntry.id,
      amount: shouldNotConvertTheSignal ? amountNumber : amountNumber * debit,
      // amount: amountNumber,
      description,
      entryAt,
      latitude: geolocation.latitude,
      longitude: geolocation.longitude,
      address: geolocation.address,
      photo: imageUri,
      category,
    };

    await saveEntry(entry);

    goBack();
  }

  async function handleRemove() {
    Alert.alert(
      'Apagar?',
      'Você deseja realmente apagar este lançamento?',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim',
          onPress: async () => {
            await removeEntry(currentEntry);
            goBack();
          },
        },
      ],
      { cancelable: false },
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <BalanceLabel />

        <View style={styles.formView}>
          <InputMask
            changeValue={handleChangeAmount}
            value={convertInputMaskValue({ value: amount, to: 'number' })}
            debit={debit}
            setDebit={setDebit}
            checkCategory={{
              category,
              changeCategory: handleChangeCategory,
            }}
          />
          <TextInput
            placeholder="descrição curta (opcional)"
            maxLength={28}
            value={description}
            onChangeValue={handleChangeDescription}
          />
          <CategoryInputPicker
            debit={debit}
            category={category}
            changeCategory={handleChangeCategory}
          />
          <View style={styles.circularButtons}>
            <DatePickerButton date={entryAt} changeDate={handleChangeDate} />
            <TakePictureButton
              imageUri={imageUri}
              changeImageUri={handleChangeImageUri}
            />
            <GetLocationButton
              geolocation={geolocation}
              changeGeolocation={handleChangeGeolocation}
            />
            {currentEntry.id && (
              <CircularButton
                icon="delete"
                color={colors.red}
                onPressAction={handleRemove}
              />
            )}
          </View>
        </View>

        <ActionFooter>
          <ActionButton
            type="primary"
            title={currentEntry.id ? 'Salvar' : 'Adicionar'}
            onPress={() => isValidForm() && handleSave()}
          />
          <ActionButton title="Cancelar" onPress={goBack} />
        </ActionFooter>
      </View>
    </ScrollView>
  );
};

export default NewEntry;
