import {StatusFail, StatusObject, StatusSuccess} from "@/helpers/statusObject";
import prisma from "@/prisma/db"

type ReadAllGroupsResponse = {data: {users: ({user: {clerk_id: string, createdAt: Date, name: string}} & {userId: string, groupId: number, assignedAt: Date})[], expenses: {id: number, name: string | null, amount: number, payerId: string, groupId: number}[], invites: {}[]}[]}

export default async function readAllGroups (): Promise<StatusObject<ReadAllGroupsResponse>> {
  try {
    const response = await prisma.group.findMany({
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
    return StatusSuccess<ReadAllGroupsResponse>({data: response})
  } catch (err) {
    return StatusFail()
  }
}
