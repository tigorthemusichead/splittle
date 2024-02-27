import {StatusFail, StatusObject, StatusSuccess} from "@/utils/statusObject";
import allNotNull from "@/utils/allNotNull";
import prisma from "@/prisma/db";

export type CreateExpenseParams = {
  name: string
  amount: number
  payerId: string
  groupId: number
  isSplit: boolean
  payedToId?: string
}

export type CreateExpenseResponse = {id: number, name: string | null, amount: number, payerId: string, groupId: number, isSplit: boolean, payedToId: string | null}

export default async function createExpense (params: CreateExpenseParams): Promise<StatusObject<CreateExpenseResponse>> {
  try {
    if (allNotNull(params.name, params.amount, params.payerId, params.groupId, params.isSplit )) {
      const result = await prisma.expense.create({
        data: {
          name: params.name,
          amount: params.amount,
          isSplit: params.isSplit,
          group: {
            connect: {
              id: params.groupId
            }
          },
          user: {
            connect: {
              clerk_id: params.payerId
            }
          },
          payedTo: !params.isSplit ? {
            connect: {
              clerk_id: params.payedToId
            }
          } : undefined
        }
      })
      return StatusSuccess<CreateExpenseResponse>(result)
    } else {
      return StatusFail(new Error("Request body is not valid"), 400)
    }
  } catch (err: any) {
    return StatusFail(err, 500)
  }
}
