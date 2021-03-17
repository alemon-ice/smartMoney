import React, { useState } from 'react';
import { View, Alert, Modal, ImageBackground } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DatetimePicker from 'react-native-modal-datetime-picker';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  BalanceLabel,
  InputMask,
  InputPicker,
  CircularButton,
} from '../../components';
import ActionFooter, { ActionButton } from '../../components/Core/ActionFooter';

import { IEntry } from '../../interfaces/entry';
import { ICategory } from '../../interfaces/category';
import { checkIfValueIsPositive } from '../../util/checkNumber';
import { colors } from '../../styles/colors';
import useEntries from '../../hooks/useEntries';

import { Container } from './styles';
import { IProps } from './types';

const NewEntry: React.FC<IProps> = () => {
  const { goBack } = useNavigation();
  const { params } = useRoute();
  const { entry } = params as IProps;
  const { saveEntry, removeEntry } = useEntries();

  const [amount, setAmount] = useState<string>(`${entry.amount}`);
  const [category, setCategory] = useState<ICategory>(entry.category);
  const [entryAt, setEntryAt] = useState<Date>(entry.entryAt);
  const [geolocation, setGeolocation] = useState<{
    latitude: number | null;
    longitude: number | null;
    address: string | null;
  }>({
    latitude: entry.latitude,
    longitude: entry.longitude,
    address: entry.address,
  });
  const [pictureUri, setPictureUri] = useState<string | null>(entry.photo);
  const [camera, setCamera] = useState<RNCamera | null>(null);
  const [debit, setDebit] = useState(
    checkIfValueIsPositive(Number(amount)) ? 1 : -1,
  );
  const [modalDateIsVisible, setModalDateIsVisible] = useState(false);
  const [modalCameraIsVisible, setModalCameraIsVisible] = useState(false);

  function onChangeDate(date: Date) {
    setEntryAt(date);
    setModalDateIsVisible(false);
  }

  async function onTakePicture() {
    try {
      if (camera) {
        const { uri } = await camera.takePictureAsync({
          quality: 0.5,
          forceUpOrientation: true,
          fixOrientation: true,
        });

        setPictureUri(uri);
      }
      setModalCameraIsVisible(!modalCameraIsVisible);
    } catch (err) {
      console.error(
        'NewEntryCameraPickerModal :: error on take picture.\n',
        err,
      );
      Alert.alert('Erro', 'Houve um erro ao tirar a foto');
    }
  }

  function onChangeGeolocation() {
    if (geolocation.address) {
      Alert.alert('Localização', geolocation.address, [
        {
          text: 'Apagar',
          onPress: () =>
            setGeolocation({ latitude: null, longitude: null, address: null }),
        },
        {
          text: 'OK',
        },
      ]);
    } else {
      getPosition();
    }
  }

  function getPosition() {
    Geolocation.getCurrentPosition(
      pos => {
        const { latitude } = pos.coords;
        const { longitude } = pos.coords;

        getLocation(latitude, longitude);
      },
      error => {
        console.error(
          'NewEntryAddressPicker :: erro ao recuperar a posição.\n',
          error,
        );
      },
    );
  }

  function getLocation(latitude: number, longitude: number) {
    Geocoder.init('AIzaSyAwVtYi0SCsTW0n-ZIpoV_qqGmTU0KEnMk');

    Geocoder.from({ latitude, longitude })
      .then(json => {
        const formattedAddress = json.results[0].formatted_address;
        Alert.alert('Endereço', formattedAddress, [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Confirmar',
            onPress: () =>
              setGeolocation({
                latitude,
                longitude,
                address: formattedAddress,
              }),
          },
        ]);
      })
      .catch(error => {
        console.error(
          'GetLocation :: erro ao recuperar a localização.\n',
          error,
        );
        Alert.alert(
          'Houve um erro ao recuperar sua posição, por favor verifique se você autorizou o acesso à sua localização.',
        );
      });
  }

  function isValidForm() {
    if (parseFloat(amount) !== 0) return true;

    return false;
  }

  async function handleSave() {
    const newEntry: IEntry = {
      amount: Number(amount) * debit,
      description: category.name,
      entryAt,
      photo: pictureUri,
      latitude: geolocation.latitude,
      longitude: geolocation.longitude,
      address: geolocation.address,
      category,
    };

    await saveEntry({ currentEntry: entry, newEntryData: newEntry });

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
            await removeEntry(entry);
            goBack();
          },
        },
      ],
      { cancelable: false },
    );
  }

  return (
    <Container>
      <BalanceLabel />

      <View
        style={{
          flex: 1,
          paddingVertical: 20,
        }}
      >
        <InputMask
          type="money"
          options={{
            precision: 2,
            separator: ',',
            delimiter: '.',
            unit: '',
            suffixUnit: '',
          }}
          onChangeValue={setAmount}
          value={amount}
          debit={debit}
          setDebit={setDebit}
        />
        <InputPicker
          debit={debit}
          category={category}
          setCategory={setCategory}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 10,
            marginHorizontal: 20,
          }}
        >
          <CircularButton
            icon="today"
            color={colors.asphalt}
            onPressAction={() => setModalDateIsVisible(!modalDateIsVisible)}
          >
            <DatetimePicker
              isVisible={modalDateIsVisible}
              mode="date"
              isDarkModeEnabled
              date={entryAt}
              onConfirm={onChangeDate}
              onCancel={() => setModalDateIsVisible(!modalDateIsVisible)}
            />
          </CircularButton>
          <CircularButton
            icon="photo-camera"
            color={pictureUri ? colors.blue : colors.asphalt}
            onPressAction={() => setModalCameraIsVisible(!modalCameraIsVisible)}
          >
            <Modal
              animationType="slide"
              transparent={false}
              visible={modalCameraIsVisible}
            >
              {pictureUri ? (
                <ImageBackground
                  source={{
                    uri: pictureUri,
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <View
                    style={{
                      flex: 0,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                      position: 'absolute',
                      bottom: 16,
                    }}
                  >
                    <Icon
                      name="delete"
                      size={50}
                      color={colors.white}
                      onPress={() => {
                        setPictureUri(null);
                        setModalCameraIsVisible(!modalCameraIsVisible);
                      }}
                      style={{
                        marginLeft: 16,
                      }}
                    />
                    <Icon
                      name="check"
                      size={50}
                      color={colors.white}
                      onPress={() => {
                        setModalCameraIsVisible(!modalCameraIsVisible);
                      }}
                      style={{
                        marginRight: 16,
                      }}
                    />
                  </View>
                </ImageBackground>
              ) : (
                <RNCamera
                  ref={ref => setCamera(ref)}
                  style={{
                    flex: 1,
                  }}
                  type={RNCamera.Constants.Type.back}
                  autoFocus={RNCamera.Constants.AutoFocus.on}
                  // flashMode={RNCamera.Constants.FlashMode.on} // TODO ATIVAR/DESATIVAR FLASH
                  androidCameraPermissionOptions={{
                    title: 'Permissão para utilizar câmera',
                    message:
                      'Precisamos da sua permissão para utilizar a câmera do seu dispositivo.',
                    buttonPositive: 'Permitir',
                    buttonNegative: 'Negar',
                  }}
                  captureAudio={false}
                >
                  <Icon
                    name="photo-camera"
                    size={40}
                    color={colors.white}
                    onPress={onTakePicture}
                    style={{
                      flex: 0,
                      alignSelf: 'center',
                      position: 'absolute',
                      bottom: 20,
                    }}
                  />
                  <Icon
                    name="close"
                    size={50}
                    color={colors.white}
                    onPress={() => {
                      setModalCameraIsVisible(!modalCameraIsVisible);
                    }}
                    style={{
                      flex: 0,
                      position: 'absolute',
                      top: 20,
                      right: 20,
                    }}
                  />
                </RNCamera>
              )}
            </Modal>
          </CircularButton>
          <CircularButton
            icon="person-pin"
            color={geolocation.address ? colors.blue : colors.asphalt}
            onPressAction={onChangeGeolocation}
          />
          {entry.id && (
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
          title={entry.id ? 'Salvar' : 'Adicionar'}
          onPress={() => isValidForm() && handleSave()}
        />
        <ActionButton title="Cancelar" onPress={goBack} />
      </ActionFooter>
    </Container>
  );
};

export default NewEntry;
