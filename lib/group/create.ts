import {StatusFail, StatusObject, StatusSuccess} from "@/helpers/statusObject";
import allNotNull from "@/helpers/allNotNull";
import prisma from "@/prisma/db";

export type CreateGroupParams = {
  userId: string
  name: string
  currency: string
}

type CreateGroupResponse =  {id: number, name: string, currency: string}

export default async function createGroup (params: CreateGroupParams): Promise<StatusObject<CreateGroupResponse>> {
  try {
    if (allNotNull(params.userId, params.name, params.currency)) {
      const result = await prisma.group.create({
        data: {
          name: params.name,
          currency: params.currency,
          users: {
            create: [
              {
                user: {
                  connect: {
                    clerk_id: params.userId
                  }
                }
              }
            ]
          }
        }
      })
      return StatusSuccess<CreateGroupResponse>(result)
    } else {
      return StatusFail(new Error("Request body is not valid"), 400)
    }
  } catch (err: any) {
    return StatusFail(err, 500)
  }
}
