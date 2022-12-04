import AsyncStorage from "@react-native-async-storage/async-storage";

export const GetMembers = async () => {
  const KEY = "@Members";

  try {
    const members = await AsyncStorage.getItem(KEY);
    if (members !== null) {
      const memberDatas = JSON.parse(members);
      return memberDatas;
    }
    return null;
  } catch (e) {
    console.log(e.message);
  }
};
