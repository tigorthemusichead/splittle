import {currentUser} from "@clerk/nextjs";
import prisma from '@/prisma/db'
import {StatusFail, StatusObject, StatusSuccess} from "@/helpers/statusObject";

type RegisterUserResponse = {clerk_id: string, createdAt: Date, name: string} | null | undefined

export default async function registerUser(): Promise<StatusObject<RegisterUserResponse>> {
  try {
    const user = await currentUser()
    if (user != null) {
      const dbUser = await prisma.user.findUnique({
        where: {
          clerk_id: user.id
        }
      })
      if (dbUser == null) {
        const response = await prisma.user.create({
          data: {
            name: `${user.firstName} ${user.lastName}`,
            clerk_id: user.id
          }
        })
        console.log("New user registered: ", response)
        return StatusSuccess<RegisterUserResponse>(response)
      }
      return StatusSuccess<RegisterUserResponse>(undefined)
    } else {
      return StatusFail(new Error('Not authorised'), 403)
    }
  } catch(err: any) {
    return StatusFail(err, 500)
  }
}
