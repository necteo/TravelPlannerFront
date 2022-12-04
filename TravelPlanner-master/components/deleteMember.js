import { GetMembers } from "./GetMembers";
import { SaveMembers } from "./SaveMembers";
import { PostTools } from "./PostTool";

const postTool = new PostTools();

export const deleteMember = async (member) => {
  const newMembers = await GetMembers();
  await postTool.postWithData(
    "Main/member/delete",
    JSON.stringify({
      member_id: member.member_id,
      trip_id: member.trip_id,
    })
  );
  if (member.member_id === newMembers[member.trip_id].member_id) {
    delete newMembers[member.trip_id];
    SaveMembers(newMembers);
  }
  return newMembers;
};
