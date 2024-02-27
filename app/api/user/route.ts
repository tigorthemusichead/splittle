import {NextRequest, NextResponse} from "next/server";
import updateGroup from "@/lib/group/update";
import readAllUsers from "@/lib/user/readAll";
import readUser from "@/lib/user/read";
import updateUser from "@/lib/user/update";

/**
 * @swagger
 * /api/user:
 *   get:
 *     tags:
 *       - User
 *     description: Get the users list or a single user
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: The user id
 *     responses:
 *       200:
 *         success: true
 *       500:
 *         success: false
 */
export async function GET (req: NextRequest, res: NextResponse) {
  const id = req.nextUrl.searchParams.get('id')
  let response
  if (id == null) {
    response = await readAllUsers()
  } else {
    response = await readUser(id)
  }
  if (response.success) {
    return Response.json(response)
  } else {
    return Response.json({error: response.error.message}, {status: response.error.status})
  }
}

/**
 * @swagger
 * /api/user:
 *   put:
 *     tags:
 *       - User
 *     description: Update user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                type: string
 *                description: id of the group
 *               name:
 *                 type: string
 *                 description: name of user
 *               groups:
 *                 type: array
 *                 items:
 *                   type: number
 *                 description: Name of the group
 *     responses:
 *       200:
 *         success: true
 *       500:
 *         success: false
 */
export async function PUT (req: NextRequest, res: NextResponse) {
  const body = await req.json()
  const response = await updateUser(body)
  if (response.success) {
    return Response.json(response)
  } else {
    return Response.json({error: response.error.message}, {status: response.error.status})
  }
}
