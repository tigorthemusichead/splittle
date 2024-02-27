import {StatusFail, StatusObject, StatusSuccess} from "@/utils/statusObject";
import prisma from "@/prisma/db"
import readGroup from "@/lib/group/read";
type DeleteGroupResponse = {id: number, name: string, currency: string}

export default async function deleteGroup (id: number): Promise<StatusObject<DeleteGroupResponse>> {
  try {
    await prisma.groupsOnUsers.deleteMany({
      where: {
        groupId: id
      }
    })

    await prisma.expense.deleteMany({
      where: {
        groupId: id
      }
    })

    await prisma.invite.deleteMany({
      where: {
        groupId: id
      }
    })

    if (id == null) {
      return StatusFail(new Error("id was not provided"), 400)
    }
    const response = await prisma.group.delete({
      where: {
        id
      }
    })
    return StatusSuccess<DeleteGroupResponse>(response)
  } catch (err: any) {
    return StatusFail(err, 500)
  }
}
