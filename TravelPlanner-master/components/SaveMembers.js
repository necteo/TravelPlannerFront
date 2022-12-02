import AsyncStorage from "@react-native-async-storage/async-storage";

export const SaveMembers = async (members) => {
  const KEY = "@Members";

  try {
    const stringMembers = JSON.stringify(members);
    await AsyncStorage.setItem(KEY, stringMembers);
  } catch (e) {
    console.error(e.message);
  }
};
