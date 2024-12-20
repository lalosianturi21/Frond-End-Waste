import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import axios from 'axios';
import { Provider as PaperProvider, Appbar, Headline, Caption, Button, Card } from 'react-native-paper';
import ImageSelector from './components/ImageSelector';
import ImageResult from './components/ImageResult';
import LoadingIndicator from './components/LoadingIndicator';

const ImageClassifier = () => {
  const [imageUri, setImageUri] = useState(null);
  const [classificationResult, setClassificationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const classifyImage = async () => {
    if (!imageUri) {
      alert('Pilih atau ambil gambar terlebih dahulu!');
      return;
    }

    const formData = new FormData();
    formData.append('files', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'image.jpg',
    });

    setLoading(true);
    try {
      const response = await axios.post('https://amh-project-backend-waste-8a2b6e4b7d57.herokuapp.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data && response.data.results) {
        setClassificationResult(response.data.results[0]);
      }
    } catch (error) {
      console.error('Error saat mengirim gambar:', error);
      alert('Terjadi kesalahan dalam mengklasifikasi gambar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="Klasifikasi Gambar" subtitle="Menggunakan React Native & AI" />
      </Appbar.Header>
      <View style={styles.container}>
        <Headline style={styles.headline}>Selamat Datang</Headline>
        <Caption style={styles.caption}>Pilih atau ambil gambar, lalu klasifikasikan</Caption>

        <ImageSelector setImageUri={setImageUri} setClassificationResult={setClassificationResult} />

        {imageUri && (
          <Card style={styles.card}>
            <Card.Title title="Gambar yang Dipilih" />
            <Card.Cover source={{ uri: imageUri }} style={styles.image} />
          </Card>
        )}

        {loading ? (
          <LoadingIndicator />
        ) : (
          <Button
            mode="contained"
            icon="check"
            onPress={classifyImage}
            style={[styles.button, { backgroundColor: '#28a745' }]}
            disabled={!imageUri}
          >
            Klasifikasikan Gambar
          </Button>
        )}

        <ImageResult classificationResult={classificationResult} />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headline: {
    marginTop: 20,
    textAlign: 'center',
  },
  caption: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#6c757d',
  },
  button: {
    marginVertical: 20,
    borderRadius: 5,
  },
  card: {
    marginVertical: 20,
  },
  image: {
    height: 200,
  },
});

export default ImageClassifier;
