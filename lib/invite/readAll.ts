import {StatusFail, StatusObject, StatusSuccess} from "@/helpers/statusObject";
import prisma from "@/prisma/db"

type ReadAllInvitesResponse = { data: ({group: {id: number, name: string, currency: string}, user: {clerk_id: string, createdAt: Date, name: string}} & {id: number, createdAt: Date, lifeSpan: number, groupId: number, userId: string, isUsed: boolean})[] }

export default async function readAllInvites (): Promise<StatusObject<ReadAllInvitesResponse>> {
  try {
    const response = await prisma.invite.findMany({
      include: {
        user: true,
        group: true
      }
    })
    return StatusSuccess<ReadAllInvitesResponse>({data: response})
  } catch (err) {
    return StatusFail()
  }
}
