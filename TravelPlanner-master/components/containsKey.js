import AsyncStorage from "@react-native-async-storage/async-storage";

export const containsKey = async (key) => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys.includes(key);
  } catch (e) {
    console.error(e.message);
  }
};
