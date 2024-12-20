import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

const LoadingIndicator = () => (
  <ActivityIndicator animating={true} size="large" style={styles.loadingIndicator} />
);

const styles = StyleSheet.create({
  loadingIndicator: {
    marginVertical: 20,
  },
});

export default LoadingIndicator;
