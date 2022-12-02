import AsyncStorage from "@react-native-async-storage/async-storage";

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error(e.message);
  }
};
