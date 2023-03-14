import { useState } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

export const useEncryptedStorage = () => {
  const [value, setValue] = useState<string | null>(null);

  const setItem = async (key: string, newValue: string) => {
    try {
      await EncryptedStorage.setItem(key, newValue);
      setValue(newValue);
    } catch (error) {
      console.error(error);
    }
  };

  const getItem = async (key: string) => {
    try {
      const storageValue = await EncryptedStorage.getItem(key);
      setValue(storageValue);
      return storageValue;
    } catch (error) {
      console.error(error);
    }
  };

  const removeItem = async (key: string) => {
    try {
      await EncryptedStorage.removeItem(key);
      setValue(null);
    } catch (error) {
      console.error(error);
    }
  };

  const clear = async () => {
    try {
      await EncryptedStorage.clear();
      setValue(null);
    } catch (error) {
      console.error(error);
    }
  };

  return { value, setItem, getItem, removeItem, clear };
};
