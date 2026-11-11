import { useState, useEffect } from 'react';
import { fetchCurrencies, fetchExchangeRate } from '../models/currencyModel';

export function useCurrencyConverter() {
  const [amount, setAmount] = useState('');
  const [currencies, setCurrencies] = useState({});
  const [sourceCurrency, setSourceCurrency] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function loadCurrencies() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCurrencies();
        setCurrencies(data);

        const currencyKeys = Object.keys(data);
        if (currencyKeys.length >= 2) {
          setSourceCurrency(currencyKeys.includes('USD') ? 'USD' : currencyKeys[0]);
          setTargetCurrency(currencyKeys.includes('BRL') ? 'BRL' : currencyKeys[1]);
        }
      } catch (err) {
        setError('Não foi possível carregar a lista de moedas.');
      } finally {
        setLoading(false);
      }
    }

    loadCurrencies();
  }, []);

  const handleSwapCurrencies = () => {
    const temp = sourceCurrency;
    setSourceCurrency(targetCurrency);
    setTargetCurrency(temp);
    setResult(null);
  };

  const handleConvert = async () => {
    setError(null);
    setResult(null);

    const normalizedAmount = amount.trim().replace(',', '.');
    const numericAmount = parseFloat(normalizedAmount);

    if (!amount || amount.trim() === '' || isNaN(numericAmount)) {
      setError('Por favor, informe um valor numérico válido para a conversão.');
      return;
    }

    if (numericAmount <= 0) {
      setError('O valor a ser convertido deve ser maior que zero.');
      return;
    }

    if (!sourceCurrency || !targetCurrency) {
      setError('Por favor, selecione a moeda de origem e a moeda de destino.');
      return;
    }

    if (sourceCurrency === targetCurrency) {
      setError('A moeda de origem e a moeda de destino devem ser diferentes.');
      return;
    }

    try {
      setLoading(true);
      const data = await fetchExchangeRate(sourceCurrency, targetCurrency);

      const rate = data.rate;
      const convertedValue = numericAmount * rate;

      setResult({
        amount: numericAmount.toFixed(2),
        source: sourceCurrency,
        converted: convertedValue.toFixed(2),
        target: targetCurrency,
        rate: rate,
        date: data.date,
      });
    } catch (err) {
      setError('Falha ao obter a taxa de câmbio da API. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return {
    amount,
    setAmount,
    currencies,
    sourceCurrency,
    setSourceCurrency,
    targetCurrency,
    setTargetCurrency,
    loading,
    error,
    result,
    onConvert: handleConvert,
    onSwapCurrencies: handleSwapCurrencies,
  };
}
