import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Currency = 'GBP' | 'USD' | 'EUR' | 'GMD';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  rate: number; // exchange rate relative to GBP
  label: string;
}

export const CURRENCIES: Record<Currency, CurrencyConfig> = {
  GBP: { code: 'GBP', symbol: '£', rate: 1.0, label: 'GBP (£)' },
  USD: { code: 'USD', symbol: '$', rate: 1.28, label: 'USD ($)' },
  EUR: { code: 'EUR', symbol: '€', rate: 1.18, label: 'EUR (€)' },
  GMD: { code: 'GMD', symbol: 'D', rate: 87.0, label: 'GMD (Dalasi)' },
};

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (priceInGbp: number) => string;
  convertPrice: (priceInGbp: number) => number;
  currentSymbol: string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem('gambia_currency');
    return (saved && saved in CURRENCIES) ? (saved as Currency) : 'GBP';
  });

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem('gambia_currency', c);
  };

  const convertPrice = (priceInGbp: number): number => {
    const config = CURRENCIES[currency] || CURRENCIES.GBP;
    return Math.round(priceInGbp * config.rate);
  };

  const formatPrice = (priceInGbp: number): string => {
    const config = CURRENCIES[currency] || CURRENCIES.GBP;
    const converted = convertPrice(priceInGbp);
    
    if (currency === 'GMD') {
      return `D${converted.toLocaleString()}`;
    }
    return `${config.symbol}${converted}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        convertPrice,
        currentSymbol: CURRENCIES[currency]?.symbol || '£',
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
