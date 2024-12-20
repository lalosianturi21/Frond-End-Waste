import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

const ImageSelector = ({ setImageUri, setClassificationResult }) => {
  const selectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      (response) => {
        if (response.assets && response.assets[0].uri) {
          setImageUri(response.assets[0].uri);
          setClassificationResult(null); // Reset classification result when a new image is selected
        }
      }
    );
  };

  const captureImage = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      (response) => {
        if (response.assets && response.assets[0].uri) {
          setImageUri(response.assets[0].uri);
          setClassificationResult(null); // Reset classification result when a new image is captured
        }
      }
    );
  };

  return (
    <View style={styles.buttonContainer}>
      <Button mode="contained" icon="image" style={styles.button} onPress={selectImage}>
        Pilih dari Galeri
      </Button>
      <Button mode="contained" icon="camera" style={styles.button} onPress={captureImage}>
        Ambil dari Kamera
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    marginHorizontal: 5,
    borderRadius: 5,
  },
});

export default ImageSelector;
