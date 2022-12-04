import { GetPlans } from "./GetPlans";
import { SavePlans } from "./SavePlans";
import { PostTools } from "./PostTool";

const postTool = new PostTools();

export const deletePlan = async (plan) => {
  const myPlans = await GetPlans();
  await postTool.postWithData(
    "Main/trip/delete",
    JSON.stringify({
      trip_id: plan.trip_id,
    })
  );
  delete myPlans[plan.trip_id];
  SavePlans(myPlans);
  console.log(myPlans);
  return myPlans;
};
