import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MedicineScanner from '../components/MedicineScanner';
import SymptomChecker from '../components/SymptomChecker';

export default function FamilyDashboard() {
  const [showScanner, setShowScanner] = useState(false);
  const [showSymptomChecker, setShowSymptomChecker] = useState(false);
  const [medications, setMedications] = useState([
    { name: 'Paracetamol', taken: true, time: '8:00 AM', nextDose: '8:00 PM' },
    { name: 'Vitamin D', taken: false, time: null, nextDose: '2:00 PM' },
  ]);

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Family Health Dashboard</Text>
        <TouchableOpacity style={styles.scanButton}>
          <Icon name="qr-code-scanner" size={24} color="#fff" />
          <Text style={styles.scanButtonText}>Scan Medicine</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="medical-services" size={32} color="#4CAF50" />
          <Text>Check Symptoms</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="video-call" size={32} color="#2196F3" />
          <Text>Teleconsult</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="location-on" size={32} color="#F44336" />
          <Text>Nearby Care</Text>
        </TouchableOpacity>
      </View>

      {/* Medication Tracker */}
      <View style={styles.medicationSection}>
        <Text style={styles.sectionTitle}>Today's Medications</Text>
        {medications.map((med, index) => (
          <View key={index} style={styles.medicationCard}>
            <View style={styles.medInfo}>
              <Text style={styles.medName}>{med.name}</Text>
              <Text style={styles.medTime}>
                Next dose: {med.nextDose}
              </Text>
            </View>
            <View style={styles.medStatus}>
              {med.taken ? (
                <Text style={styles.takenText}>✅ Taken at {med.time}</Text>
              ) : (
                <TouchableOpacity style={styles.logButton}>
                  <Text style={styles.logButtonText}>Log Dose</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </View>

      {/* Voice Assistant Button */}
      <TouchableOpacity style={styles.voiceButton}>
        <Icon name="mic" size={32} color="#fff" />
        <Text style={styles.voiceButtonText}>Voice Assistant</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 10,
    borderRadius: 8,
  },
  scanButtonText: {
    color: '#fff',
    marginLeft: 5,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#fff',
    marginVertical: 10,
  },
  actionButton: {
    alignItems: 'center',
  },
  medicationSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  medicationCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  medInfo: {
    flex: 1,
  },
  medName: {
    fontSize: 18,
    fontWeight: '500',
  },
  medTime: {
    color: '#666',
    marginTop: 5,
  },
  medStatus: {
    alignItems: 'flex-end',
  },
  takenText: {
    color: '#4CAF50',
  },
  logButton: {
    backgroundColor: '#2196F3',
    padding: 8,
    borderRadius: 5,
  },
  logButtonText: {
    color: '#fff',
  },
  voiceButton: {
    backgroundColor: '#FF5722',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    margin: 20,
    borderRadius: 25,
  },
  voiceButtonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
});

const handleScanComplete = (data) => {
  // Handle the scanned medicine data
  setShowScanner(false);
  // Add medicine to medications list
};

const handleLogDose = (medIndex) => {
  const updatedMedications = [...medications];
  updatedMedications[medIndex].taken = true;
  updatedMedications[medIndex].time = new Date().toLocaleTimeString();
  setMedications(updatedMedications);
};

if (showScanner) {
  return <MedicineScanner onScanComplete={handleScanComplete} />;
}

if (showSymptomChecker) {
  return <SymptomChecker onClose={() => setShowSymptomChecker(false)} />;
}
