import {currentUser} from "@clerk/nextjs";
import readUser, {ReadUserResponse} from "@/lib/user/read";
import Link from "next/link";

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
    <section className={'container mx-auto'}>
      <ul>
        {
          groups.map(({group}) => (
            <li key={group.id}>
              - <Link href={`/group/${group.id}`}>{group.name}</Link>
            </li>
          ))
        }
      </ul>
    </section>
  )
}
