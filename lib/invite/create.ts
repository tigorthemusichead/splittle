import {StatusFail, StatusObject, StatusSuccess} from "@/utils/statusObject";
import allNotNull from "@/utils/allNotNull";
import prisma from "@/prisma/db";

export type CreateInviteParams = {
  userId: string
  groupId: number
  lifeSpan: number
}

export type CreateInviteResponse =  {id: number, createdAt: Date, lifeSpan: number, groupId: number, userId: string, isUsed: boolean}

export default async function createInvite (params: CreateInviteParams): Promise<StatusObject<CreateInviteResponse>> {
  try {
    if (allNotNull(params.userId, params.groupId, params.lifeSpan)) {
      const result = await prisma.invite.create({
        data: {
          lifeSpan: params.lifeSpan,
          user: {
            connect: {
              clerk_id: params.userId
            }
          },
          group: {
            connect: {
              id: params.groupId
            }
          }
        }
      })
      return StatusSuccess<CreateInviteResponse>(result)
    } else {
      return StatusFail(new Error("Request body is not valid"), 400)
    }
  } catch (err: any) {
    return StatusFail(err, 500)
  }
}
