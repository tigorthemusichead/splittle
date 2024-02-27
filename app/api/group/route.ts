import createGroup from "@/lib/group/create";
import {NextRequest, NextResponse} from "next/server";
import readAllGroups from "@/lib/group/readAll";
import readGroup from "@/lib/group/read";
import updateGroup from "@/lib/group/update";
import deleteGroup from "@/lib/group/delete";

/**
 * @swagger
 * /api/group:
 *   post:
 *     tags:
 *       - Group
 *     description: Creates a new group
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: Clerk id of the user who is creating the group
 *               name:
 *                 type: string
 *                 description: Name of the group
 *               currency:
 *                 type: string
 *                 description: The currency of the group
 *     responses:
 *       201:
 *         success: true
 *       500:
 *         success: false
 */
export async function POST (req: NextRequest, res: NextResponse) {
  const body = await req.json()
  const response = await createGroup(body)
  if (response.success) {
    return Response.json(response, {status: 201})
  } else {
    return Response.json({error: response.error.message}, {status: response.error.status})
  }
}

/**
 * @swagger
 * /api/group:
 *   get:
 *     tags:
 *       - Group
 *     description: Get the group list
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: number
 *         description: The group id
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
    response = await readAllGroups()
  } else {
    response = await readGroup(Number(id))
  }
  if (response.success) {
    return Response.json(response)
  } else {
    return Response.json({error: response.error.message}, {status: response.error.status})
  }
}

/**
 * @swagger
 * /api/group:
 *   put:
 *     tags:
 *       - Group
 *     description: Update a group
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                type: number
 *                description: id of the group
 *               name:
 *                 type: string
 *                 description: Name of the group
 *               currency:
 *                 type: string
 *                 description: The currency of the group
 *     responses:
 *       200:
 *         success: true
 *       500:
 *         success: false
 */
export async function PUT (req: NextRequest, res: NextResponse) {
  const body = await req.json()
  const response = await updateGroup(body)
  if (response.success) {
    return Response.json(response)
  } else {
    return Response.json({error: response.error.message}, {status: response.error.status})
  }
}

/**
 * @swagger
 * /api/group:
 *   delete:
 *     tags:
 *     - Group
 *     description: Delete a group
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                type: number
 *                description: id of the group
 *     responses:
 *       200:
 *         success: true
 *       500:
 *         success: false
 */
export async function DELETE (req: NextRequest, res: NextResponse) {
  const body = await req.json()
  const response = await deleteGroup(body)
  if (response.success) {
    return Response.json(response)
  } else {
    return Response.json({error: response.error.message}, {status: response.error.status})
  }
}
