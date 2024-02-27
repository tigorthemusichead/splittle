'use server'
import {currentUser} from "@clerk/nextjs";
import readUser, {ReadUserResponse} from "@/lib/user/read";
import Link from "next/link";
import {HoverEffect} from "@/components/ui/card-hover-effect";

export default async function Groups () {
  const user = await currentUser()
  if (user == null) {
   return <h1 className={'text-2xl'}>Some error has occurred</h1>
  }
  const response = await readUser(user.id) as ReadUserResponse & {success: boolean}
  if (response == null || !response.success) {
    return <h1 className={'text-2xl'}>Some error has occured</h1>
  }
  const groups = response.groups

  return (
    <section className={'container mx-auto min-h-screen px-4'}>
      <HoverEffect
        items={[
          {
            title: 'Create new',
            description: 'Create a new group and invite your friends to split some money',
            link: '/group/create',
            meteors: true
          },
          ...groups.map(({group}) => ({
            title: group.name,
            description: '',
            link: `/group/${group.id}`
          }))
        ]}
      />
    </section>
  )
}
