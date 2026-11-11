import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import CurrencyConverterView from './src/views/CurrencyConverterView';
import { useCurrencyConverter } from './src/viewmodels/useCurrencyConverter';

export default function App() {
  const converterViewModel = useCurrencyConverter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <CurrencyConverterView {...converterViewModel} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});