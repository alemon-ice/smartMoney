import React, { useState } from 'react';
import DatetimePicker from 'react-native-modal-datetime-picker';

import CircularButton from '../../../components/CircularButton';
import { colors } from '../../../styles/colors';

import { IProps } from './types';

const DatePicker: React.FC<IProps> = ({ date, changeDate }) => {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function onPressButton() {
    setModalIsVisible(!modalIsVisible);
  }

  function onChangeDate(newDate: Date) {
    changeDate(newDate);
    onCloseModal();
  }

  function onCloseModal() {
    setModalIsVisible(!modalIsVisible);
  }

  return (
    <CircularButton
      icon="today"
      color={colors.asphalt}
      onPressAction={onPressButton}
    >
      <DatetimePicker
        isVisible={modalIsVisible}
        mode="date"
        isDarkModeEnabled
        date={date}
        onConfirm={onChangeDate}
        onCancel={onCloseModal}
      />
    </CircularButton>
  );
};

export default DatePicker;
