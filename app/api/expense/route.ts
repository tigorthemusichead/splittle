import {NextRequest, NextResponse} from "next/server";
import createExpense from "@/lib/expense/create";

/**
 * @swagger
 * /api/expense:
 *   post:
 *     tags:
 *       - Expense
 *     description: Creates a new expense
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of expense
 *               amount:
 *                 type: number
 *                 description: Amount of expense
 *               payerId:
 *                 type: string
 *                 description: id of user who paid
 *               groupId:
 *                 type: number
 *                 description: id of group
 *               isSplit:
 *                 type: boolean
 *                 description: is the expense splittable
 *               payedToId:
 *                 type: string
 *                 description: id of user who received payment
 *
 *     responses:
 *       201:
 *         success: true
 *       500:
 *         success: false
 */
export async function POST (req: NextRequest, res: NextResponse) {
  const body = await req.json()
  const response = await createExpense(body)
  if (response.success) {
    return Response.json(response, {status: 201})
  } else {
    return Response.json({error: response.error.message}, {status: response.error.status})
  }
}
