"use server";
import updateUser from "@/lib/user/update";
import {ReadInviteResponse} from "@/lib/invite/read";
import updateInvite from "@/lib/invite/update";

export default async function joinGroup (clerk_id: string, inviteId: number, groupId: number): Promise<number | null> {
  const response = await updateUser({
    clerk_id,
    groups: [groupId]
  })
  if (response.success) {
    const response = await updateInvite({
      id: Number(inviteId),
      isUsed: true
    })
    if (response.success) {
      return groupId
    }
  }
  return null
}
