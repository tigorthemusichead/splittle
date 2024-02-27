"use server";
import createInvite, {CreateInviteResponse} from "@/lib/invite/create";

export default async function createInviteLink (groupId: number, userId: string): Promise<string | null> {
  const invite = await createInvite({
    userId,
    groupId,
    lifeSpan: 24
  }) as CreateInviteResponse & {success: boolean}
  if (!invite.success) {
    return null
  }
  return `/invite/${invite.id}`
}
