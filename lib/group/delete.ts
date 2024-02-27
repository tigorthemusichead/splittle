import {StatusFail, StatusObject, StatusSuccess} from "@/helpers/statusObject";
import prisma from "@/prisma/db"
type DeleteGroupResponse = {id: number, name: string, currency: string}

export default async function deleteGroup (id: number): Promise<StatusObject<DeleteGroupResponse>> {
  try {
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
