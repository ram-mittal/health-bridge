import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Voice from '@react-native-voice/voice';

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [results, setResults] = useState(null);

  const startVoiceRecognition = async () => {
    try {
      await Voice.start('en-US');
      setIsListening(true);
    } catch (error) {
      console.error(error);
    }
  };

  const stopVoiceRecognition = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (error) {
      console.error(error);
    }
  };

  const checkSymptoms = async () => {
    // Here you would integrate with your AI service
    // This is a placeholder response
    setResults({
      possibleConditions: ['Common Cold', 'Seasonal Allergies'],
      recommendations: ['Rest', 'Stay hydrated', 'Consider consulting a doctor'],
      nearbyFacilities: [
        { name: 'City Hospital', distance: '2.5km' },
        { name: 'Medical Center', distance: '3.1km' }
      ]
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Symptom Checker</Text>
      
      <TextInput
        style={styles.input}
        multiline
        value={symptoms}
        onChangeText={setSymptoms}
        placeholder="Describe your symptoms..."
      />

      <TouchableOpacity
        style={styles.voiceButton}
        onPress={isListening ? stopVoiceRecognition : startVoiceRecognition}
      >
        <Text style={styles.buttonText}>
          {isListening ? 'Stop Recording' : 'Voice Input'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.checkButton} onPress={checkSymptoms}>
        <Text style={styles.buttonText}>Check Symptoms</Text>
      </TouchableOpacity>

      {results && (
        <View style={styles.results}>
          <Text style={styles.subtitle}>Possible Conditions:</Text>
          {results.possibleConditions.map((condition, index) => (
            <Text key={index}>{condition}</Text>
          ))}

          <Text style={styles.subtitle}>Recommendations:</Text>
          {results.recommendations.map((rec, index) => (
            <Text key={index}>{rec}</Text>
          ))}

          <Text style={styles.subtitle}>Nearby Healthcare Facilities:</Text>
          {results.nearbyFacilities.map((facility, index) => (
            <Text key={index}>{facility.name} - {facility.distance}</Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    minHeight: 100,
  },
  voiceButton: {
    backgroundColor: '#FF5722',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  checkButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  results: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
});