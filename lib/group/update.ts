import {StatusFail, StatusObject, StatusSuccess} from "@/helpers/statusObject";
import prisma from "@/prisma/db"
import allNotNull from "@/helpers/allNotNull";

export type UpdateGroupParams = {
  id: number
  name?: string
  currency?: string
}

type UpdateGroupResponse = {id: number, name: string, currency: string}

export default async function updateGroup (params: UpdateGroupParams): Promise<StatusObject<UpdateGroupResponse>> {
  try {
    if (!allNotNull(params.id)) {
      return StatusFail(new Error("Id was not provided"), 400)
    }
    const response = await prisma.group.update({
      where: {
        id: params.id
      },
      data: params
    })
    return StatusSuccess<UpdateGroupResponse>(response)
  } catch (err: any) {
    return StatusFail(err, 500)
  }
}
