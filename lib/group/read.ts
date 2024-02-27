import {StatusFail, StatusObject, StatusSuccess} from "@/helpers/statusObject";
import prisma from "@/prisma/db"

export type ReadGroupResponse =  {users: ({user: {clerk_id: string, createdAt: Date, name: string}} & {userId: string, groupId: number, assignedAt: Date})[], expenses: {id: number, name: string | null, amount: number, payerId: string, groupId: number}[], invites: {}[]} | null

export default async function readGroup (id: number): Promise<StatusObject<ReadGroupResponse>> {
  try {
    const response = await prisma.group.findUnique({
      where: {
        id
      },
      include: {
        users: {
          include: {
            user: true
          }
        },
        expenses: true,
        invites: true
      }
    })
    if (response != null) {
      return StatusSuccess<ReadGroupResponse>(response)
    } else {
      return StatusFail()
    }
  } catch (err) {
    return StatusFail()
  }
}
