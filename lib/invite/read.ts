import {StatusFail, StatusObject, StatusSuccess} from "@/helpers/statusObject";
import prisma from "@/prisma/db"

export type ReadInviteResponse = {group: {id: number, name: string, currency: string}, user: {clerk_id: string, createdAt: Date, name: string}} & {id: number, createdAt: Date, lifeSpan: number, groupId: number, userId: string, isUsed: boolean}

export default async function readInvite (id: number): Promise<StatusObject<ReadInviteResponse>> {
  try {
    const response: ReadInviteResponse | null = await prisma.invite.findUnique({
      where: {
        id
      },
      include: {
        user: true,
        group: true
      }
    })
    if (response != null) {
      return StatusSuccess<ReadInviteResponse>(response)
    } else {
      return StatusFail()
    }
  } catch (err) {
    return StatusFail()
  }
}
