import {StatusFail, StatusObject, StatusSuccess} from "@/helpers/statusObject";
import prisma from "@/prisma/db"
import allNotNull from "@/helpers/allNotNull";

export type UpdateInviteParams = {
  id: number
  isUsed: boolean
}

type UpdateInviteResponse =  {id: number, createdAt: Date, lifeSpan: number, groupId: number, userId: string, isUsed: boolean}

export default async function updateInvite (params: UpdateInviteParams): Promise<StatusObject<UpdateInviteResponse>> {
  try {
    if (!allNotNull(params.id)) {
      return StatusFail(new Error("Id was not provided"), 400)
    }
    const response = await prisma.invite.update({
      where: {
        id: params.id
      },
      data: {
        isUsed: params.isUsed
      }
    })
    return StatusSuccess<UpdateInviteResponse>(response)
  } catch (err: any) {
    return StatusFail(err, 500)
  }
}
