import {StatusFail, StatusObject, StatusSuccess} from "@/utils/statusObject";
import prisma from "@/prisma/db"

export type ReadGroupResponse = {users: ({user: {clerk_id: string, createdAt: Date, name: string}} & {userId: string, groupId: number, assignedAt: Date})[], expenses: {user: {clerk_id: string, createdAt: Date, name: string}, payedTo: {clerk_id: string, createdAt: Date, name: string} | null}[], invites: {}[]} | null

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
        expenses: {
          include: {
            user: true,
            payedTo: true
          }
        },
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
