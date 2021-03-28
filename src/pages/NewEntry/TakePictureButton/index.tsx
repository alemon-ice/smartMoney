import React, { useState } from 'react';
import { View, Modal, ImageBackground, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RNCamera } from 'react-native-camera';

import CircularButton from '../../../components/CircularButton';
import { colors } from '../../../styles/colors';

import { IProps } from './types';

const TakePicture: React.FC<IProps> = ({ imageUri, changeImageUri }) => {
  const [camera, setCamera] = useState<RNCamera | null>(null);

  const [modalIsVisible, setModalIsVisible] = useState(false);

  function onPressButton() {
    setModalIsVisible(!modalIsVisible);
  }

  function onDeleteImage() {
    changeImageUri(null);
    onCloseModal();
  }

  function onCloseModal() {
    setModalIsVisible(!modalIsVisible);
  }

  async function onTakePicture() {
    try {
      if (camera) {
        const { uri } = await camera.takePictureAsync({
          quality: 0.5,
          forceUpOrientation: true,
          fixOrientation: true,
        });

        changeImageUri(uri);
      }
      onCloseModal();
    } catch (err) {
      console.error(
        'NewEntryCameraPickerModal :: error on take picture.\n',
        err,
      );
      Alert.alert('Erro', 'Houve um erro ao tirar a foto');
    }
  }

  return (
    <CircularButton
      icon="photo-camera"
      color={imageUri ? colors.blue : colors.asphalt}
      onPressAction={onPressButton}
    >
      <Modal animationType="slide" transparent={false} visible={modalIsVisible}>
        {imageUri ? (
          <ImageBackground
            source={{
              uri: imageUri,
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
                onPress={onDeleteImage}
                style={{
                  marginLeft: 16,
                }}
              />
              <Icon
                name="check"
                size={50}
                color={colors.white}
                onPress={onCloseModal}
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
                setModalIsVisible(!modalIsVisible);
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
  );
};

export default TakePicture;
