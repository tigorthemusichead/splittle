import {StatusFail, StatusObject, StatusSuccess} from "@/helpers/statusObject";
import prisma from "@/prisma/db"

type ReadAllUsersResponse = { data : {groups: ({group: {id: number, name: string, currency: string}} & {userId: string, groupId: number, assignedAt: Date})[], expenses: {id: number, name: string | null, amount: number, payerId: string, groupId: number}[], invites: {}[]}[] }

export default async function readAllUsers (): Promise<StatusObject<ReadAllUsersResponse>> {
  try {
    const response = await prisma.user.findMany({
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
    return StatusSuccess<ReadAllUsersResponse>({data: response})
  } catch (err) {
    return StatusFail()
  }
}
