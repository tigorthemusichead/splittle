import {StatusFail, StatusObject, StatusSuccess} from "@/utils/statusObject";
import prisma from "@/prisma/db"

type ReadAllUsersResponse = any
export default async function readAllUsers (): Promise<StatusObject<ReadAllUsersResponse>> {
  try {
    const response = await prisma.user.findMany({
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
    return StatusSuccess<ReadAllUsersResponse>({data: response})
  } catch (err) {
    return StatusFail()
  }
}
