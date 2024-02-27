import {StatusFail, StatusObject, StatusSuccess} from "@/utils/statusObject";
import prisma from "@/prisma/db"

export type ReadUserResponse =  {groups: ({group: {id: number, name: string, currency: string}} & {userId: string, groupId: number, assignedAt: Date})[], payed_expenses: {id: number, name: string | null, amount: number, payerId: string, groupId: number, isSplit: boolean, payedToId: string | null}[], receiver_expenses: {id: number, name: string | null, amount: number, payerId: string, groupId: number, isSplit: boolean, payedToId: string | null}[], invites: {}[]} | null

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
        payed_expenses: true,
        receiver_expenses: true,
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
