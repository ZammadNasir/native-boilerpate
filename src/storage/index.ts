import { MMKV } from "react-native-mmkv"

// Create MMKV instance
export const mmkvStorage = new MMKV({
  id: "app-storage",
  encryptionKey: "encryption-key",
})

// Helper functions for common operations
export const storage = {
  // Get value
  get: <T>(key: string): T | null => {
    const value = mmkvStorage.getString(key);
    if (!value) return null;
    try {
      return JSON.parse(value) as T;
    } catch {
      return value as unknown as T;
    }
  },
  
  // Set value
  set: <T>(key: string, value: T): void => {
    mmkvStorage.set(key, typeof value === 'string' ? value : JSON.stringify(value));
  },
  
  // Delete value
  delete: (key: string): void => {
    mmkvStorage.delete(key);
  },
  
  // Clear all storage
  clear: (): void => {
    mmkvStorage.clearAll();
  },
  
  // Get all keys
  getAllKeys: (): string[] => {
    return mmkvStorage.getAllKeys();
  },
};

