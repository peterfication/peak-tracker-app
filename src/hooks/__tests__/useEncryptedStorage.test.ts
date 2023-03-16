import EncryptedStorage from 'react-native-encrypted-storage';
import { act, renderHook } from '@testing-library/react-hooks';

import { useEncryptedStorage } from '../useEncryptedStorage';

/* eslint-disable @typescript-eslint/unbound-method */
const mockedSetItem = jest.mocked(EncryptedStorage.setItem);
const mockedGetItem = jest.mocked(EncryptedStorage.getItem);
const mockedRemoveItem = jest.mocked(EncryptedStorage.removeItem);
const mockedClear = jest.mocked(EncryptedStorage.clear);
/* eslint-enable @typescript-eslint/unbound-method */

describe('useEncryptedStorage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('setItem', () => {
    it('should store value in EncryptedStorage and update state', async () => {
      const { result } = renderHook(() => useEncryptedStorage());
      const key = 'testKey';
      const newValue = 'testValue';

      await act(async () => {
        await result.current.setItem(key, newValue);
      });

      expect(mockedSetItem).toHaveBeenCalledWith(key, newValue);
      expect(result.current.value).toEqual(newValue);
    });

    it('should handle errors', async () => {
      const { result } = renderHook(() => useEncryptedStorage());
      const key = 'testKey';
      const newValue = 'testValue';

      const error = new Error('Something went wrong');
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      mockedSetItem.mockImplementation(() => Promise.reject(error));

      const consoleErrorMock = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      await act(async () => {
        await result.current.setItem(key, newValue);
      });

      expect(mockedSetItem).toHaveBeenCalledWith(key, newValue);
      expect(result.current.value).toBeNull();

      expect(consoleErrorMock).toHaveBeenCalledWith(error);
      consoleErrorMock.mockRestore();
    });
  });

  describe('getItem', () => {
    it('getItem should retrieve value from EncryptedStorage and update state', async () => {
      const { result } = renderHook(() => useEncryptedStorage());
      const key = 'testKey';
      const storageValue = 'testValue';
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      mockedGetItem.mockImplementation(() => Promise.resolve(storageValue));

      let value;
      await act(async () => {
        value = await result.current.getItem(key);
      });

      expect(mockedGetItem).toHaveBeenCalledWith(key);
      expect(result.current.value).toEqual(storageValue);
      expect(value).toEqual(storageValue);
    });

    it('should handle errors', async () => {
      const { result } = renderHook(() => useEncryptedStorage());
      const key = 'testKey';

      const error = new Error('Something went wrong');
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      mockedGetItem.mockImplementation(() => Promise.reject(error));
      const consoleErrorMock = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const value = await result.current.getItem(key);

      expect(mockedGetItem).toHaveBeenCalledWith(key);
      expect(result.current.value).toBeNull();
      expect(value).toBeNull();

      expect(consoleErrorMock).toHaveBeenCalledWith(error);
      consoleErrorMock.mockRestore();
    });
  });

  describe('removeItem', () => {
    it('should remove value from EncryptedStorage and update state', async () => {
      const { result } = renderHook(() => useEncryptedStorage());
      const key = 'testKey';

      await result.current.removeItem(key);

      expect(mockedRemoveItem).toHaveBeenCalledWith(key);
      expect(result.current.value).toBeNull();
    });

    it('should handle errors', async () => {
      const { result } = renderHook(() => useEncryptedStorage());
      const key = 'testKey';

      const error = new Error('Something went wrong');
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      mockedRemoveItem.mockImplementation(() => Promise.reject(error));
      const consoleErrorMock = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      await result.current.removeItem(key);

      expect(mockedRemoveItem).toHaveBeenCalledWith(key);
      expect(result.current.value).toBeNull();

      expect(consoleErrorMock).toHaveBeenCalledWith(error);
      consoleErrorMock.mockRestore();
    });
  });

  describe('clear', () => {
    it('should remove all values from EncryptedStorage and update state', async () => {
      const { result } = renderHook(() => useEncryptedStorage());

      await result.current.clear();

      expect(mockedClear).toHaveBeenCalled();
      expect(result.current.value).toBeNull();
    });

    it('should handle errors', async () => {
      const { result } = renderHook(() => useEncryptedStorage());

      const error = new Error('Something went wrong');
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      mockedClear.mockImplementation(() => Promise.reject(error));
      const consoleErrorMock = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      await result.current.clear();

      expect(mockedClear).toHaveBeenCalled();
      expect(result.current.value).toBeNull();

      expect(consoleErrorMock).toHaveBeenCalledWith(error);
      consoleErrorMock.mockRestore();
    });
  });
});
