import AsyncStorage from "@react-native-async-storage/async-storage";

export const SavePlans = async (plans) => {
  const KEY = "@Plans";

  try {
    const stringPlans = JSON.stringify(plans);
    await AsyncStorage.setItem(KEY, stringPlans);
  } catch (e) {
    console.error(e.message);
  }
};
