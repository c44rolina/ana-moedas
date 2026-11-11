import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  ScrollView,
  Image,
  Platform 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function CurrencyConverterView({
  amount,
  setAmount,
  currencies,
  sourceCurrency,
  setSourceCurrency,
  targetCurrency,
  setTargetCurrency,
  onConvert,
  onSwapCurrencies,
  loading,
  error,
  result,
}) {
  const isListEmpty = Object.keys(currencies).length === 0;

  return (
    <View style={styles.mainContainer}>
     
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ana Moedas</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
       
        <Image 
          source={require('../../assets/logo.png')} 
          style={styles.logo} 
          resizeMode="contain" 
        />

        <View style={styles.card}>
          <Text style={styles.label}>Adicionar Valor:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o valor"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />

          <View style={styles.rowContainer}>
            <View style={styles.columnItem}>
              <Text style={styles.label}>Selecionar a primeira moeda:</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={sourceCurrency}
                  onValueChange={(itemValue) => setSourceCurrency(itemValue)}
                  enabled={!isListEmpty && !loading}
                  style={styles.picker}
                >
                  {isListEmpty ? (
                    <Picker.Item label="Carregando..." value="" />
                  ) : (
                    Object.keys(currencies).map((code) => (
                      <Picker.Item key={code} label={`${code} - ${currencies[code]}`} value={code} />
                    ))
                  )}
                </Picker>
              </View>
            </View>

            <TouchableOpacity style={styles.swapButton} onPress={onSwapCurrencies}>
              <Text style={styles.swapButtonText}>⇅</Text>
            </TouchableOpacity>

            <View style={styles.columnItem}>
              <Text style={styles.label}>Selecionar a segunda moeda:</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={targetCurrency}
                  onValueChange={(itemValue) => setTargetCurrency(itemValue)}
                  enabled={!isListEmpty && !loading}
                  style={styles.picker}
                >
                  {isListEmpty ? (
                    <Picker.Item label="Carregando..." value="" />
                  ) : (
                    Object.keys(currencies).map((code) => (
                      <Picker.Item key={code} label={`${code} - ${currencies[code]}`} value={code} />
                    ))
                  )}
                </Picker>
              </View>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.button} 
            onPress={onConvert}
            disabled={loading || isListEmpty}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Converter</Text>
            )}
          </TouchableOpacity>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {result && (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Resultado da Conversão</Text>
            <Text style={styles.resultText}>
              {result.amount} {result.source} = <Text style={styles.highlight}>{result.converted} {result.target}</Text>
            </Text>
            <Text style={styles.infoText}>Taxa de Câmbio: {result.rate}</Text>
            <Text style={styles.infoText}>Data de Referência: {result.date}</Text>
          </View>
        )}

        {/* Rodapé */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            Ana Moedas é uma plataforma acadêmica desenvolvida para consultas de taxas de câmbio em tempo real com alta precisão, arquitetura MVVM e total segurança de dados.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    backgroundColor: '#c9687d',
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.5,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 15,
    marginTop: 5,
  },
  card: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#f0dede',
    shadowColor: '#d68a9b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8c4a5d',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2bcba',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff5f6',
    color: '#333',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  columnItem: {
    flex: 1,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#e2bcba',
    borderRadius: 8,
    backgroundColor: '#fff5f6',
    overflow: 'hidden',
    height: 48,
    justifyContent: 'center',
  },
  picker: {
    backgroundColor: '#fff5f6',
    color: '#333',
    borderWidth: 0,
  },
  swapButton: {
    backgroundColor: '#d68a9b',
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    marginTop: 25,
  },
  swapButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#c9687d',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#b52a3a',
    marginTop: 15,
    textAlign: 'center',
    fontWeight: '600',
  },
  resultCard: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: '#fff0f3',
    borderColor: '#f2cbd0',
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8c4a5d',
    marginBottom: 8,
  },
  resultText: {
    fontSize: 18,
    color: '#6e3847',
    marginBottom: 8,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#c9687d',
  },
  infoText: {
    fontSize: 12,
    color: '#9e737c',
    marginTop: 4,
  },
  footerContainer: {
    marginTop: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: '#f0dede',
    width: '100%',
    maxWidth: 440,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#9e737c',
    textAlign: 'center',
    lineHeight: 18,
  },
});