import {StatusFail, StatusObject, StatusSuccess} from "@/helpers/statusObject";
import prisma from "@/prisma/db"

export type ReadUserResponse = {groups: ({group: {id: number, name: string, currency: string}} & {userId: string, groupId: number, assignedAt: Date})[], expenses: {id: number, name: string | null, amount: number, payerId: string, groupId: number}[], invites: {}[]} | null

export default async function readUser (id: string): Promise<StatusObject<ReadUserResponse>> {
  try {
    const response = await prisma.user.findUnique({
      where: {
        clerk_id: id
      },
      include: {
        groups: {
          include: {
            group: true
          }
        },
        expenses: true,
        invites: true
      }
    })
    if (response != null) {
      return StatusSuccess(response)
    } else {
      return StatusFail()
    }
  } catch (err) {
    return StatusFail()
  }
}
