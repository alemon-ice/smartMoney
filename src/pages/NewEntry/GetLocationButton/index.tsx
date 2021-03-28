import React from 'react';
import { Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';

import CircularButton from '../../../components/CircularButton';
import { colors } from '../../../styles/colors';

import { IProps, IGeolocation } from './types';

const GetLocation: React.FC<IProps> = ({ geolocation, changeGeolocation }) => {
  function onChangeGeolocation() {
    if (geolocation.address) {
      Alert.alert('Localização', geolocation.address, [
        {
          text: 'Apagar',
          onPress: () =>
            changeGeolocation({
              latitude: null,
              longitude: null,
              address: null,
            }),
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
              changeGeolocation({
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

  return (
    <CircularButton
      icon="person-pin"
      color={geolocation.address ? colors.blue : colors.asphalt}
      onPressAction={onChangeGeolocation}
    />
  );
};

export default GetLocation;
