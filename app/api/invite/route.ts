import {NextRequest, NextResponse} from "next/server";
import createInvite from "@/lib/invite/create";
import readInvite from "@/lib/invite/read";
import readAllInvites from "@/lib/invite/readAll";
import updateInvite from "@/lib/invite/update";

/**
 * @swagger
 * /api/invite:
 *   post:
 *     tags:
 *       - Invite
 *     description: Creates a new invite
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: Clerk id of the user who is inviting
 *               groupId:
 *                  type: number
 *                  description: id of the group
 *               lifeSpan:
 *                  type: number
 *                  description: life span of the invite in hours
 *     responses:
 *       201:
 *         success: true
 *       500:
 *         success: false
 */
export async function POST (req: NextRequest, res: NextResponse) {
  const body = await req.json()
  const response = await createInvite(body)
  if (response.success) {
    return Response.json(response, {status: 201})
  } else {
    return Response.json({error: response.error.message}, {status: response.error.status})
  }
}

/**
 * @swagger
 * /api/invite:
 *   get:
 *     tags:
 *       - Invite
 *     description: Get the invites list or one invite
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: number
 *         description: The invite id
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
    response = await readAllInvites()
  } else {
    response = await readInvite(Number(id))
  }
  if (response.success) {
    return Response.json(response)
  } else {
    return Response.json({error: response.error.message}, {status: response.error.status})
  }
}

/**
 * @swagger
 * /api/invite:
 *   put:
 *     tags:
 *       - Invite
 *     description: Update invite (update isUsed status)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                type: number
 *                description: id of the invite
 *               isUsed:
 *                type: boolean
 *                description: status of the invite
 *     responses:
 *       200:
 *         success: true
 *       500:
 *         success: false
 */
export async function PUT (req: NextRequest, res: NextResponse) {
  const body = await req.json()
  const response = await updateInvite(body)
  if (response.success) {
    return Response.json(response)
  } else {
    return Response.json({error: response.error.message}, {status: response.error.status})
  }
}
