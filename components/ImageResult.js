import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Paragraph, Text } from 'react-native-paper';

const ImageResult = ({ classificationResult }) => {
  return (
    classificationResult && (
      <Card style={styles.resultCard}>
        <Card.Title title="Classification Result" />
        <Card.Content>
          <Paragraph>Class Name: {classificationResult.class_name}</Paragraph>
          <Paragraph>File: {classificationResult.file}</Paragraph>
          <Paragraph>
            Probability: <Text style={styles.boldText}> {(classificationResult.probability * 100).toString().match(/^\d+(\.\d{0,2})?/)[0]}%</Text>
          </Paragraph>
        </Card.Content>
      </Card>
    )
  );
};

const styles = StyleSheet.create({
  resultCard: {
    marginTop: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default ImageResult;
