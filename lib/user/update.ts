import {StatusFail, StatusObject, StatusSuccess} from "@/utils/statusObject";
import prisma from "@/prisma/db"
import allNotNull from "@/utils/allNotNull";

export type UpdateUserParams = {
  clerk_id: string
  name?: string
  groups: number[]
}

export type UpdateUserResponse = {clerk_id: string, createdAt: Date, name: string}

export default async function updateUser (params: UpdateUserParams): Promise<StatusObject<UpdateUserResponse>> {
  try {
    if (!allNotNull(params.clerk_id)) {
      return StatusFail(new Error("Id was not provided"), 400)
    }
    const response = await prisma.user.update({
      where: {
        clerk_id: params.clerk_id
      },
      data: {
        name: params.name ?? undefined,
        groups: {
          create: params.groups.map((groupId) => ({
            group: {
              connect: {
                id: groupId
              }
            }
          }))
        }
      }
    })
    return StatusSuccess<UpdateUserResponse>(response)
  } catch (err: any) {
    return StatusFail(err, 500)
  }
}
