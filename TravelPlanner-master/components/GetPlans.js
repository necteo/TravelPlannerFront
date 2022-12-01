import AsyncStorage from "@react-native-async-storage/async-storage";

export const GetPlans = async () => {
  const KEY = "@Plans";

  try {
    const plans = await AsyncStorage.getItem(KEY);
    if (plans !== null) {
      const tripDatas = JSON.parse(plans);
      console.log("getdata");
      return tripDatas;
    }
    return null;
  } catch (e) {
    console.log(e.message);
  }
};
