import { useState } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

/**
 * This general hook is used to store, retrieve and remove values
 * from the encrypted storage.
 *
 * It's mainly meant to be used for storing the auth state but could
 * potentially be used for other things as well.
 */
export const useEncryptedStorage = () => {
  const [value, setValue] = useState<string | null>(null);

  /**
   * This function is used to store a value in the encrypted storage.
   *
   * @param key The key to be used for storing the value.
   * @param newValue The new value to be stored.
   * @throws An error if the value couldn't be stored.
   */
  const setItem = async (key: string, newValue: string): Promise<void> => {
    try {
      await EncryptedStorage.setItem(key, newValue);
      setValue(newValue);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * This function is used to retrieve a value from the encrypted storage.
   *
   * @param key The key to be used for retrieving the value.
   * @returns The value or null if it doesn't exist.
   * @throws An error if the value couldn't be retrieved.
   */
  const getItem = async (key: string): Promise<string | null> => {
    try {
      const storageValue = await EncryptedStorage.getItem(key);
      setValue(storageValue);
      return storageValue;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  /**
   * This function is used to remove a value from the encrypted storage.
   *
   * @param key The key to be used for removing the value.
   * @throws An error if the value couldn't be removed.
   */
  const removeItem = async (key: string): Promise<void> => {
    try {
      await EncryptedStorage.removeItem(key);
      setValue(null);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * This function is used to remove all values from the encrypted storage.
   *
   * @throws An error if the values couldn't be removed.
   */
  const clear = async (): Promise<void> => {
    try {
      await EncryptedStorage.clear();
      setValue(null);
    } catch (error) {
      console.error(error);
    }
  };

  return { value, setItem, getItem, removeItem, clear };
};
