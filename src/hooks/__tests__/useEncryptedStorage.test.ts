import { act, renderHook } from '@testing-library/react-hooks';
import EncryptedStorage from 'react-native-encrypted-storage';

import { useEncryptedStorage } from '../useEncryptedStorage';

jest.mock('react-native-encrypted-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

describe('useEncryptedStorage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('setItem', () => {
    test('should store value in EncryptedStorage and update state', async () => {
      const { result } = renderHook(() => useEncryptedStorage());
      const key = 'testKey';
      const newValue = 'testValue';

      await act(async () => {
        await result.current.setItem(key, newValue);
      });

      expect(EncryptedStorage.setItem).toHaveBeenCalledWith(key, newValue);
      expect(result.current.value).toEqual(newValue);
    });

    test('should handle errors', async () => {
      const { result } = renderHook(() => useEncryptedStorage());
      const key = 'testKey';
      const newValue = 'testValue';

      const error = new Error('Something went wrong');
      (
        EncryptedStorage.setItem as jest.MockedFunction<
          typeof EncryptedStorage.setItem
        >
      ).mockImplementation(() => Promise.reject(error));

      const consoleErrorMock = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      await act(async () => {
        await result.current.setItem(key, newValue);
      });

      expect(EncryptedStorage.setItem).toHaveBeenCalledWith(key, newValue);
      expect(result.current.value).toBeNull();

      expect(consoleErrorMock).toHaveBeenCalledWith(error);
      consoleErrorMock.mockRestore();
    });
  });

  describe('getItem', () => {
    test('getItem should retrieve value from EncryptedStorage and update state', async () => {
      const { result } = renderHook(() => useEncryptedStorage());
      const key = 'testKey';
      const storageValue = 'testValue';
      (
        EncryptedStorage.getItem as jest.MockedFunction<
          typeof EncryptedStorage.getItem
        >
      ).mockImplementation(() => Promise.resolve(storageValue));

      let value;
      await act(async () => {
        value = await result.current.getItem(key);
      });

      expect(EncryptedStorage.getItem).toHaveBeenCalledWith(key);
      expect(result.current.value).toEqual(storageValue);
      expect(value).toEqual(storageValue);
    });

    test('should handle errors', async () => {
      const { result } = renderHook(() => useEncryptedStorage());
      const key = 'testKey';

      const error = new Error('Something went wrong');
      (
        EncryptedStorage.getItem as jest.MockedFunction<
          typeof EncryptedStorage.getItem
        >
      ).mockImplementation(() => Promise.reject(error));
      const consoleErrorMock = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const value = await result.current.getItem(key);

      expect(EncryptedStorage.getItem).toHaveBeenCalledWith(key);
      expect(result.current.value).toBeNull();
      expect(value).toBeUndefined();

      expect(consoleErrorMock).toHaveBeenCalledWith(error);
      consoleErrorMock.mockRestore();
    });
  });

  describe('removeItem', () => {
    test('should remove value from EncryptedStorage and update state', async () => {
      const { result } = renderHook(() => useEncryptedStorage());
      const key = 'testKey';

      await result.current.removeItem(key);

      expect(EncryptedStorage.removeItem).toHaveBeenCalledWith(key);
      expect(result.current.value).toBeNull();
    });

    test('should handle errors', async () => {
      const { result } = renderHook(() => useEncryptedStorage());
      const key = 'testKey';

      const error = new Error('Something went wrong');
      (
        EncryptedStorage.removeItem as jest.MockedFunction<
          typeof EncryptedStorage.removeItem
        >
      ).mockImplementation(() => Promise.reject(error));
      const consoleErrorMock = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      await result.current.removeItem(key);

      expect(EncryptedStorage.removeItem).toHaveBeenCalledWith(key);
      expect(result.current.value).toBeNull();

      expect(consoleErrorMock).toHaveBeenCalledWith(error);
      consoleErrorMock.mockRestore();
    });
  });

  describe('clear', () => {
    test('should remove all values from EncryptedStorage and update state', async () => {
      const { result } = renderHook(() => useEncryptedStorage());

      await result.current.clear();

      expect(EncryptedStorage.clear).toHaveBeenCalled();
      expect(result.current.value).toBeNull();
    });

    test('should handle errors', async () => {
      const { result } = renderHook(() => useEncryptedStorage());

      const error = new Error('Something went wrong');
      (
        EncryptedStorage.clear as jest.MockedFunction<
          typeof EncryptedStorage.clear
        >
      ).mockImplementation(() => Promise.reject(error));
      const consoleErrorMock = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      await result.current.clear();

      expect(EncryptedStorage.clear).toHaveBeenCalled();
      expect(result.current.value).toBeNull();

      expect(consoleErrorMock).toHaveBeenCalledWith(error);
      consoleErrorMock.mockRestore();
    });
  });
});
