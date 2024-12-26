import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
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
    <SafeAreaView>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          icon="image"
           style={[styles.button, { backgroundColor: 'green' }]} // Green button color
          onPress={selectImage}
        >
          Select from Gallery
        </Button>
        <Button
          mode="contained"
          icon="camera"
           style={[styles.button, { backgroundColor: 'green' }]} // Green button color
          onPress={captureImage}
        >
          Take from Camera
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    paddingHorizontal: 20, // Menambahkan padding horizontal
  },
  button: {
    marginHorizontal: 10, // Meningkatkan jarak antar tombol
    borderRadius: 5,
    flex: 1, // Membuat tombol mengisi ruang yang tersedia secara merata
  },
});

export default ImageSelector;
